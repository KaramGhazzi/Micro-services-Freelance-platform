'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { notFound, usePathname } from 'next/navigation';
import BaseButton from '@/app/_components/BaseButton';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseSelect from '@/app/_components/BaseSelect';
import BaseTextarea from '@/app/_components/BaseTextarea';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import Modal from '@/app/_components/BaseDialog';
import { useGetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';
import { AssignmentApplicationStatus, AssignmentStatus } from '@/graphql/types';
import { useUpdateAssignmentApplicationsStatusMutation } from '@/graphql/mutations/assignment-applications/updateAssignmentApplicationsStatus.generated';
import BaseConfirmationIcon from '@/app/_components/BaseConfirmationIcon';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';
import { useCreateAssignmentApplicationReadMutation } from '@/graphql/mutations/assignment-application-read/createAssignmentApplicationRead.generated';
import { useAuth } from '@/app/_hooks/useAuth';

interface StatusFormData {
  status: AssignmentApplicationStatus;
  message: string;
}

export default function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { opdrachtId: number; reactieId: number };
}) {
  const t = useTranslations('assignment');
  const { currentUser } = useAuth();
  const currentRoute = usePathname();
  const [statusFormData, setStatusFormData] = useState<StatusFormData>({
    status: AssignmentApplicationStatus.New,
    message: '',
  });
  const [createAssignmentApplicationReadMutation] =
    useCreateAssignmentApplicationReadMutation();

  const assignmentQueryParams = {
    where: { id: { equals: Number(params.reactieId) } },
  };

  const {
    data,
    loading,
    error,
    refetch: reloadAssignmentApplication,
  } = useGetAssignmentApplicationQuery({
    variables: assignmentQueryParams,
  });

  const [updateAssignmentApplicationsStatus] =
    useUpdateAssignmentApplicationsStatusMutation();

  useEffect(() => {
    if (data) {
      createAssignmentApplicationReadMutation({
        variables: {
          assignmentApplicationId: Number(data?.assignmentApplication?.id),
        },
      }).catch();
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    updateFormData(
      'message',
      t(`modal.messageCandidate.templates.${value}`, {
        candidateName: `${data?.assignmentApplication?.owner?.firstName} ${data?.assignmentApplication?.owner?.lastName}`,
        currentUser: `${currentUser?.firstName} ${currentUser?.lastName}`,
      })
    );
    updateFormData(name, value);
  };

  const updateFormData = (key: string, value: unknown) => {
    setStatusFormData((prevFormData: any) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const tabs = [
    {
      name: 'Reactie',
      href: `/opdracht-plaatsen/mijn-opdrachten/${params?.opdrachtId}/reactie/${params.reactieId}`,
      current:
        currentRoute ===
        `/opdracht-plaatsen/mijn-opdrachten/${params?.opdrachtId}/reactie/${params.reactieId}`
          ? true
          : false,
    },
  ];

  let [changeStatusModalIsOpen, setChangeStatusModalIsOpen] = useState(false);
  let [confirmChangeStatusModalIsOpen, setConfirmChangeStatusModalIsOpen] =
    useState(false);

  async function changeStatus() {
    setChangeStatusModalIsOpen(false);
    setConfirmChangeStatusModalIsOpen(true);
    await updateAssignmentApplicationsStatus({
      variables: {
        assignmentApplicationIds: [Number(data?.assignmentApplication?.id)],
        status: statusFormData.status,
        message: statusFormData.message,
      },
    });

    await reloadAssignmentApplication(assignmentQueryParams);
  }

  const choosableStatusKeys: AssignmentApplicationStatus[] = [];

  if (data?.assignmentApplication?.status === AssignmentApplicationStatus.New) {
    choosableStatusKeys.push(AssignmentApplicationStatus.New);
  }

  choosableStatusKeys.push(
    AssignmentApplicationStatus.Accepted,
    AssignmentApplicationStatus.Declined,
    AssignmentApplicationStatus.Pending,
    AssignmentApplicationStatus.Proposed
  );

  const statusOptions = choosableStatusKeys.map((statusKey) => ({
    key: statusKey,
    disabled: data?.assignmentApplication?.status === statusKey,
    label: t(`application.status.${statusKey}`),
  }));

  if (error && !loading) {
    return notFound();
  } else if (data) {
    return (
      <>
        {!loading && (
          <BaseToolbarSub
            title={`${data?.assignmentApplication?.owner?.firstName} ${data?.assignmentApplication?.owner?.lastName}`}
            titleImage={getImageUrl(
              data?.assignmentApplication?.owner?.profilePhoto?.container,
              data?.assignmentApplication?.owner?.profilePhoto?.blobName
            )}
            overtitle={`${
              data?.assignmentApplication?.assignment?.title ?? '-'
            }`}
            backHref={`/opdracht-plaatsen/mijn-opdrachten/${params.opdrachtId}`}
            tabs={tabs}
          >
            <BaseButton
              theme="primary"
              wide
              onClick={() => setChangeStatusModalIsOpen(true)}
              disabled={
                data?.assignmentApplication?.assignment?.status ===
                  AssignmentStatus.Closed ||
                data?.assignmentApplication?.status ===
                  AssignmentApplicationStatus.Question
              }
            >
              <span>{t('toolbar.changeStatus')}</span>
            </BaseButton>
          </BaseToolbarSub>
        )}

        <Modal
          isOpen={changeStatusModalIsOpen}
          onClose={() => setChangeStatusModalIsOpen(false)}
          size="md"
          title={t('modal.candidateChangeStatus')}
          footer={
            <>
              <BaseButton
                onClick={() => setChangeStatusModalIsOpen(false)}
                theme="secondary"
                size="md"
              >
                {t('application.actions.cancel')}
              </BaseButton>
              <BaseButton
                onClick={changeStatus}
                size="md"
                disabled={!statusFormData.status?.length}
              >
                {t('modal.changeStatus')}
              </BaseButton>
            </>
          }
        >
          <div className="grid gap-6">
            <p className="text-neutral-700">
              {t('modal.changeStatusDescription')}
            </p>
            <BaseSelect
              label={t('modal.chooseStatus')}
              name="status"
              value={statusFormData.status}
              onChange={handleInputChange}
              placeholder={t('modal.chooseStatus')}
              required
            >
              {statusOptions.map((s) => {
                return (
                  <option key={s.key} value={s.key} disabled={s.disabled}>
                    {s.label}
                  </option>
                );
              })}
            </BaseSelect>
            <BaseTextarea
              label={t('modal.messageCandidate.label')}
              placeholder={t('modal.messageCandidate.placeholder')}
              name="message"
              value={statusFormData.message}
              onChange={handleInputChange}
              size="lg"
              required
            />
          </div>
        </Modal>
        <Modal
          isOpen={confirmChangeStatusModalIsOpen}
          onClose={() => setConfirmChangeStatusModalIsOpen(false)}
          size="md"
        >
          <BaseConfirmationIcon />
          <div className="mb-8 grid gap-1 text-center">
            <BaseHeading type="h2" size="base">
              {t('modal.statusChanged')}
            </BaseHeading>
            <p className="text-neutral-700">
              {t('modal.statusChangedDescription', {
                name: `${data?.assignmentApplication?.owner?.firstName} ${data?.assignmentApplication?.owner?.lastName}`,
              })}
            </p>
          </div>
          <div className="grid gap-4">
            <BaseButton
              onClick={() => setConfirmChangeStatusModalIsOpen(false)}
              wide
              size="lg"
            >
              {t('modal.backToApplication')}
            </BaseButton>
          </div>
        </Modal>

        {children}
      </>
    );
  }
}
