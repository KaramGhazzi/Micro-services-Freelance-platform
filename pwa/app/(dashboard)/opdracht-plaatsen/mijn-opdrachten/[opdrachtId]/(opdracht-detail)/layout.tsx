'use client';
import { useEffect, useState } from 'react';
import { notFound, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import SearchUser from '../../_components/SearchUser';
import BaseButton from '@/app/_components/BaseButton';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import BaseTippy from '@/app/_components/BaseTippy';
import IconArrowsCrossing from '@/app/_components/icons/IconArrowsCrossing';
import { useGetMyAssignmentQuery } from '@/graphql/queries/assignments/getMyAssignment.generated';
import { useCloseAssignmentMutation } from '@/graphql/mutations/assignments/closeAssignment.generated';
import Modal from '@/app/_components/BaseDialog';
import BaseHeading from '@/app/_components/BaseHeading';
import IconPauseCircle from '@/app/_components/icons/IconPauseCircle';
import { usePauseAssignmentMutation } from '@/graphql/mutations/assignments/pauseAssignment.generated';
import IconPlay from '@/app/_components/icons/IconPlay';
import {
  AssignmentApplicationStatus,
  AssignmentStatus,
  User,
  UserCompanyRole,
  UserRole,
  UsersCompaniesStatus,
} from '@/graphql/types';
import { useResumeAssignmentMutation } from '@/graphql/mutations/assignments/resumeAssignment.generated';
import { useCompanyQuery } from '@/graphql/queries/companies/getCompany.generated';
import { useReassignAssignmentMutation } from '@/graphql/mutations/assignments/reassignAssignment.generated';
import BaseConfirmationIcon from '@/app/_components/BaseConfirmationIcon';
import IconPencilAlt from '@/app/_components/icons/IconPencilAlt';
import { useConceptAssignmentMutation } from '@/graphql/mutations/assignments/conceptAssignment.generated';
import { useAuth } from '@/app/_hooks/useAuth';

export default function PageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { opdrachtId: number };
}>) {
  const t = useTranslations('assignment');
  const currentRoute = usePathname();
  const router = useRouter();
  const { currentCompany, currentCompanyId, userCompanyRoles } = useAuth();

  const [closeAssignmentMutation] = useCloseAssignmentMutation();
  const [pauseAssignmentMutation] = usePauseAssignmentMutation();
  const [conceptAssignmentMutation] = useConceptAssignmentMutation();
  const [reassignAssignmentMutation] = useReassignAssignmentMutation();
  const [
    resumeAssignmentMutation,
    { data: resumeAssignmentResponse, loading },
  ] = useResumeAssignmentMutation();

  const [closeAssignmentModalIsOpen, setCloseAssignmentModalIsOpen] =
    useState(false);
  const [
    cancelReviewAssignmentModalIsOpen,
    setCancelReviewAssignmentModalIsOpen,
  ] = useState(false);
  const [
    confirmCloseAssignmentModalIsOpen,
    setConfirmCloseAssignmentModalIsOpen,
  ] = useState(false);
  const [pauseAssignmentModalIsOpen, setPauseAssignmentModalIsOpen] =
    useState(false);
  const [
    confirmPauseAssignmentModalIsOpen,
    setConfirmPauseAssignmentModalIsOpen,
  ] = useState(false);
  const [transferAssignmentModalIsOpen, setTransferAssignmentModalIsOpen] =
    useState(false);
  const [
    confirmTransferAssignmentModalIsOpen,
    setConfirmTransferAssignmentModalIsOpen,
  ] = useState(false);
  const [forbiddenToCloseModalIsOpen, setForbiddenToCloseModalIsOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: companyData } = useCompanyQuery({
    variables: {
      where: {
        id: {
          equals: Number(currentCompanyId),
        },
      },
    },
  });
  const { data, refetch, error } = useGetMyAssignmentQuery({
    variables: {
      where: { id: { equals: Number(params.opdrachtId) } },
    },
  });

  const users: User[] = (companyData?.company.companyUsers ?? [])
    .filter((userCompanies) => {
      return (
        (userCompanies.user.role === UserRole.Admin ||
          userCompanies.user.role === UserRole.User) &&
        userCompanies.status === UsersCompaniesStatus.Active
      );
    })
    .map((userCompanies) => {
      return { ...(userCompanies.user as User) };
    });

  let assignmentStatus;
  if (data?.assignment) {
    assignmentStatus = data.assignment.status;
  }

  const isApplicationTabHidden = (status?: AssignmentStatus) => {
    if (status !== undefined) {
      switch (status) {
        case AssignmentStatus.Concept:
        case AssignmentStatus.PendingReview:
        case AssignmentStatus.InReview:
        case AssignmentStatus.Declined:
        case AssignmentStatus.Archived:
          return true;
        default:
          return false;
      }
    }
    return false;
  };

  const tabs = [
    {
      name: `Reacties (${
        data?.assignment?.assignmentApplications?.length ?? 0
      })`,
      href: `/opdracht-plaatsen/mijn-opdrachten/${data?.assignment?.id}`,
      current:
        currentRoute ===
        `/opdracht-plaatsen/mijn-opdrachten/${data?.assignment?.id}`,
      hidden: isApplicationTabHidden(
        data?.assignment?.status ? data?.assignment?.status : undefined
      ),
    },
    {
      name: 'Opdracht details',
      href: `/opdracht-plaatsen/mijn-opdrachten/${data?.assignment?.id}/details`,
      current:
        currentRoute ===
        `/opdracht-plaatsen/mijn-opdrachten/${data?.assignment?.id}/details`,
    },
  ];

  const availableTabs = tabs.filter((tab) => !tab.hidden);

  useEffect(() => {
    if (!loading && !error && resumeAssignmentResponse) {
      refetch();
    }
  }, [resumeAssignmentResponse, loading, error]);

  const pauseAssignment = async () => {
    setPauseAssignmentModalIsOpen(false);
    setConfirmPauseAssignmentModalIsOpen(true);
    await pauseAssignmentMutation({
      variables: { assignmentId: Number(data?.assignment?.id) },
    });
  };

  const transitionAssignmentBackToConcept = async () => {
    setCancelReviewAssignmentModalIsOpen(false);

    try {
      const response = await conceptAssignmentMutation({
        variables: { assignmentId: Number(data?.assignment?.id) },
      });
      if (response) {
        router.push(
          `/opdracht-plaatsen/nieuwe-opdracht/preview/${data?.assignment?.id}`
        );
      }
    } catch {
      console.log(
        'An error has occured while trying to transition the status back to concept'
      );
    }
  };

  const resumeAssignment = async () => {
    await resumeAssignmentMutation({
      variables: { assignmentId: Number(data?.assignment?.id) },
    });
  };

  const closeAssignment = async () => {
    setCloseAssignmentModalIsOpen(false);
    setConfirmCloseAssignmentModalIsOpen(true);
    await closeAssignmentMutation({
      variables: { assignmentId: Number(data?.assignment?.id) },
    });
  };

  const transferAssignment = async () => {
    setTransferAssignmentModalIsOpen(false);

    if (selectedUser) {
      try {
        await reassignAssignmentMutation({
          variables: {
            assignmentId: Number(data?.assignment?.id),
            ownerId: Number(selectedUser?.id),
          },
        });

        setConfirmTransferAssignmentModalIsOpen(true);
      } catch (reassignError) {
        console.log(
          'An error has occured while reassigning the owner of this assignment'
        );
      }
    }
  };

  const handleUserSelect = (user: User | null) => {
    setSelectedUser(user);
  };

  const showButtonsForStatus = (status: AssignmentStatus) => {
    switch (status) {
      case AssignmentStatus.Declined: {
        return (
          <>
            {renderEditButton()}
            {renderCloseAssignmentButton()}
          </>
        );
      }
      case AssignmentStatus.PendingReview: {
        return (
          <>
            {renderEditButton()}
            {renderCancelReviewAssignmentButton()}
          </>
        );
      }
      case AssignmentStatus.Paused: {
        return (
          <>
            {renderResumeAssignmentButton()}
            {renderCloseAssignmentButton()}
          </>
        );
      }
      case AssignmentStatus.InReview:
      case AssignmentStatus.Reviewed:
      case AssignmentStatus.Archived: {
        return renderCloseAssignmentButton();
      }
      case AssignmentStatus.Concept: {
        return renderPauseAssignmentButton();
      }
      case AssignmentStatus.Closed: {
        return renderClosedAssignmentButton();
      }
      case AssignmentStatus.Published: {
        return (
          <>
            {renderPauseAssignmentButton()}
            {renderCloseAssignmentButton()}
          </>
        );
      }
    }
  };

  const renderEditButton = () => {
    return (
      <BaseButton
        theme="secondary"
        wide
        href={`/opdracht-plaatsen/nieuwe-opdracht/bewerken/${data?.assignment?.id}`}
      >
        <IconPencilAlt className="hidden sm:flex" />
        <span>{t('toolbar.edit')}</span>
      </BaseButton>
    );
  };

  const renderPauseAssignmentButton = () => {
    return (
      <BaseTippy content={<span>{t('tooltip.pauseAssignment')}</span>}>
        <div>
          <BaseButton
            theme="secondary"
            square
            onClick={() => setPauseAssignmentModalIsOpen(true)}
          >
            <IconPauseCircle />
          </BaseButton>
        </div>
      </BaseTippy>
    );
  };

  const renderResumeAssignmentButton = () => {
    return (
      <BaseTippy content={<span>{t('tooltip.resumeAssignment')}</span>}>
        <div>
          <BaseButton theme="secondary" square onClick={resumeAssignment}>
            <IconPlay />
          </BaseButton>
        </div>
      </BaseTippy>
    );
  };

  const renderCloseAssignmentButton = () => {
    const someAssignmentApplicationsAreNew =
      data?.assignment?.assignmentApplications?.some(
        (application) => application.status === AssignmentApplicationStatus.New
      );

    return (
      <BaseButton
        theme="secondary"
        wide
        onClick={() => {
          if (someAssignmentApplicationsAreNew) {
            setForbiddenToCloseModalIsOpen(true);
          } else {
            setCloseAssignmentModalIsOpen(true);
          }
        }}
      >
        <span>{t('toolbar.closeAssignment')}</span>
      </BaseButton>
    );
  };

  const renderClosedAssignmentButton = () => {
    return (
      <BaseButton
        disabled={true}
        theme="secondary"
        wide
        onClick={() => setCloseAssignmentModalIsOpen(true)}
      >
        <span>{t('toolbar.closedAssignment')}</span>
      </BaseButton>
    );
  };

  const renderCancelReviewAssignmentButton = () => {
    return (
      <BaseButton
        theme="secondary"
        wide
        onClick={() => setCancelReviewAssignmentModalIsOpen(true)}
      >
        <span>{t('toolbar.cancelReviewAssignment')}</span>
      </BaseButton>
    );
  };

  if (error && !loading) {
    return notFound();
  } else if (data) {
    return (
      <>
        <BaseToolbarSub
          title={data?.assignment?.title ?? ''}
          overtitle={t('toolbar.myAssignments')}
          backHref="/opdracht-plaatsen/mijn-opdrachten"
          tabs={availableTabs}
        >
          {(userCompanyRoles.includes(UserCompanyRole.Supervisor) ||
            userCompanyRoles.includes(UserCompanyRole.Owner)) && (
            <BaseTippy content={<span>{t('tooltip.transferAssignment')}</span>}>
              <div>
                <BaseButton
                  theme="secondary"
                  square
                  onClick={() => setTransferAssignmentModalIsOpen(true)}
                >
                  <IconArrowsCrossing />
                </BaseButton>
              </div>
            </BaseTippy>
          )}
          {assignmentStatus && showButtonsForStatus(assignmentStatus)}
        </BaseToolbarSub>

        <Modal
          isOpen={pauseAssignmentModalIsOpen}
          onClose={() => setPauseAssignmentModalIsOpen(false)}
          size="md"
          title={t('modal.pauseAssignment')}
          footer={
            <>
              <BaseButton
                onClick={() => setPauseAssignmentModalIsOpen(false)}
                theme="secondary"
                size="md"
              >
                {t('application.actions.cancel')}
              </BaseButton>

              <BaseButton onClick={pauseAssignment} size="md">
                {t('modal.pauseAssignment')}
              </BaseButton>
            </>
          }
        >
          <p className="text-neutral-500">
            {t('modal.pauseAssignmentDescription')}
          </p>
        </Modal>

        <Modal
          isOpen={confirmPauseAssignmentModalIsOpen}
          onClose={() => setConfirmPauseAssignmentModalIsOpen(false)}
          size="md"
        >
          <BaseConfirmationIcon />
          <div className="mb-8 grid gap-1 text-center">
            <BaseHeading type="h2" size="base">
              {t('modal.yourAssignmentPaused')}
            </BaseHeading>
            <p className="text-neutral-500">
              {t('modal.yourAssignmentPausedDescription')}
            </p>
          </div>
          <div className="grid gap-4">
            <BaseButton
              href="/opdracht-plaatsen/mijn-opdrachten"
              wide
              size="lg"
            >
              {t('modal.myAssignments')}
            </BaseButton>
          </div>
        </Modal>

        <Modal
          isOpen={transferAssignmentModalIsOpen}
          onClose={() => setTransferAssignmentModalIsOpen(false)}
          size="md"
          title={t('modal.transferAssignment')}
          footer={
            <>
              <BaseButton
                onClick={() => setTransferAssignmentModalIsOpen(false)}
                theme="secondary"
                size="md"
              >
                {t('application.actions.cancel')}
              </BaseButton>

              <BaseButton
                onClick={transferAssignment}
                size="md"
                disabled={!selectedUser}
              >
                {t('modal.transferAssignment')}
              </BaseButton>
            </>
          }
        >
          <SearchUser
            label={t('modal.transferAssignmentDescription')}
            placeholder={t('modal.transferAssignmentPlaceholder')}
            users={users}
            companyName={currentCompany?.name}
            onUserSelect={handleUserSelect}
          />
        </Modal>
        <Modal
          isOpen={confirmTransferAssignmentModalIsOpen}
          onClose={() => setConfirmTransferAssignmentModalIsOpen(false)}
          size="md"
        >
          <BaseConfirmationIcon />
          <div className="mb-8 grid gap-1 text-center">
            <BaseHeading type="h2" size="base">
              {t('modal.yourAssignmentTransfered')}
            </BaseHeading>
            <p className="text-neutral-500">
              {t('modal.yourAssignmentTransferedDescription', {
                name: `${selectedUser?.firstName} ${selectedUser?.lastName}`,
              })}
            </p>
          </div>
          <div className="grid gap-4">
            <BaseButton
              href="/opdracht-plaatsen/mijn-opdrachten"
              wide
              size="lg"
            >
              {t('modal.myAssignments')}
            </BaseButton>
          </div>
        </Modal>
        <Modal
          isOpen={closeAssignmentModalIsOpen}
          onClose={() => setCloseAssignmentModalIsOpen(false)}
          size="md"
          title={t('modal.closeAssignment')}
          footer={
            <>
              <BaseButton
                onClick={() => setCloseAssignmentModalIsOpen(false)}
                theme="secondary"
                size="md"
              >
                {t('application.actions.cancel')}
              </BaseButton>

              <BaseButton onClick={closeAssignment} size="md">
                {t('modal.closeAssignment')}
              </BaseButton>
            </>
          }
        >
          <p className="text-neutral-500">
            {t('modal.closeAssignmentDescription')}
          </p>
        </Modal>
        <Modal
          isOpen={cancelReviewAssignmentModalIsOpen}
          onClose={() => setCancelReviewAssignmentModalIsOpen(false)}
          size="md"
          title={t('modal.cancelReviewAssignment')}
          footer={
            <>
              <BaseButton
                onClick={() => setCancelReviewAssignmentModalIsOpen(false)}
                theme="secondary"
                size="md"
              >
                {t('application.actions.cancel')}
              </BaseButton>

              <BaseButton onClick={transitionAssignmentBackToConcept} size="md">
                {t('modal.cancelReviewAssignment')}
              </BaseButton>
            </>
          }
        >
          <p className="text-neutral-500">
            {t('modal.cancelReviewAssignmentDescription')}
          </p>
        </Modal>
        <Modal
          isOpen={confirmCloseAssignmentModalIsOpen}
          onClose={() => setConfirmCloseAssignmentModalIsOpen(false)}
          size="md"
        >
          <BaseConfirmationIcon />
          <div className="mb-8 grid gap-1 text-center">
            <BaseHeading type="h2" size="base">
              {t('modal.yourAssignmentClosed')}
            </BaseHeading>
            <p className="text-neutral-500">
              {t('modal.yourAssignmentClosedDescription')}
            </p>
          </div>
          <div className="grid gap-4">
            <BaseButton
              href="/opdracht-plaatsen/mijn-opdrachten"
              wide
              size="lg"
            >
              {t('modal.myAssignments')}
            </BaseButton>
          </div>
        </Modal>
        <Modal
          isOpen={forbiddenToCloseModalIsOpen}
          onClose={() => setForbiddenToCloseModalIsOpen(false)}
          size="md"
          title={t('modal.forbiddenToClose.title')}
          footer={
            <>
              <BaseButton
                onClick={() => setForbiddenToCloseModalIsOpen(false)}
                theme="secondary"
                wide
                size="lg"
              >
                {t('application.actions.cancel')}
              </BaseButton>
            </>
          }
        >
          <p className="text-neutral-500">
            {t('modal.forbiddenToClose.description')}
          </p>
        </Modal>

        {children}
      </>
    );
  }
}
