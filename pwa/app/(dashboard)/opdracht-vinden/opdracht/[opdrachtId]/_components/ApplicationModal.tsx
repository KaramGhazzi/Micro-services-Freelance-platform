'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ValidationError } from 'yup';
import { getAssignmentApplicationCreateSchema } from '@package/types/dist/yup/core/assignment';
import { UsageType } from '@package/types/dist/class-validator';
import pMap from 'p-map';
import People from './People';
import MultiFileUpload from './MultiFileUpload';
import {
  AssignmentApplicationUpdateInput,
  RateType,
  Availability,
  File as GraphqlFile,
  SortOrder,
  ApplicationProfile,
  ApplicationProfileFile,
  AssignmentApplicationFile,
} from '@/graphql/types';
import useFileUpload from '@/app/_libs/useFileUpload';
import useFileDelete from '@/app/_libs/useFileDelete';
import { useCreateAssignmentApplicationMutation } from '@/graphql/mutations/assignment-applications/createAssignmentApplication.generated';
import { useCreateFileForAssignmentApplicationMutation } from '@/graphql/mutations/assignment-applications/createFileForAssignmentApplication.generated';
import IconChevronDown from '@/app/_components/icons/IconChevronDown';
import BaseButton from '@/app/_components/BaseButton';
import BaseTextarea from '@/app/_components/BaseTextarea';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseSelect from '@/app/_components/BaseSelect';
import BaseInput from '@/app/_components/BaseInput';
import BaseTagInput from '@/app/_components/BaseTagInput';
import Modal from '@/app/_components/BaseDialog';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';
import BaseNumberInput from '@/app/_components/BaseNumberInput';
import rateTypeOptions from '@/app/(dashboard)/opdracht-plaatsen/nieuwe-opdracht/_data/rateTypeOptions';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import { useCreateDraftAssignmentApplicationMutation } from '@/graphql/mutations/assignment-applications/createDraftAssignmentApplication.generated';
import { useGetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';
import IconTrash from '@/app/_components/icons/IconTrash';
import { useDeleteAssignmentApplicationMutation } from '@/graphql/mutations/assignment-applications/deleteAssignmentApplication.generated';
import { useRemainingUsageByCreditTypeQuery } from '@/graphql/queries/usage/remainingUsageByCreditType.generated';
import acceptedFiles from '@/app/(dashboard)/_data/acceptedFiles';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';
import { useGetMyApplicationProfilesQuery } from '@/graphql/queries/application-profile/getMyApplicationProfiles.generated';
import { parseTags, encodeTags } from '@/app/_libs/Tags';
import IconArrowDiagonalOut from '@/app/_components/icons/IconArrowDiagonalOut';
import { useAuth } from '@/app/_hooks/useAuth';

type Props = {
  assignmentId: string;
  assignment: any;
  title?: string;
  onCancelClick: () => void;
  onApplySubmit: () => void;
  onOutOfCredits: () => void;
};

const initialFormData = {
  motivation: '',
  availability: Availability.Immediately,
  availableHours: null,
  availableFrom: undefined,
  rateType: RateType.Hour,
  rateFrom: null,
  rateTo: null,
  email: '',
  phoneNumber: '',
  city: '',
  expertises: null,
  personalQualities: null,
  background: '',
  linkedInURL: '',
  websiteURL: '',
};

const ApplicationModal = ({
  assignment,
  title,
  onCancelClick,
  onApplySubmit,
  onOutOfCredits,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('assignment');
  const formRef = useRef<HTMLFormElement>(null);
  const assignmentApplicationId = Number(searchParams?.get('concept'));
  const { currentCompany, currentUser } = useAuth();
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<GraphqlFile[]>([]);
  const [currentFiles, setCurrentFiles] = useState<GraphqlFile[]>([]);
  const [selectedApplicationProfile, setSelectedApplicationProfile] =
    useState<Partial<ApplicationProfile> | null>(null);
  const [draftIsLoading, setDraftIsLoading] = useState(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [personalFieldsVisible, setPersonalFieldsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const validationSchema = getAssignmentApplicationCreateSchema();

  const [deleteAssignmentApplicationMutation] =
    useDeleteAssignmentApplicationMutation();
  const [saveMutation] = useCreateAssignmentApplicationMutation();
  const [saveDraftMutation] = useCreateDraftAssignmentApplicationMutation();
  const [saveFileMutation] = useCreateFileForAssignmentApplicationMutation();
  const { uploadFile } = useFileUpload();
  const { deleteFile } = useFileDelete();

  const { data: remainingUsage, loading: remainingUsageLoading } =
    useRemainingUsageByCreditTypeQuery({
      variables: {
        usageType: UsageType.ASSIGNMENT_APPLICATION,
      },
    });

  const { data: { myApplicationProfiles: applicationProfiles } = {} } =
    useGetMyApplicationProfilesQuery({
      variables: {
        orderBy: [{ createdAt: SortOrder.Desc }],
      },
    });

  const [formData, setFormData] =
    useState<AssignmentApplicationUpdateInput>(initialFormData);

  const handleCancelClick = () => {
    onCancelClick();
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const prepareFormData = () => {
    return {
      rateFrom: formData.rateFrom
        ? parseFloat(String(formData.rateFrom)?.replace(',', '.'))
        : undefined,
      rateTo: formData.rateTo
        ? parseFloat(String(formData.rateTo)?.replace(',', '.'))
        : undefined,
      availableHours: formData.availableHours
        ? Number(formData.availableHours)
        : 0,
      motivation: formData.motivation ?? undefined,
      rateType: formData.rateType ?? undefined,
      email: formData.email ?? undefined,
      phoneNumber: formData.phoneNumber ?? undefined,
      city: formData.city ?? undefined,
      background: formData.background ?? undefined,
      expertises: encodeTags(formData.expertises),
      personalQualities: encodeTags(formData.personalQualities),
      linkedInURL: formData.linkedInURL ?? undefined,
      websiteURL: formData.websiteURL ?? undefined,
      availableFrom: formData.availableFrom ?? undefined,
      availability: formData.availability ?? undefined,
    };
  };

  const handleExpertiseChange = (updatedTags: string[]) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      expertises: updatedTags,
    }));
  };

  const handlePersonalQualitiesChange = (updatedTags: string[]) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      personalQualities: updatedTags,
    }));
  };

  const handleFilesAdded = (files: File[]) => {
    setFilesToUpload(files);
  };

  const handleFilesDeleted = (files: GraphqlFile[]) => {
    setDeletedFiles(files);

    // Remove the deleted files from the form data
    files.forEach((file) => {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        documents: prevFormData.documents?.filter(
          (document: GraphqlFile) => document.blobName !== file.blobName
        ),
      }));
    });
  };

  // const checkFormBeforePrivacyModal = async () => {
  //   try {
  //     await validationSchema.validate(formData, { abortEarly: false });
  //     setPrivacyModalIsOpen(true);
  //   } catch (e: unknown) {
  //     if (e instanceof ValidationError) {
  //       console.log(e.inner);
  //       // fill validation errors with yup errors, let the form handle it
  //       setValidationErrors(e.inner);
  //     }
  //   }
  // };

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(prepareFormData()) as {
      [index: string]: string | undefined;
    }
  );

  useEffect(() => {
    if (validationErrors?.length && formRef.current) {
      formRef.current.reportValidity();

      const errors: { [index: string]: string | undefined } = {};
      validationErrors.forEach((error) => {
        if (error.path && Object.keys(prepareFormData()).includes(error.path)) {
          errors[error.path] = error.message;
        }
      });
      setFormErrors(errors);
    }
  }, [validationErrors]);

  const { data: assignmentApplicationData, refetch } =
    useGetAssignmentApplicationQuery({
      variables: {
        where: { id: { equals: assignmentApplicationId } },
      },
      skip: assignmentApplicationId === 0,
    });

  useEffect(() => {
    const data = { ...assignmentApplicationData?.assignmentApplication };
    if (data.documents) {
      setCurrentDocuments(data.documents as AssignmentApplicationFile[]);
    }

    if (data.phoneNumber) {
      updateFormData('phoneNumber', data.phoneNumber);
    }
    if (data.city) {
      updateFormData('city', data.city);
    }
    if (data.linkedInURL) {
      updateFormData('linkedInURL', data.linkedInURL);
    }
    if (data.websiteURL) {
      updateFormData('websiteURL', data.websiteURL);
    }
    if (data.motivation) {
      updateFormData('motivation', data.motivation);
    }
    if (data.rateType) {
      updateFormData('rateType', data.rateType);
    }
    if (data.rateFrom) {
      updateFormData('rateFrom', data.rateFrom);
    }
    if (data.rateTo) {
      updateFormData('rateTo', data.rateTo);
    }
    if (data.availability) {
      updateFormData('availability', data.availability);
    }
    if (data.availableHours) {
      updateFormData('availableHours', data.availableHours);
    }
    if (data.expertises) {
      updateFormData('expertises', data.expertises);
    }
    if (data.personalQualities) {
      updateFormData('personalQualities', data.personalQualities);
    }
    if (data.background) {
      updateFormData('background', data.background);
    }
  }, [assignmentApplicationData]);

  useEffect(() => {
    updateFormData('email', currentUser?.email ?? '');
    updateFormData('phoneNumber', currentUser?.phoneNumber ?? '');
    updateFormData('linkedInURL', currentUser?.linkedInUrl ?? '');
    updateFormData('websiteURL', currentCompany?.websiteUrl ?? '');
    updateFormData('city', currentCompany?.address?.city ?? '');
  }, [currentCompany, currentUser]);

  const mapApplicationProfileToAssignmentApplication = (
    selectedApplicationProfile: Partial<ApplicationProfile>
  ): AssignmentApplicationUpdateInput => {
    return {
      email: currentUser?.email ?? '',
      phoneNumber: currentUser?.phoneNumber ?? '',
      linkedInURL: currentUser?.linkedInUrl ?? '',
      websiteURL: currentCompany?.websiteUrl ?? '',
      city: currentCompany?.address?.city ?? '',
      motivation: formData.motivation ?? '',
      availability:
        selectedApplicationProfile.availability ?? Availability.Immediately,
      availableHours: selectedApplicationProfile.availableHours ?? null,
      availableFrom: selectedApplicationProfile.availableFrom ?? undefined,
      rateType: selectedApplicationProfile.rateType ?? RateType.Hour,
      rateFrom: selectedApplicationProfile.rateFrom ?? null,
      rateTo: selectedApplicationProfile.rateTo ?? null,
      expertises: selectedApplicationProfile.expertises ?? null,
      personalQualities: selectedApplicationProfile.personalQualities ?? null,
      background: selectedApplicationProfile.background ?? '',
    };
  };

  const setCurrentDocuments = (
    incomingDocuments: ApplicationProfileFile[] | AssignmentApplicationFile[]
  ) => {
    const documents: GraphqlFile[] = incomingDocuments?.map(
      (document) => document.file
    );

    setCurrentFiles(documents);
  };

  useEffect(() => {
    if (selectedApplicationProfile) {
      const mappedFormData = mapApplicationProfileToAssignmentApplication(
        selectedApplicationProfile
      );
      setFormData(mappedFormData);

      if (selectedApplicationProfile.documents) {
        setCurrentDocuments(selectedApplicationProfile.documents);
      }
    }
  }, [selectedApplicationProfile]);

  useEffect(() => {
    if (applicationProfiles?.length === 1) {
      setSelectedApplicationProfile(
        applicationProfiles[0] as Partial<ApplicationProfile>
      );
      setCurrentDocuments(
        applicationProfiles[0].documents as ApplicationProfileFile[]
      );
    }
  }, [applicationProfiles]);

  const updateFormData = <T extends keyof AssignmentApplicationUpdateInput>(
    key: T,
    value: AssignmentApplicationUpdateInput[T]
  ) => {
    setFormData((prevFormData: AssignmentApplicationUpdateInput) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  // let [privacyModalIsOpen, setPrivacyModalIsOpen] = useState(false);
  let [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  const uploadFiles = async (uuid: string) => {
    await pMap(
      filesToUpload,
      async (file) => {
        const fileData = await uploadFile('uploads', file);

        await saveFileMutation({
          variables: {
            data: {
              name: file.name,
              blobName: fileData.blobName,
              size: file.size,
            },
            assignmentApplicationUUID: uuid,
          },
        });
      },
      { concurrency: 1, stopOnError: false }
    );
  };

  const deleteFiles = async () => {
    await pMap(
      deletedFiles,
      async (deletedFile) => {
        await deleteFile('uploads', deletedFile.blobName);
      },
      { concurrency: 1, stopOnError: false }
    );
  };

  const saveAsDraft = async () => {
    if (formRef.current) {
      setDraftIsLoading(true);
      const data = prepareFormData();

      try {
        const { data: assignmentApplicationDraft } = await saveDraftMutation({
          variables: {
            data,
            assignmentId: Number(assignment.id),
            assignmentApplicationId: assignmentApplicationId ?? undefined,
          },
        });

        if (
          assignmentApplicationDraft?.createDraftAssignmentApplication?.uuid
        ) {
          await Promise.all([
            uploadFiles(
              assignmentApplicationDraft.createDraftAssignmentApplication?.uuid
            ),
            deleteFiles(),
          ]);
        }

        refetch();
        setDraftIsLoading(false);
        router.push('/opdracht-vinden/mijn-reacties?toaster=savedAsDraft');
      } catch (e: unknown) {
        setDraftIsLoading(false);
        if (e instanceof ValidationError) {
          // fill validation errors with yup errors, let the form handle it
          setValidationErrors(e.inner);
        }
      }

      return false;
    }
  };

  const submitApplication = async () => {
    //When the user is out of credits, show the modal
    if (remainingUsageLoading) {
      return;
    }

    if (
      remainingUsage?.remainingUsageByCreditType.amount !== undefined &&
      remainingUsage?.remainingUsageByCreditType.amount < 1
    ) {
      onOutOfCredits();
      return;
    }

    setSubmitIsLoading(true);
    const data = prepareFormData();

    setValidationErrors([]);

    try {
      const validatedData = await validationSchema.validate(data, {
        abortEarly: false,
      });

      updateFormData('websiteURL', validatedData.websiteURL);
      data.websiteURL = validatedData.websiteURL;

      const res = await saveMutation({
        variables: {
          data,
          assignmentId: Number(assignment.id),
          assignmentApplicationId: assignmentApplicationId ?? undefined,
        },
      });
      if (!res.data?.createAssignmentApplication?.uuid) {
        throw new Error('Failed to create application');
      }

      await uploadFiles(res.data.createAssignmentApplication.uuid);

      setSubmitIsLoading(false);
      setConfirmModalIsOpen(true);
      setValidationErrors([]);
    } catch (e: unknown) {
      setSubmitIsLoading(false);
      if (e instanceof ValidationError) {
        // fill validation errors with yup errors, let the form handle it
        setValidationErrors(e.inner);
      } else {
        alert('Er is iets misgegaan, probeer het later opnieuw');
      }
    }
  };

  const handleDeleteDraft = async (assignmentApplicationId: number) => {
    try {
      const response = await deleteAssignmentApplicationMutation({
        variables: {
          assignmentApplicationId: assignmentApplicationId,
        },
      });
      if (response) {
        router.push('/opdracht-vinden/mijn-reacties');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedApplicationProfileId = event.target.value;
    const selectedProfile = applicationProfiles?.find(
      (profile) => profile.id === selectedApplicationProfileId
    );
    if (selectedProfile) {
      setSelectedApplicationProfile(
        selectedProfile as Partial<ApplicationProfile>
      );
    }
  };

  return (
    <>
      <div className="fixed bottom-14 left-0 z-30 w-full  rounded-t-2xl shadow-xl lg:bottom-0 lg:left-auto lg:right-8 lg:max-w-3xl">
        <header
          className="sticky top-0 z-10 flex h-14 transform-gpu cursor-pointer items-center justify-between gap-5 rounded-t-2xl bg-neutral-100 px-6 font-semibold transition-all hover:bg-neutral-200 lg:px-10"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="truncate">
            {`${t('application.general.applyFor')} ${title}`}
          </span>
          <span
            className={classNames({
              'shrink-0 transition-all': true,
              'rotate-180': isCollapsed,
            })}
          >
            <IconChevronDown />
          </span>
        </header>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{
                ease: 'easeOut',
                duration: 0.2,
              }}
              className="relative z-0 max-h-[calc(100vh-256px)] overflow-y-auto bg-white lg:max-h-[calc(100vh-140px)]"
            >
              <form ref={formRef} className="divide-y-4 divide-neutral-50">
                <div className="divide-y-4 divide-neutral-50">
                  <section className="grid gap-6 p-6 lg:p-10">
                    <People
                      users={[
                        {
                          name: `${currentUser?.firstName} ${currentUser?.lastName}`,
                          subtitle: currentCompany?.name ?? '-',
                          imageUrl: getImageUrl(
                            currentUser?.profilePhoto?.container,
                            currentUser?.profilePhoto?.blobName
                          ),
                        },
                        {
                          name: `${assignment?.owner?.firstName} ${assignment?.owner?.lastName}`,
                          subtitle: assignment?.company?.name ?? '-',
                          imageUrl: getImageUrl(
                            assignment?.owner?.profilePhoto?.container,
                            assignment?.owner?.profilePhoto?.blobName
                          ),
                        },
                      ]}
                    />

                    <div className="grid gap-6 lg:grid-cols-2">
                      {personalFieldsVisible && (
                        <>
                          <div>
                            <BaseInput
                              label={t('application.email.label')}
                              placeholder={t('application.email.placeholder')}
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              type="email"
                              error={formErrors['email']}
                            />
                          </div>
                          <div>
                            <BaseInput
                              label={t('application.phone.label')}
                              placeholder={t('application.phone.placeholder')}
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                              type="tel"
                              error={formErrors['phoneNumber']}
                            />
                          </div>
                          <div className="lg:col-span-2">
                            <BaseInput
                              label={t('application.city.label')}
                              placeholder={t('application.city.placeholder')}
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              type="text"
                              error={formErrors['city']}
                            />
                          </div>
                          <div>
                            <BaseInput
                              label={t('application.linkedIn.label')}
                              placeholder={t(
                                'application.linkedIn.placeholder'
                              )}
                              name="linkedInURL"
                              value={formData.linkedInURL}
                              onChange={handleInputChange}
                              type="url"
                              error={formErrors['linkedInURL']}
                            />
                          </div>
                          <div>
                            <BaseInput
                              label={t('application.website.label')}
                              placeholder={t('application.website.placeholder')}
                              name="websiteURL"
                              value={formData.websiteURL}
                              onChange={handleInputChange}
                              type="url"
                              error={formErrors['websiteURL']}
                            />
                          </div>
                        </>
                      )}
                      {!personalFieldsVisible && (
                        <div className="grid gap-3 lg:col-span-2">
                          <header className="flex items-center justify-between gap-3">
                            <div className="text-sm font-medium text-neutral-700">
                              {t('application.myInfo.label')}
                            </div>
                            <BaseButton
                              theme="secondary"
                              size="sm"
                              onClick={() => setPersonalFieldsVisible(true)}
                            >
                              <span>{t('application.myInfo.button')}</span>
                            </BaseButton>
                          </header>

                          <dl className="divide-y divide-neutral-100 rounded-xl bg-neutral-50 text-sm">
                            <div className="grid py-[10px] sm:grid-cols-2">
                              <dt className="px-3 font-medium text-neutral-900">
                                {t('application.email.label')}
                              </dt>
                              <dd className="px-3 text-sm text-neutral-700">
                                {formData.email && formData.email.length > 0
                                  ? formData.email
                                  : '-'}
                              </dd>
                            </div>
                            <div className="grid py-[10px] sm:grid-cols-2">
                              <dt className="px-3 font-medium text-neutral-900">
                                {t('application.phone.label')}
                              </dt>
                              <dd className="px-3 text-sm text-neutral-700">
                                {formData.phoneNumber &&
                                formData.phoneNumber.length > 0
                                  ? formData.phoneNumber
                                  : '-'}
                              </dd>
                            </div>
                            <div className="grid py-[10px] sm:grid-cols-2">
                              <dt className="px-3 font-medium text-neutral-900">
                                {t('application.city.label')}
                              </dt>
                              <dd className="px-3 text-sm text-neutral-700">
                                {formData.city && formData.city.length > 0
                                  ? formData.city
                                  : '-'}
                              </dd>
                            </div>
                            {formData.linkedInURL && (
                              <div className="grid py-[10px] sm:grid-cols-2">
                                <dt className="px-3 font-medium text-neutral-900">
                                  {t('application.linkedIn.label')}
                                </dt>
                                <dd className="px-3 text-sm text-neutral-700">
                                  {formData.linkedInURL &&
                                  formData.linkedInURL.length > 0 ? (
                                    <a
                                      href={formData.linkedInURL}
                                      target="_blank"
                                      className="text-primary-600 inline-flex items-center gap-x-1 text-sm font-semibold"
                                    >
                                      <span>
                                        {t('application.general.visit')}
                                      </span>
                                      <IconArrowDiagonalOut />
                                    </a>
                                  ) : (
                                    '-'
                                  )}
                                </dd>
                              </div>
                            )}
                            {formData.websiteURL && (
                              <div className="grid py-[10px] sm:grid-cols-2">
                                <dt className="px-3 font-medium text-neutral-900">
                                  {t('application.website.label')}
                                </dt>
                                <dd className="px-3 text-sm text-neutral-700">
                                  {formData.websiteURL &&
                                  formData.websiteURL.length > 0 ? (
                                    <a
                                      href={formData.websiteURL}
                                      target="_blank"
                                      className="text-primary-600 inline-flex items-center gap-x-1 text-sm font-semibold"
                                    >
                                      <span>
                                        {t('application.general.visit')}
                                      </span>
                                      <IconArrowDiagonalOut />
                                    </a>
                                  ) : (
                                    '-'
                                  )}
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      )}

                      <div className="lg:col-span-2">
                        <BaseTextarea
                          label={t('application.motivation.label')}
                          placeholder={t('application.motivation.placeholder')}
                          name="motivation"
                          value={formData.motivation}
                          onChange={handleInputChange}
                          required
                          error={formErrors['motivation']}
                        />
                      </div>
                      {applicationProfiles && (
                        <div className="grid gap-3 lg:col-span-2">
                          <BaseSelect
                            name="selectedUser"
                            value={selectedApplicationProfile?.id}
                            onChange={handleSelectChange}
                            placeholder={t('application.profile.selectProfile')}
                          >
                            {' '}
                            {applicationProfiles.map((applicationProfile) => {
                              return (
                                <option
                                  key={applicationProfile.id}
                                  value={applicationProfile.id}
                                >
                                  {applicationProfile.title}
                                </option>
                              );
                            })}
                          </BaseSelect>
                        </div>
                      )}
                    </div>
                  </section>
                  <section className="grid gap-6 p-6 lg:p-10">
                    <BaseHeading type="h2" size="lg">
                      {t('application.heading.availability')}
                    </BaseHeading>
                    <div className="grid gap-6 xl:grid-cols-2">
                      <div>
                        <BaseSelect
                          label={t('application.availability.label')}
                          name="availability"
                          value={formData.availability}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="IMMEDIATELY">
                            {t('application.availability.options.IMMEDIATELY')}
                          </option>
                          <option value="NEGOTIABLE">
                            {t('application.availability.options.NEGOTIABLE')}
                          </option>
                        </BaseSelect>
                      </div>
                      {formData.availability === Availability.Negotiable && (
                        <div>
                          <BaseInput
                            label={t('application.availableFrom.label')}
                            name="availableFrom"
                            value={formData.availableFrom}
                            onChange={handleInputChange}
                            type="date"
                          />
                        </div>
                      )}
                      <div>
                        <BaseInput
                          label={t('application.availabilityWeek.label')}
                          placeholder={t(
                            'application.availabilityWeek.placeholder'
                          )}
                          name="availableHours"
                          value={formData.availableHours}
                          onChange={handleInputChange}
                          append="uur"
                          type="number"
                          error={formErrors['availableHours']}
                        />
                      </div>
                      <div>
                        <BaseSelect
                          label={t('rateType.label')}
                          placeholder={t('rateType.placeholder')}
                          name="rateType"
                          value={formData.rateType}
                          onChange={handleInputChange}
                          error={formErrors['rateType']}
                          required
                        >
                          {rateTypeOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value.toUpperCase()}
                            >
                              {t(
                                'rateType.options.' + option.value.toUpperCase()
                              )}
                            </option>
                          ))}
                        </BaseSelect>
                      </div>

                      {(formData.rateType === RateType.Hour ||
                        formData.rateType === RateType.Unit) && (
                        <div>
                          <label className="mb-2 block text-sm font-medium text-neutral-700">
                            {t('rate.label')}
                          </label>
                          <div className="grid grid-cols-2 items-start gap-3">
                            <BaseNumberInput
                              placeholder="75"
                              name="rateFrom"
                              value={formData.rateFrom ? formData.rateFrom : ''}
                              onChange={(value) =>
                                updateFormData('rateFrom', value)
                              }
                              prepend="Min"
                              error={formErrors['rateFrom']}
                            />
                            <BaseNumberInput
                              placeholder="95"
                              name="rateTo"
                              value={formData.rateTo ? formData.rateTo : ''}
                              onChange={(value) =>
                                updateFormData('rateTo', value)
                              }
                              prepend="Max"
                              error={formErrors['rateTo']}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
                <section className="grid gap-6 p-6 lg:p-10">
                  <BaseHeading type="h2" size="lg">
                    {t('application.heading.upload')}
                  </BaseHeading>

                  <MultiFileUpload
                    onFilesAdded={handleFilesAdded}
                    onFilesDeleted={handleFilesDeleted}
                    accept={acceptedFiles}
                    initialFiles={currentFiles as GraphqlFile[]}
                  />
                </section>
                <section className="grid gap-6 p-6 lg:p-10">
                  <header className="grid gap-1">
                    <BaseHeading type="h2" size="lg">
                      {t('application.heading.expertise')}
                    </BaseHeading>
                    <p className="text-sm text-neutral-600">
                      {t('application.expertise.description')}
                    </p>
                  </header>
                  <div>
                    <BaseTagInput
                      onTagsChange={handleExpertiseChange}
                      initialTags={parseTags(formData.expertises)}
                      placeholder={t('application.expertise.placeholder')}
                      allowComma
                    />
                  </div>
                </section>
                <section className="grid gap-6 p-6 lg:p-10">
                  <header className="grid gap-1">
                    <BaseHeading type="h2" size="lg">
                      {t('application.heading.personalQualities')}
                    </BaseHeading>
                    <p className="text-sm text-neutral-600">
                      {t('application.personalQualities.description')}
                    </p>
                  </header>
                  <div>
                    <BaseTagInput
                      onTagsChange={handlePersonalQualitiesChange}
                      initialTags={parseTags(formData.personalQualities)}
                      placeholder={t(
                        'application.personalQualities.placeholder'
                      )}
                      allowComma
                    />
                  </div>
                </section>
                <section className="grid gap-6 p-6 lg:p-10">
                  <BaseHeading type="h2" size="lg">
                    {t('application.heading.backgroundInfo')}
                  </BaseHeading>
                  <div>
                    <BaseTextarea
                      placeholder={t('application.backgroundInfo.placeholder')}
                      name="background"
                      value={formData.background}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </section>
              </form>
              <footer className="h-18 sticky bottom-0 z-10 flex items-center justify-between gap-3 border-t border-neutral-100 bg-white/80 pl-6 pr-6 backdrop-blur-sm lg:pl-10">
                <button
                  className="hidden h-10 items-center text-sm font-medium hover:underline sm:flex"
                  onClick={handleCancelClick}
                >
                  {t('application.actions.cancel')}
                </button>

                <div className="flex grow justify-end gap-3">
                  {assignmentApplicationId > 0 && (
                    <div className="grow sm:grow-0">
                      <BaseButton
                        theme="secondary"
                        size="md"
                        onClick={() =>
                          handleDeleteDraft(assignmentApplicationId)
                        }
                        square
                      >
                        <IconTrash />
                      </BaseButton>
                    </div>
                  )}
                  <BaseButton
                    theme="secondary"
                    size="md"
                    disabled={submitIsLoading}
                    onClick={() => saveAsDraft()}
                    loading={draftIsLoading}
                  >
                    <span className="sm:hidden">
                      {t('application.actions.saveAsDraftShort')}
                    </span>
                    <span className="hidden sm:block">
                      {t('application.actions.saveAsDraft')}
                    </span>
                  </BaseButton>
                  <BaseButton
                    theme="primary"
                    size="md"
                    disabled={draftIsLoading}
                    onClick={() => submitApplication()}
                    loading={submitIsLoading}
                  >
                    <span>{t('application.actions.send')}</span>
                  </BaseButton>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* <Modal
        isOpen={privacyModalIsOpen}
        onClose={() => setPrivacyModalIsOpen(false)}
        size="lg"
        title={t('application.privacyModal.title')}
        footer={
          <>
            <BaseButton
              onClick={() => setPrivacyModalIsOpen(false)}
              theme="secondary"
              size="md"
            >
              {t('application.actions.cancel')}
            </BaseButton>

            <BaseButton onClick={submitApplication} size="md">
              {t('application.actions.send')}
            </BaseButton>
          </>
        }
      >
        <div className="grid gap-6">
          <p>{t('application.privacyModal.description')}</p>
          <div className="grid gap-2">
            <p className="font-medium text-neutral-900">
              {t('application.privacyModal.privacyPartnerList')}
            </p>
            <div className="grid gap-1">
              <BaseRadio
                label={t('application.privacyModal.yes')}
                name="privacyPartnerList"
                checked={formData.privacyPartnerList === true}
                onChange={() => handleRadioChange('privacyPartnerList', true)}
              />
              <BaseRadio
                label={t('application.privacyModal.no')}
                name="privacyPartnerList"
                checked={formData.privacyPartnerList === false}
                onChange={() => handleRadioChange('privacyPartnerList', false)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <p className="font-medium text-neutral-900">
              {t('application.privacyModal.privacyCompany')}
            </p>
            <div className="grid gap-1">
              <BaseRadio
                label={t('application.privacyModal.yes')}
                name="privacyCompany"
                checked={formData.privacyCompany === true}
                onChange={() => handleRadioChange('privacyCompany', true)}
              />
              <BaseRadio
                label={t('application.privacyModal.no')}
                name="privacyCompany"
                checked={formData.privacyCompany === false}
                onChange={() => handleRadioChange('privacyCompany', false)}
              />
            </div>
          </div>
        </div>
      </Modal> */}

      <Modal
        isOpen={confirmModalIsOpen}
        onClose={() => {
          setConfirmModalIsOpen(false);
          onApplySubmit();
        }}
        size="md"
      >
        <div className="flex justify-center">
          <i className="bg-success-50 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="bg-success-100 flex h-14 w-14 items-center justify-center rounded-full">
              <IconCheckmarkMd className="text-success-500 h-10 w-10" />
            </span>
          </i>
        </div>
        <div className="mb-8 grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('application.confirmModal.title')}
          </BaseHeading>
          <p className="text-neutral-500">
            {t('application.confirmModal.description')}
          </p>
        </div>
        <div className="grid gap-4">
          <BaseButton href="/opdracht-vinden/zoeken" wide size="md">
            {t('application.confirmModal.search')}
          </BaseButton>
          <div className="text-center">
            <Link
              href="/opdracht-vinden/mijn-reacties"
              className="font-medium text-neutral-900 hover:underline"
            >
              {t('application.confirmModal.toApplications')}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ApplicationModal;
