'use client';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import NewMessageDot from '../../_components/NewMessageDot';
import BaseStatus from '@/app/_components/BaseStatus';
import { useAssignmentApplicationsQuery } from '@/graphql/queries/assignments/getAssignmentApplications.generated';
import {
  AssignmentApplication,
  AssignmentApplicationStatus,
  AssignmentStatus,
  SortOrder,
} from '@/graphql/types';
import BaseEmptyState from '@/app/_components/BaseEmptyState';
import BaseUserAvatar from '@/app/_components/BaseUserAvatar';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import Modal from '@/app/_components/BaseDialog';
import BaseButton from '@/app/_components/BaseButton';
import BaseSelect from '@/app/_components/BaseSelect';
import BaseTextarea from '@/app/_components/BaseTextarea';
import BaseConfirmationIcon from '@/app/_components/BaseConfirmationIcon';
import BaseHeading from '@/app/_components/BaseHeading';
import { useUpdateAssignmentApplicationsStatusMutation } from '@/graphql/mutations/assignment-applications/updateAssignmentApplicationsStatus.generated';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';

export default function Page({
  params,
}: Readonly<{ params: { opdrachtId: number } }>) {
  const t = useTranslations();
  const router = useRouter();
  const [statusFormData, setStatusFormData] = useState<{
    status?: AssignmentApplicationStatus;
    message: string;
  }>({
    status: undefined,
    message: '',
  });

  const [selectedApplications, setSelectedApplications] = useState<number[]>(
    []
  );
  const [changeStatusBulkModalIsOpen, setChangeStatusBulkModalIsOpen] =
    useState(false);
  const [
    confirmChangeStatusBulkModalIsOpen,
    setConfirmChangeStatusBulkModalIsOpen,
  ] = useState(false);

  const [updateAssignmentApplicationsStatusMutation] =
    useUpdateAssignmentApplicationsStatusMutation();

  const [sortedAssignmentApplications, setSortedAssignmentApplications] =
    useState([]);

  const {
    data: { assignmentApplications } = {},
    loading: applicationsLoading,
    refetch,
  } = useAssignmentApplicationsQuery({
    variables: {
      where: {
        assignmentId: {
          equals: Number(params.opdrachtId),
        },
        NOT: [
          {
            status: {
              equals: AssignmentApplicationStatus.Concept,
            },
          },
        ],
      },
      orderBy: [{ createdAt: SortOrder.Desc }, { updatedAt: SortOrder.Desc }],
    },
  });

  useEffect(() => {
    if (assignmentApplications) {
      const sortedDeclinedApplicationsToBottom: any = structuredClone(
        assignmentApplications
      ).sort((a, b) => {
        if (a.status === AssignmentApplicationStatus.Declined) return 1;
        if (b.status === AssignmentApplicationStatus.Declined) return -1;
        return 0;
      });

      setSortedAssignmentApplications(sortedDeclinedApplicationsToBottom);
    }
  }, [assignmentApplications]);

  const handleCheckboxClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    applicationId: number
  ) => {
    e.stopPropagation();

    if (selectedApplications.includes(applicationId)) {
      setSelectedApplications(
        selectedApplications.filter((id: number) => id !== applicationId)
      );
    } else {
      setSelectedApplications([...selectedApplications, applicationId]);
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    const allApplicationIds: number[] =
      selectableApplications?.map((application) => Number(application.id)) ??
      [];

    if (isChecked) {
      setSelectedApplications(allApplicationIds);
    } else {
      setSelectedApplications([]);
    }
  };

  const changeStatusBulk = async () => {
    setChangeStatusBulkModalIsOpen(false);

    if (statusFormData?.status) {
      try {
        const response = await updateAssignmentApplicationsStatusMutation({
          variables: {
            assignmentApplicationIds: selectedApplications,
            status: statusFormData?.status,
            message: statusFormData?.message,
          },
        });
        if (response) {
          setConfirmChangeStatusBulkModalIsOpen(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const statusKeys: AssignmentApplicationStatus[] = [];

  statusKeys.push(
    AssignmentApplicationStatus.Accepted,
    AssignmentApplicationStatus.Declined,
    AssignmentApplicationStatus.Pending,
    AssignmentApplicationStatus.Proposed
  );

  const statusOptions = statusKeys.map((statusKey) => ({
    key: statusKey,
    label: t(`assignment.application.status.${statusKey}`),
  }));

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const updateFormData = (key: string, value: unknown) => {
    setStatusFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleConfirmChangeStatusBulkModalIsOpen = (isOpen: boolean) => {
    setConfirmChangeStatusBulkModalIsOpen(isOpen);
    refetch();
  };

  const selectableApplications = useMemo(() => {
    return assignmentApplications?.filter(
      (application) =>
        application.status !== AssignmentApplicationStatus.Question
    );
  }, [assignmentApplications]);

  return (
    <>
      {assignmentApplications &&
        assignmentApplications?.length > 0 &&
        assignmentApplications[0].assignment.status ===
          AssignmentStatus.Archived && (
          <div className="flex flex-col items-center justify-center gap-1 px-5 py-10 text-center lg:px-10">
            <h4 className="font-heading font-bold tracking-tight">
              {t('assignment.assignmentArchived')}
            </h4>
            <p className="text-sm text-neutral-500">
              {t('assignment.assignmentArchivedDescription')}
            </p>
          </div>
        )}
      {!applicationsLoading && assignmentApplications?.length === 0 && (
        <BaseEmptyState
          imageUrl="/illustration/received-responses.svg"
          title={t(`emptyState.applicationsReceived.title`)}
          description={t(`emptyState.applicationsReceived.description`)}
        />
      )}
      {assignmentApplications &&
        assignmentApplications.length > 0 &&
        assignmentApplications?.[0].assignment.status !==
          AssignmentStatus.Archived && (
          <div className="flex h-full max-w-[100vw] flex-col overflow-auto">
            <div className="flex-grow">
              <table
                className="relative w-full border-collapse"
                cellPadding="0"
              >
                <thead>
                  <tr>
                    <th className="top-0 z-10 bg-white/90 text-left text-sm font-medium text-neutral-700 backdrop-blur-sm md:sticky">
                      <div className="flex gap-5 whitespace-nowrap border-b border-neutral-100 py-2.5 pl-5 pr-10 lg:pl-10">
                        <button
                          onClick={() =>
                            handleSelectAll(
                              selectedApplications.length !==
                                (selectableApplications?.length ?? 0)
                            )
                          }
                          className="hidden h-5 w-5 lg:flex"
                        >
                          <div className="pointer-events-none">
                            <BaseCheckbox
                              checked={
                                selectedApplications.length ===
                                (selectableApplications?.length ?? 0)
                              }
                              name="select-all"
                              onChange={() => {}}
                            />
                          </div>
                        </button>
                        <span>{t('assignment.table.head.name')}</span>
                      </div>
                    </th>
                    <th className="top-0 z-10 bg-white/90 text-left text-sm font-medium text-neutral-700 backdrop-blur-sm md:sticky">
                      <div className="whitespace-nowrap border-b border-neutral-100 py-2.5 pr-10">
                        {t('assignment.table.head.status')}
                      </div>
                    </th>
                    <th className="top-0 z-10 bg-white/90 text-left text-sm font-medium text-neutral-700 backdrop-blur-sm md:sticky">
                      <div className="whitespace-nowrap border-b border-neutral-100 py-2.5 pr-10">
                        {t('assignment.table.head.registrationDate')}
                      </div>
                    </th>
                    <th className="top-0 z-10 bg-white/90 text-left text-sm font-medium text-neutral-700 backdrop-blur-sm md:sticky">
                      <div className="whitespace-nowrap border-b border-neutral-100 py-2.5 pr-5 md:pr-10">
                        {t('assignment.table.head.lastStatusChange')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applicationsLoading && (
                    <tr className="bg-white">
                      <td className="whitespace-nowrap py-4 pl-5 pr-10 md:pl-10">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-neutral-100"></div>
                          <div className="flex flex-col gap-3">
                            <div className="h-5 w-40 rounded-xl bg-neutral-100"></div>
                            <div className="h-2 w-16 rounded-xl bg-neutral-50"></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="h-2 w-16 rounded-xl bg-neutral-50"></div>
                      </td>
                      <td>
                        <div className="h-2 w-16 rounded-xl bg-neutral-50"></div>
                      </td>
                      <td>
                        <div className="h-2 w-16 rounded-xl bg-neutral-50"></div>
                      </td>
                    </tr>
                  )}

                  {!applicationsLoading &&
                    sortedAssignmentApplications?.map(
                      (application: AssignmentApplication, index) => {
                        return (
                          <tr
                            onClick={() =>
                              router.push(
                                `/opdracht-plaatsen/mijn-opdrachten/${params.opdrachtId}/reactie/${application.id}`
                              )
                            }
                            key={index}
                            className="border-b border-neutral-100 bg-white transition-all hover:cursor-pointer hover:bg-neutral-50"
                          >
                            <td className="whitespace-nowrap py-4 pl-5 pr-10 lg:pl-10">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={(e) =>
                                    handleCheckboxClick(
                                      e,
                                      Number(application.id)
                                    )
                                  }
                                  className={classNames({
                                    'hidden h-5 w-5 lg:flex': true,
                                    'pointer-events-none opacity-0':
                                      !selectableApplications?.some(
                                        (selectableApplication) =>
                                          selectableApplication.id ===
                                          application.id
                                      ),
                                  })}
                                >
                                  <div className="pointer-events-none">
                                    <BaseCheckbox
                                      checked={selectedApplications.includes(
                                        Number(application.id)
                                      )}
                                      name={'application-' + application.id}
                                      onChange={() => {}}
                                    />
                                  </div>
                                </button>

                                <BaseUserAvatar
                                  url={getImageUrl(
                                    application.owner?.profilePhoto?.container,
                                    application.owner?.profilePhoto?.blobName
                                  )}
                                />

                                <div className="overflow-hidden">
                                  <div className="flex items-center gap-2 truncate text-sm font-semibold text-neutral-900">
                                    <div>{`${application?.owner?.firstName} ${application?.owner?.lastName}`}</div>
                                    <NewMessageDot
                                      applicationId={application.id}
                                      isRead={application.isRead}
                                    />
                                  </div>
                                  <div className="truncate text-sm text-neutral-700">
                                    {application?.city}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap pr-10 text-left md:pr-0">
                              <BaseStatus theme={application.status}>
                                {t(
                                  `assignment.application.status.${application.status}`
                                )}
                              </BaseStatus>
                            </td>
                            <td className="whitespace-nowrap pr-10 text-sm text-neutral-700">
                              {new Intl.DateTimeFormat('nl-NL', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              }).format(new Date(application?.createdAt))}

                              {}
                            </td>
                            <td className="whitespace-nowrap pr-10 text-sm text-neutral-700">
                              {new Intl.DateTimeFormat('nl-NL', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              }).format(
                                new Date(application?.currentStatus?.createdAt)
                              )}
                              {}
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
            <AnimatePresence>
              {selectedApplications.length > 0 && (
                <motion.div
                  className="sticky bottom-0 hidden items-center gap-6 border-t bg-white bg-white/90 px-5 py-3.5 shadow-[0_-20px_25px_-5px_rgba(0,0,0,0.05)] backdrop-blur-sm lg:flex lg:px-10"
                  initial={{ translateY: '100%' }}
                  animate={{ translateY: '0%' }}
                  exit={{ translateY: '100%' }}
                  transition={{
                    type: 'spring',
                    duration: 0.4,
                  }}
                >
                  <div className="text-sm font-semibold tabular-nums">
                    {t('assignment.usersSelectedCount', {
                      count: selectedApplications.length,
                    })}
                  </div>
                  <BaseButton
                    onClick={() => setChangeStatusBulkModalIsOpen(true)}
                    size="md"
                  >
                    {t('global.changeStatus')}
                  </BaseButton>
                </motion.div>
              )}
            </AnimatePresence>
            <Modal
              isOpen={changeStatusBulkModalIsOpen}
              onClose={() => setChangeStatusBulkModalIsOpen(false)}
              size="md"
              title={t('assignment.modal.candidateChangeStatusBulk', {
                count: selectedApplications.length,
              })}
              footer={
                <>
                  <BaseButton
                    onClick={() => setChangeStatusBulkModalIsOpen(false)}
                    theme="secondary"
                    size="md"
                  >
                    {t('assignment.application.actions.cancel')}
                  </BaseButton>

                  <BaseButton
                    onClick={changeStatusBulk}
                    size="md"
                    disabled={!statusFormData.status?.length}
                  >
                    {t('assignment.modal.changeStatus')}
                  </BaseButton>
                </>
              }
            >
              <div className="grid gap-6">
                <p className="text-neutral-700">
                  {t('assignment.modal.changeStatusDescription')}
                </p>
                <BaseSelect
                  label={t('assignment.modal.chooseStatus')}
                  name="status"
                  value={statusFormData.status}
                  onChange={handleInputChange}
                  placeholder={t('assignment.modal.chooseStatus')}
                  required
                >
                  {statusOptions.map((s) => {
                    return (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    );
                  })}
                </BaseSelect>
                <BaseTextarea
                  label={t('assignment.modal.messageCandidate.label')}
                  placeholder={t(
                    'assignment.modal.messageCandidate.placeholder'
                  )}
                  name="message"
                  value={statusFormData.message}
                  onChange={handleInputChange}
                  size="sm"
                  required
                />
              </div>
            </Modal>
            <Modal
              isOpen={confirmChangeStatusBulkModalIsOpen}
              onClose={() => setConfirmChangeStatusBulkModalIsOpen(false)}
              size="md"
            >
              <BaseConfirmationIcon />
              <div className="mb-8 grid gap-1 text-center">
                <BaseHeading type="h2" size="base">
                  {t('assignment.modal.statusChanged')}
                </BaseHeading>
                <p className="text-neutral-700">
                  {t('assignment.modal.statusChangedDescriptionBulk')}
                </p>
              </div>
              <div className="grid gap-4">
                <BaseButton
                  onClick={() =>
                    handleConfirmChangeStatusBulkModalIsOpen(false)
                  }
                  wide
                  size="lg"
                >
                  {t('assignment.modal.backToAssignment')}
                </BaseButton>
              </div>
            </Modal>
          </div>
        )}
      {}
    </>
  );
}
