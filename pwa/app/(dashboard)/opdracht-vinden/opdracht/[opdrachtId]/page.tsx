'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState, useContext } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import {
  ApolloExceptionConverter,
  AssignmentPausedException,
} from '@package/exceptions';
import ApplicationModal from './_components/ApplicationModal';
import BaseButton from '@/app/_components/BaseButton';
import IconPencilAlt from '@/app/_components/icons/IconPencilAlt';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import BaseAssignmentDetail from '@/app/_components/assignment/BaseAssignmentDetail';
import { useGetAssignmentQuery } from '@/graphql/queries/assignments/getAssignment.generated';
import { Assignment, AssignmentStatus, UsageType } from '@/graphql/types';
import BaseTippy from '@/app/_components/BaseTippy';
import OutOfCreditsModal from '@/app/(dashboard)/_components/OutOfCreditsModal';
import { useRemainingUsageByCreditTypeQuery } from '@/graphql/queries/usage/remainingUsageByCreditType.generated';
import BaseFavoriteButton from '@/app/_components/BaseFavoriteButton';
import { useCreateAssignmentReadMutation } from '@/graphql/mutations/assignmentRead/createAssignmentRead.generated';
import BaseCreateReviewFlow from '@/app/_components/BaseCreateReviewFlow';
import Modal from '@/app/_components/BaseDialog';
import { AssignmentCompanyAside } from '@/app/_components/assignment/AssignmentCompanyAside';
import ContractContext from '@/app/(dashboard)/_context/ContractContext';
import TopBoxEmployers from '@/app/_components/TopBoxEmployers';
import BaseSendQuestionFlow from '@/app/_components/BaseSendQuestionFlow';
import IconAskQuestion from '@/app/_components/icons/IconAskQuestion';
import { useAuth } from '@/app/_hooks/useAuth';

const AssignmentDetailPage = ({
  params,
}: {
  params: { opdrachtId: number };
}) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [isApplying, setIsApplying] = useState(false);
  const [canSendQuestion, setCanSendQuestion] = useState(false);
  const [outOfCreditsModalActive, setOutOfCreditsModalActive] = useState(false);
  const [outOfQuestionCreditsModalActive, setOutOfQuestionCreditsModalActive] =
    useState(false);

  const [isCreateQuestionModalOpen, setCreateQuestionModalOpen] =
    useState(false);
  const [createAssignmentReadMutation] = useCreateAssignmentReadMutation();
  const [refreshDate, setRefreshDate] = useState(
    new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium' }).format(new Date())
  );
  const { hasFreelancerBasicContract, hasFreelancerProContract } =
    useContext(ContractContext);
  const [assignmentPausedModalIsOpen, setAssignmentPausedModalIsOpen] =
    useState(false);
  const [contactUsModalIsOpen, setContactUsModalIsOpen] = useState(false);

  const { currentCompany } = useAuth();

  const remainingUsage = useRemainingUsageByCreditTypeQuery({
    variables: {
      usageType: UsageType.AssignmentApplication,
    },
  });

  const { data, loading, error, refetch } = useGetAssignmentQuery({
    variables: {
      where: { id: { equals: Number(params.opdrachtId) } },
    },
    onError: (error) => {
      const convertedError = ApolloExceptionConverter.convert(error);
      if (convertedError instanceof AssignmentPausedException) {
        setAssignmentPausedModalIsOpen(true);
      } else {
        console.error(convertedError);
      }
    },
  });

  const [assignment, setAssignment] = useState<Assignment | undefined>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const canBeOutOfCredits = () =>
    hasFreelancerBasicContract || hasFreelancerProContract;

  const hasNoRemainingUsage = () => {
    return (
      remainingUsage?.data?.remainingUsageByCreditType.amount === undefined ||
      remainingUsage?.data.remainingUsageByCreditType.amount < 1
    );
  };

  const handleClickApplyButton = () => {
    if (hasNoRemainingUsage()) {
      setOutOfCreditsModalActive(true);
      setRefreshDate(
        new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium' }).format(
          new Date(
            remainingUsage.data?.remainingUsageByCreditType.refreshDate ??
              Date.now()
          )
        )
      );
    } else {
      setIsApplying(true);
    }
  };

  const handleClickQuestionButton = () => {
    if (hasNoRemainingUsage() && canBeOutOfCredits()) {
      setOutOfQuestionCreditsModalActive(true);
      setRefreshDate(
        new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium' }).format(
          new Date(
            remainingUsage.data?.remainingUsageByCreditType.refreshDate ??
              Date.now()
          )
        )
      );
    } else {
      setCanSendQuestion(true);
      setCreateQuestionModalOpen(true);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    if (searchParams.get('concept')) {
      setIsApplying(true);
    }
  }, []);

  useEffect(() => {
    if (assignment?.title) {
      document.title = assignment.title;
    }
  }, [assignment?.title]);

  useEffect(() => {
    if (data) {
      setAssignment(data?.assignment as Assignment);
      setIsFavorite(data?.assignment?.isFavorite ?? false);

      createAssignmentReadMutation({
        variables: {
          assignmentId: Number(data.assignment?.id),
        },
      }).catch(console.log);
    }
  }, [data]);

  const renderApplyButton = (isActive: boolean) => {
    return (
      <BaseButton
        theme="primary"
        onClick={() => handleClickApplyButton()}
        disabled={!isActive}
      >
        <IconPencilAlt />
        <span>{t('assignment.toolbar.apply')}</span>
      </BaseButton>
    );
  };

  const renderQuestionButton = () => {
    return (
      <BaseButton
        onClick={() => handleClickQuestionButton()}
        theme="secondary"
        type="submit"
        loading={false}
      >
        <IconAskQuestion />
        <span className="hidden sm:inline-block">
          {t('assignment.toolbar.startChat')}
        </span>
      </BaseButton>
    );
  };

  const renderAssignmentActions = () => {
    return (
      <>
        {!loading && (
          <BaseFavoriteButton
            assignmentId={Number(assignment?.id)}
            isActive={isFavorite}
            setIsActive={handleFavoriteToggle}
            isButton={true}
          />
        )}

        {assignment?.applyEnabled &&
          currentCompany?.id !== assignment?.company?.id &&
          (assignment?.status === AssignmentStatus.Paused ? (
            <BaseTippy
              content={
                <span>{t('assignment.toolbar.applyPausedMessage')}</span>
              }
              maxWidth={400}
            >
              {renderApplyButton(false)}
            </BaseTippy>
          ) : (
            <>
              {renderQuestionButton()}
              {renderApplyButton(true)}
            </>
          ))}

        {assignment?.reviewEnabled && (
          <BaseCreateReviewFlow
            assignment={assignment}
            ctaButtonText={t('assignment.reviewRecruiter')}
            onReviewSubmit={() => refetch()}
          />
        )}
      </>
    );
  };

  if (error && !loading) {
    return notFound();
  } else if (data) {
    return (
      <>
        <BaseToolbarSub
          title={assignment?.title ?? ''}
          overtitle={t('assignment.toolbar.searchAssignments')}
          backHref="/opdracht-vinden/zoeken"
        >
          <>{renderAssignmentActions()}</>
        </BaseToolbarSub>
        {!loading && assignment && (
          <BaseAssignmentDetail
            assignment={assignment}
            hideReference={true}
            onClick={() => setContactUsModalIsOpen(true)}
            asideComponent={
              <>
                <AssignmentCompanyAside assignment={assignment} />
                <TopBoxEmployers />
              </>
            }
          >
            <div className="mt-10 flex gap-3">{renderAssignmentActions()}</div>
          </BaseAssignmentDetail>
        )}
        {isApplying && (
          <ApplicationModal
            assignmentId={assignment?.uuid ?? ''}
            assignment={assignment}
            title={assignment?.title ?? ''}
            onCancelClick={() => setIsApplying(false)}
            onApplySubmit={() => setIsApplying(false)}
            onOutOfCredits={() => setOutOfCreditsModalActive(true)}
          />
        )}
        {canSendQuestion && (
          <BaseSendQuestionFlow
            assignment={assignment}
            isCreateQuestionModalOpen={isCreateQuestionModalOpen}
            onError={() => {
              setOutOfCreditsModalActive(true);
              setCreateQuestionModalOpen(false);
            }}
            setCreateQuestionModalOpen={setCreateQuestionModalOpen}
          />
        )}
        <OutOfCreditsModal
          isOpen={outOfCreditsModalActive}
          onClose={() => setOutOfCreditsModalActive(false)}
        >
          {hasFreelancerProContract ? (
            <p className="mb-4">
              {t('payments.pro.outOfCreditsProText', { date: refreshDate })}
            </p>
          ) : (
            <p className="mb-4">
              {t('payments.pro.outOfCreditsBasicText', { date: refreshDate })}
            </p>
          )}
        </OutOfCreditsModal>
        <OutOfCreditsModal
          isOpen={outOfQuestionCreditsModalActive}
          onClose={() => setOutOfQuestionCreditsModalActive(false)}
          title={t('assignment.modal.askQuestion.outOfCredits.title')}
        >
          <p className="mb-4">
            {t('assignment.modal.askQuestion.outOfCredits.renewDate', {
              date: refreshDate,
            })}
          </p>
          {hasFreelancerProContract ? (
            <p className="mb-4">
              {t('assignment.modal.askQuestion.outOfCredits.contactUs', {
                date: refreshDate,
              })}
            </p>
          ) : (
            <p className="mb-4">
              {t('assignment.modal.askQuestion.outOfCredits.upgradeToPro', {
                date: refreshDate,
              })}
            </p>
          )}
        </OutOfCreditsModal>
        <Modal
          isOpen={assignmentPausedModalIsOpen}
          onClose={() => setAssignmentPausedModalIsOpen(false)}
          size="md"
          title={t('assignment.modal.AssignmentIsPaused')}
          footer={
            <>
              <BaseButton wide size="lg" href="/opdracht-vinden/zoeken">
                {t('assignment.modal.continueSearch')}
              </BaseButton>
            </>
          }
        >
          <p className="text-neutral-500">
            {t('assignment.modal.AssignmentIsPausedDescription')}
          </p>
        </Modal>
        <Modal
          isOpen={contactUsModalIsOpen}
          onClose={() => setContactUsModalIsOpen(false)}
          size="md"
          title={t('upgrade.pro.outOfCredits')}
          footer={
            <BaseButton
              theme={'secondary'}
              wide
              size="lg"
              onClick={() => setContactUsModalIsOpen(false)}
            >
              {t('assignment.toolbar.cancel')}
            </BaseButton>
          }
        >
          <p className="text-neutral-500">{t('global.contactUsPhone')}</p>
        </Modal>
      </>
    );
  }
};

export default AssignmentDetailPage;
