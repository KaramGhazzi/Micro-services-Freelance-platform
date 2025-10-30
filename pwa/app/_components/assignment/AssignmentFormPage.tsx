'use client';
import { useTranslations } from 'next-intl';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { ValidationError } from 'yup';
import { getAssignmentCreateSchema } from '@package/types/dist/yup/core/assignment/assignment-create.schema';
import { ApolloError } from '@apollo/client/errors';
import AssignmentForm, { AssignmentFormData } from './AssignmentForm';
import { GetAssignmentQuery } from '@/graphql/queries/assignments/getAssignment.generated';
import { useCreateAssignmentMutation } from '@/graphql/mutations/assignments/createAssignment.generated';
import { useCreateDraftAssignmentMutation } from '@/graphql/mutations/assignments/createDraftAssignment.generated';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import IconEye from '@/app/_components/icons/IconEye';
import BaseButton from '@/app/_components/BaseButton';
import IconDocument from '@/app/_components/icons/IconDocument';
import {
  AssignmentStatus,
  AssignmentType,
  AssignmentUpdateInput,
  SortOrder,
} from '@/graphql/types';
import IconTrash from '@/app/_components/icons/IconTrash';
import AssignmentDeleteModal from '@/app/_components/assignment/AssignmentDeleteModal';
import ChangeAssignmentStatusModal from '@/app/_components/assignment/ChangeAssignmentStatusModal';
import Modal from '@/app/_components/BaseDialog';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';
import BaseHeading from '@/app/_components/BaseHeading';
import IconPencilAlt from '@/app/_components/icons/IconPencilAlt';
import BaseToaster from '@/app/_components/BaseToaster';
import { useGetAssignmentsQuery } from '@/graphql/queries/assignments/getAssignments.generated';
import DeclineReasonBanner from '@/app/(dashboard)/opdracht-plaatsen/mijn-opdrachten/_components/DeclineReasonBanner';
import { useReviewAssignmentMutation } from '@/graphql/mutations/assignments/reviewAssignment.generated';

type AssignmentFormPagePropsType = {
  assignment?: GetAssignmentQuery['assignment'];
  assignmentType: AssignmentType;
  admin?: boolean;
  isNewAssignment?: boolean;
  asideComponent: React.JSX.Element;
  saveMutation?: (Options?: any) => any;
  mutationError?: ApolloError;
  showToolbar?: boolean;
  onSave?: () => Promise<void>;
  onHasChanged?: (hasChanged: boolean) => void;
};

const defaultProps = {
  assignmentId: -1,
  showToolbar: true,
};

const AssignmentFormPage = forwardRef(
  (props: Readonly<AssignmentFormPagePropsType>, ref: any) => {
    const {
      assignmentType,
      assignment,
      admin,
      asideComponent,
      isNewAssignment,
      saveMutation,
      mutationError,
      showToolbar = true,
      onSave,
      onHasChanged,
    } = { ...defaultProps, ...props };

    const t = useTranslations();
    const validationSchema = getAssignmentCreateSchema();
    const router = useRouter();
    const [settingStatusModal, setSettingStatusModal] = useState(false);
    const [statusConfirmationModal, setStatusConfirmationModal] =
      useState(false);
    const [leavePageModal, setLeavePageModal] = useState(false);
    const formRef: any = useRef(null);
    const [removeAssignmentModalIsOpen, setRemoveAssignmentModalIsOpen] =
      useState<boolean>(false);
    const [formData, setFormData] = useState<AssignmentFormData>({
      title: '',
      externalCode: '',
      description: '',
      contractType: undefined,
      rateType: undefined,
      rateFrom: null,
      rateTo: null,
      onLocation: undefined,
      province: undefined,
      place: '',
      hideInDescription: false,
      customerRelation: undefined,
      customerRelationCompany: '',
      customerRelationCompanyVisible: true,
      applicationDeadlineDate: undefined,
      startAsap: false,
      duration: '',
      durationType: undefined,
      durationExtendable: false,
      hoursFrom: null,
      hoursTo: null,
      startDate: undefined,
      expertises: [],
    });
    const [initialFormData, setInitialFormData] =
      useState<AssignmentFormData>();
    const [succesToaster, setSuccesToaster] = useState<any>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
      []
    );
    const [saveWithCheckMutation, { error: errorSaveWithCheck }] =
      useCreateAssignmentMutation();
    const [saveDraftMutation, { error: draftSaveError }] =
      useCreateDraftAssignmentMutation();
    const [reviewAssignmentMutation] = useReviewAssignmentMutation();

    const { data: nextAssignment } = useGetAssignmentsQuery({
      variables: {
        where: {
          status: {
            in: [AssignmentStatus.PendingReview, AssignmentStatus.InReview],
          },
          NOT: [
            {
              id: {
                equals: Number(assignment?.id),
              },
            },
          ],
          createdAt: {
            gte: assignment?.createdAt,
          },
        },

        orderBy: [{ createdAt: SortOrder.Asc }],
        take: 1,
      },
    });

    const assignmentHasChanged = useMemo(() => {
      return JSON.stringify(initialFormData) !== JSON.stringify(formData);
    }, [initialFormData, formData]);

    const setAssignmentInReview = async (assignmentId: number) => {
      await reviewAssignmentMutation({
        variables: { assignmentId: assignmentId },
      });
    };

    const saveAssignment = async () => {
      if (admin) {
        await validateForm();
      }

      if (formRef.current) {
        let data = prepareFormData();
        const variables = {
          data,
          assignmentId: Number(assignment?.id),
        };

        try {
          if (saveMutation) {
            await saveMutation({
              variables,
            });
          } else {
            await saveDraftMutation({
              variables,
            });
          }

          if (onSave) {
            await onSave();
          } else if (!admin) {
            router.push(
              '/opdracht-plaatsen/mijn-opdrachten?toaster=savedAsDraft'
            );
          } else {
            setSuccesToaster(true);
            setInitialFormData(formData);
          }
        } catch (e: unknown) {
          if (e instanceof ValidationError) {
            // fill validation errors with yup errors, let the form handle it
            setValidationErrors(e.inner);
          }
        }

        return false;
      }
    };

    useImperativeHandle(ref, () => ({
      saveAssignment() {
        return saveAssignment();
      },
    }));

    const handleFormSubmit = async () => {
      if (formRef.current) {
        const data = prepareFormData();

        if (!data) {
          return;
        }

        try {
          if (await validateForm()) {
            const response = await saveWithCheckMutation({
              variables: { data, assignmentId: Number(assignment?.id) },
            });

            router.push(
              '/opdracht-plaatsen/nieuwe-opdracht/preview/' +
                (response.data as any)?.createAssignment.id
            );
          }
        } catch (e: unknown) {
          if (e) {
            console.log('could not save the assignment:', e);
            throw e;
          }
        }

        return false;
      }
    };

    const timestampToDateString = (timestamp: any) =>
      new Date(timestamp).toISOString().slice(0, 10);

    const prepareInitialFromData = (
      assignment: GetAssignmentQuery['assignment']
    ) => {
      if (assignment !== null && assignment !== undefined) {
        let initialFormData: AssignmentFormData;

        initialFormData = {
          title: assignment.title ? assignment.title : '',
          externalCode: assignment.externalCode ? assignment.externalCode : '',
          description: assignment.description ? assignment.description : '',
          contractType: assignment.contractType ?? undefined,
          rateFrom: assignment.rateFrom
            ? parseFloat(String(assignment.rateFrom)?.replace(',', '.'))
            : null,
          rateTo: assignment.rateTo
            ? parseFloat(String(assignment.rateTo)?.replace(',', '.'))
            : null,
          province: assignment.province ? assignment.province : undefined,
          place: assignment.place ? assignment.place : '',
          hideInDescription: assignment.hideInDescription,
          customerRelationCompany: assignment.customerRelationCompany
            ? assignment.customerRelationCompany
            : undefined,
          customerRelationCompanyVisible:
            assignment.customerRelationCompanyVisible,
          startAsap: assignment.startAsap,
          durationType: assignment.durationType ? assignment.durationType : '',
          rateType: assignment.rateType ? assignment.rateType : undefined,
          durationExtendable: assignment.durationExtendable,
          duration: assignment.duration ? String(assignment.duration) : '',
          hoursFrom: assignment.hoursFrom
            ? parseFloat(String(assignment.hoursFrom)?.replace(',', '.'))
            : null,
          hoursTo: assignment.hoursTo
            ? parseFloat(String(assignment.hoursTo)?.replace(',', '.'))
            : null,
          customerRelation: !assignment.customerRelation
            ? undefined
            : assignment.customerRelation,
          onLocation: assignment.onLocation ? assignment.onLocation : undefined,
          expertises: [],
        };

        if (assignment?.applicationDeadlineDate) {
          initialFormData.applicationDeadlineDate = timestampToDateString(
            assignment?.applicationDeadlineDate
          );
        }

        if (assignment?.startDate) {
          initialFormData.startDate = timestampToDateString(
            assignment?.startDate
          );
        }

        if (assignment?.expertises) {
          initialFormData.expertises = assignment.expertises.map(
            (expertise) => expertise.expertise
          );
        }

        return initialFormData;
      }
      return null;
    };

    useEffect(() => {
      const data = prepareInitialFromData(assignment);

      if (!data) {
        return;
      }

      if (
        assignment?.status === AssignmentStatus.PendingReview &&
        assignment.currentStatus?.key === AssignmentStatus.PendingReview &&
        admin
      ) {
        setAssignmentInReview(Number(assignment?.id));
      }

      setInitialFormData(data);
      handleFormDataChange(data);
    }, [assignment]);

    useEffect(() => {
      handleError(errorSaveWithCheck);
    }, [errorSaveWithCheck]);

    useEffect(() => {
      handleError(draftSaveError);
    }, [draftSaveError]);

    useEffect(() => {
      handleError(mutationError);
    }, [mutationError]);

    useEffect(() => {
      onHasChanged?.(assignmentHasChanged);
    }, [assignmentHasChanged]);

    const handleFormDataChange = (data: AssignmentFormData) => {
      setFormData(data);
    };

    const handleError = (error: ApolloError | undefined) => {
      if (error?.graphQLErrors?.length) {
        const gqlError = error?.graphQLErrors[0];

        if (gqlError?.message) {
          // @TODO: show toaster with error message
          console.error(gqlError.message);
        }
      }
    };

    const prepareExpertises = () => {
      const initialExpertises = initialFormData?.expertises || [];
      const currentExpertises = formData?.expertises || [];
      const assignmentExpertises = assignment?.expertises || [];

      const listToBeDeleted = initialExpertises.filter(
        (initialExpertise) => !currentExpertises.includes(initialExpertise)
      );

      const deleteMany = listToBeDeleted
        .map((item) => {
          const assignmentExpertise = assignmentExpertises.find(
            (expertise) => expertise.expertise === item
          );
          if (assignmentExpertise) {
            return { id: { equals: Number(assignmentExpertise.id) } };
          }
        })
        .filter(Boolean);

      const create = currentExpertises
        .filter(
          (currentExpertise) => !initialExpertises.includes(currentExpertise)
        )
        .map((formExpertiseToAdd) => ({ expertise: formExpertiseToAdd }));

      return { create, deleteMany };
    };

    const prepareFormData = () => {
      const { create, deleteMany } = prepareExpertises();

      return {
        type: assignmentType,
        title: formData.title ? formData.title : undefined,
        externalCode: formData.externalCode ? formData.externalCode : undefined,
        description: formData.description ? formData.description : undefined,
        contractType: formData.contractType ? formData.contractType : undefined,
        rateFrom: formData.rateFrom
          ? parseFloat(String(formData.rateFrom)?.replace(',', '.'))
          : null,
        rateTo: formData.rateTo
          ? parseFloat(String(formData.rateTo)?.replace(',', '.'))
          : null,
        province: formData.province ? formData.province : undefined,
        place: formData.place ? formData.place : undefined,
        hideInDescription: formData.hideInDescription
          ? formData.hideInDescription
          : undefined,
        customerRelationCompany: formData.customerRelationCompany
          ? formData.customerRelationCompany
          : undefined,
        customerRelationCompanyVisible: formData.customerRelationCompanyVisible
          ? formData.customerRelationCompanyVisible
          : undefined,
        applicationDeadlineDate: formData.applicationDeadlineDate
          ? formData.applicationDeadlineDate
          : undefined,
        startAsap: formData.startAsap ? formData.startAsap : undefined,
        durationType: formData.durationType ? formData.durationType : null,
        rateType: formData.rateType ? formData.rateType : undefined,
        durationExtendable: formData.durationExtendable
          ? formData.durationExtendable
          : undefined,
        startDate: formData.startDate ? formData.startDate : undefined,
        duration: formData.duration ? Number(formData.duration) : undefined,
        hoursFrom: formData.hoursFrom
          ? parseFloat(String(formData.hoursFrom)?.replace(',', '.'))
          : null,
        hoursTo: formData.hoursTo
          ? parseFloat(String(formData.hoursTo)?.replace(',', '.'))
          : null,
        customerRelation: !formData.customerRelation
          ? undefined
          : formData.customerRelation,
        onLocation: formData.onLocation ? formData.onLocation : undefined,
        expertises: {
          ...(deleteMany.length > 0 && { deleteMany }),
          ...(create.length > 0 && { create }),
        },
      } as AssignmentUpdateInput;
    };

    const validateForm = async () => {
      try {
        const data = prepareFormData();
        await validationSchema.validate(data, { abortEarly: false });
        setValidationErrors([]);
        return true;
      } catch (e: unknown) {
        if (e instanceof ValidationError) {
          setValidationErrors(e.inner);
        }
        return false;
      }
    };

    const handleClickApplyButton = async () => {
      if (await validateForm()) {
        setSettingStatusModal(true);
      }
    };

    const closeStatusModal = () => {
      setSettingStatusModal(false);
    };

    const getNextAssignment = () => {
      router.push(`/admin/keuren/${nextAssignment?.assignments?.[0]?.id}`);
      setStatusConfirmationModal(false);
    };

    const handleLeavePageButtonClick = () => {
      if (assignmentHasChanged) {
        setLeavePageModal(true);
      } else {
        router.push('/admin/keuren');
      }
    };

    const handleLeavePageAction = () => {
      saveAssignment().then(() => router.push('/admin/keuren'));
    };

    const renderHeaderVariant = () => {
      const commonProps = {
        overtitle: admin
          ? t('admin.assignments.backToOverview')
          : t('assignment.toolbar.newAssignment'),
      };

      const cancelHref =
        assignmentType === AssignmentType.Top
          ? '/dashboard'
          : '/opdracht-plaatsen/nieuwe-opdracht/';

      if (admin) {
        return (
          <BaseToolbarSub
            title={t('admin.assignments.approveAssignment')}
            onClick={handleLeavePageButtonClick}
            {...commonProps}
          >
            <BaseButton
              theme="secondary"
              wide
              onClick={saveAssignment}
              disabled={!assignmentHasChanged}
            >
              <IconDocument className="hidden sm:flex" />
              <span>{t('global.save')}</span>
            </BaseButton>
            <BaseButton
              theme="primary"
              wide
              onClick={handleClickApplyButton}
              disabled={assignmentHasChanged}
            >
              <IconPencilAlt />
              <span>{t('admin.assignments.changeStatus')}</span>
            </BaseButton>
            {succesToaster && (
              <div className="absolute bottom-0 left-0 w-full translate-y-full">
                <BaseToaster
                  theme="success"
                  onClose={() => setSuccesToaster(false)}
                >
                  {t(`assignment.toaster.changesSaved`)}
                </BaseToaster>
              </div>
            )}
          </BaseToolbarSub>
        );
      }

      return (
        <BaseToolbarSub
          title={t(`assignment.toolbar.title.${assignmentType}`)}
          {...commonProps}
        >
          {isNewAssignment ? (
            <div className="hidden md:block">
              <BaseButton theme="secondary" href={cancelHref} wide>
                {t('assignment.toolbar.cancel')}
              </BaseButton>
            </div>
          ) : (
            <BaseButton
              theme="secondary"
              square
              onClick={() => setRemoveAssignmentModalIsOpen(true)}
            >
              <IconTrash />
            </BaseButton>
          )}
          <BaseButton theme="secondary" wide onClick={saveAssignment}>
            <IconDocument className="hidden sm:flex" />
            <span>{t('assignment.toolbar.saveAsDraft')}</span>
          </BaseButton>
          <BaseButton wide onClick={handleFormSubmit}>
            <IconEye className="hidden sm:flex" />
            <span>{t('assignment.toolbar.preview')}</span>
          </BaseButton>
        </BaseToolbarSub>
      );
    };

    return (
      <>
        {showToolbar && renderHeaderVariant()}
        {assignment?.currentStatus.key === AssignmentStatus.Declined && (
          <DeclineReasonBanner
            assignmentTitle={assignment.title}
            assignmentId={assignment.id}
            currentStatus={assignment?.currentStatus}
          />
        )}
        <div className="xl:flex">
          <AssignmentForm
            assignmentId={Number(assignment?.id)}
            initialFormData={initialFormData}
            ref={formRef}
            onFormDataChange={handleFormDataChange}
            validationErrors={validationErrors}
            admin={admin}
          />
          <aside className="w-full lg:max-w-sm 2xl:max-w-md">
            {asideComponent}
          </aside>
        </div>

        <AssignmentDeleteModal
          isOpen={removeAssignmentModalIsOpen}
          onClose={() => setRemoveAssignmentModalIsOpen(false)}
          assignmentId={Number(assignment?.id)}
        />

        <ChangeAssignmentStatusModal
          isOpen={settingStatusModal}
          onClose={() => closeStatusModal()}
          onConfirm={() => {
            setStatusConfirmationModal(true);
            setSettingStatusModal(false);
          }}
          assignmentId={Number(assignment?.id)}
        />

        <Modal
          isOpen={statusConfirmationModal}
          onClose={() => setStatusConfirmationModal(false)}
          footer={
            <>
              <BaseButton theme="secondary" href={'/admin/keuren'}>
                {t('global.toOverview')}
              </BaseButton>

              {nextAssignment?.assignments?.[0]?.id && (
                <BaseButton onClick={getNextAssignment}>
                  {t('global.approveNextAssignment')}
                </BaseButton>
              )}
            </>
          }
        >
          <div className="flex justify-center">
            <i className="bg-success-50 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
              <span className="bg-success-100 flex h-14 w-14 items-center justify-center rounded-full">
                <IconCheckmarkMd className="text-success-500 h-10 w-10" />
              </span>
            </i>
          </div>
          <div className="grid gap-1 text-center">
            <BaseHeading type="h2" size="base">
              {t('global.theAssignmentStatusIsChanged')}
            </BaseHeading>
          </div>
        </Modal>

        <Modal
          isOpen={leavePageModal}
          onClose={() => setLeavePageModal(false)}
          title={t('assignment.detail.leavePageModalTitle')}
          footer={
            <>
              <BaseButton theme="secondary" href={'/admin/keuren'} size="lg">
                {t('global.no')}
              </BaseButton>

              <BaseButton onClick={() => handleLeavePageAction()} size="lg">
                {t('global.yes')}
              </BaseButton>
            </>
          }
        >
          <p>{t('assignment.detail.leavePageModalText')}</p>
        </Modal>
      </>
    );
  }
);

AssignmentFormPage.displayName = 'AssignmentFormPage';

export default AssignmentFormPage;
