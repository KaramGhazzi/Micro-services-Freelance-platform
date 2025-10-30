'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import pMap from 'p-map';
import { getApplicationProfileCreateSchema } from '@package/types/dist/yup/core/application-profile';
import { ValidationError } from 'yup';
import MultiFileUpload from '../../opdracht/[opdrachtId]/_components/MultiFileUpload';
import BaseButton from '@/app/_components/BaseButton';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';

import {
  Availability,
  ApplicationProfile,
  ApplicationProfileUpdateInput,
  File as GraphqlFile,
  RateType,
  ApplicationProfileCreateInput,
} from '@/graphql/types';
import BaseNumberInput from '@/app/_components/BaseNumberInput';
import BaseSelect from '@/app/_components/BaseSelect';
import rateTypeOptions from '@/app/(dashboard)/opdracht-plaatsen/nieuwe-opdracht/_data/rateTypeOptions';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseInput from '@/app/_components/BaseInput';
import BaseTagInput from '@/app/_components/BaseTagInput';
import BaseTextarea from '@/app/_components/BaseTextarea';
import acceptedFiles from '@/app/(dashboard)/_data/acceptedFiles';
import { useCreateApplicationProfileMutation } from '@/graphql/mutations/application-profiles/createApplicationProfile.generated';
import { useCreateFileForApplicationProfileMutation } from '@/graphql/mutations/application-profiles/createFileForApplicationProfile.generated';
import useFileUpload from '@/app/_libs/useFileUpload';
import useFileDelete from '@/app/_libs/useFileDelete';
import { useUpdateApplicationProfileMutation } from '@/graphql/mutations/application-profiles/updateApplicationProfile.generated';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import { encodeTags, parseTags } from '@/app/_libs/Tags';

export default function ApplicationProfileFormPage({
  applicationProfile,
}: {
  applicationProfile?: ApplicationProfile;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations('assignment');
  const [createMutation] = useCreateApplicationProfileMutation();
  const [updateMutation] = useUpdateApplicationProfileMutation();
  const { uploadFile } = useFileUpload();
  const { deleteFile } = useFileDelete();
  const [saveFileMutation] = useCreateFileForApplicationProfileMutation();
  const validationSchema = getApplicationProfileCreateSchema();

  let initialFormData: Partial<ApplicationProfile> = {
    title: '',
    availability: Availability.Immediately,
    availableHours: undefined,
    availableFrom: undefined,
    rateType: RateType.Hour,
    rateFrom: undefined,
    rateTo: undefined,
    expertises: null,
    personalQualities: null,
    background: '',
  };

  if (applicationProfile) {
    for (const key in initialFormData) {
      if (applicationProfile.hasOwnProperty(key)) {
        const typedKey = key as keyof ApplicationProfile;
        initialFormData[typedKey] = applicationProfile[typedKey];
      }
    }
  }

  const [formData, setFormData] =
    useState<Partial<ApplicationProfile>>(initialFormData);

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(initialFormData) as {
      [index: string]: string | undefined;
    }
  );

  const [files, setFiles] = useState<File[]>([]);
  const [initialFiles, setInitialFiles] = useState<GraphqlFile[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<GraphqlFile[]>([]);

  useEffect(() => {
    let documents: GraphqlFile[] = [];
    if (
      applicationProfile?.documents &&
      applicationProfile.documents?.length > 0
    ) {
      documents = applicationProfile.documents.map(
        (document) => document.file
      ) as GraphqlFile[];
    }
    setInitialFiles(documents);
  }, [applicationProfile]);

  useEffect(() => {
    if (validationErrors?.length && formRef.current) {
      formRef.current.reportValidity();

      const errors: { [index: string]: string | undefined } = {};
      validationErrors.forEach((error) => {
        if (error.path && Object.keys(initialFormData).includes(error.path)) {
          errors[error.path] = error.message;
        }
      });
      setFormErrors(errors);
    }
  }, [validationErrors]);

  const handleInputChange = <T extends keyof ApplicationProfile>(
    name: T,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    updateFormData(name, value as ApplicationProfile[T]);
  };

  const handleExpertiseChange = (updatedTags: string[]) => {
    setFormData((prevFormData: Partial<ApplicationProfile>) => ({
      ...prevFormData,
      expertises: encodeTags(updatedTags),
    }));
  };

  const handlePersonalQualitiesChange = (updatedTags: string[]) => {
    setFormData((prevFormData: Partial<ApplicationProfile>) => ({
      ...prevFormData,
      personalQualities: encodeTags(updatedTags),
    }));
  };

  const updateFormData = <T extends keyof ApplicationProfile>(
    key: T,
    value: ApplicationProfile[T]
  ) => {
    setFormData((prevFormData: Partial<ApplicationProfile>) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleFilesAdded = (files: File[]) => {
    setFiles(files);
  };

  const handleFilesDeleted = (files: GraphqlFile[]) => {
    setDeletedFiles(files);
  };

  const uploadFiles = async (uuid: string) => {
    await pMap(
      files,
      async (file) => {
        const fileData = await uploadFile('uploads', file);

        await saveFileMutation({
          variables: {
            data: {
              name: file.name,
              blobName: fileData.blobName,
              size: file.size,
            },
            applicationProfileUUID: uuid,
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

  const saveApplicationProfile = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      let savedApplicationProfile: { uuid: string } | undefined;

      if (applicationProfile?.id) {
        const response = await updateMutation({
          variables: {
            data: formData as ApplicationProfileUpdateInput,
            where: { id: Number(applicationProfile.id) },
          },
        });
        if (!response?.data) {
          throw new Error('Cannot save profile');
        }
        savedApplicationProfile = response.data.updateApplicationProfile;
      } else {
        const response = await createMutation({
          variables: {
            data: {
              ...formData,
            } as ApplicationProfileCreateInput,
          },
        });
        if (!response?.data) {
          throw new Error('Cannot create profile');
        }
        savedApplicationProfile = response.data.createApplicationProfile;
      }

      if (savedApplicationProfile.uuid) {
        await Promise.all([
          uploadFiles(savedApplicationProfile.uuid),
          deleteFiles(),
        ]);
      }

      if (savedApplicationProfile) {
        //upload files, then push
        router.push(
          '/opdracht-vinden/mijn-reactieprofielen?toaster=savedApplicationProfileSuccessfully'
        );
      }
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        setValidationErrors(e.inner);
      } else {
        alert('Er is iets misgegaan, probeer het later opnieuw');
      }
    }
  };

  return (
    <form ref={formRef} className="flex grow flex-col">
      <BaseToolbarSub
        title={t(
          applicationProfile?.id
            ? 'applicationProfiles.editApplicationProfile'
            : 'applicationProfiles.newApplicationProfile'
        )}
        overtitle={t('applicationProfiles.myApplicationProfiles')}
      >
        <div>
          <BaseButton
            theme="secondary"
            wide
            href="/opdracht-vinden/mijn-reactieprofielen"
          >
            {t('toolbar.cancel')}
          </BaseButton>
        </div>
        <div className="grow">
          <BaseButton
            theme="primary"
            onClick={saveApplicationProfile}
            wide={true}
          >
            {t('applicationProfiles.saveApplicationProfile')}
          </BaseButton>
        </div>
      </BaseToolbarSub>

      <section className="flex-grow xl:flex">
        <div className="flex-grow divide-y-4 divide-neutral-50 border-neutral-100 bg-white xl:border-r">
          <section className="grid gap-6 p-5 lg:p-10">
            <div className="grid max-w-4xl gap-6">
              <BaseInput
                label={t('applicationProfiles.title')}
                placeholder={t('applicationProfiles.titlePlaceholder')}
                name="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e)}
                type="text"
                error={formErrors['title']}
              />
            </div>
          </section>
          <section className="p-5 lg:p-10">
            <div className="grid max-w-4xl gap-6">
              <BaseHeading type="h2" size="lg">
                {t('application.heading.availability')}
              </BaseHeading>
              <div className="grid gap-6 xl:grid-cols-2">
                <div>
                  <BaseSelect
                    label={t('application.availability.label')}
                    name="availability"
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e)}
                    required
                  >
                    <option value={Availability.Immediately}>
                      {t('application.availability.options.IMMEDIATELY')}
                    </option>
                    <option value={Availability.Negotiable}>
                      {t('application.availability.options.NEGOTIABLE')}
                    </option>
                  </BaseSelect>
                </div>
                {formData.availability === Availability.Negotiable && (
                  <div>
                    <BaseInput
                      label={t('application.availableFrom.label')}
                      name="availableFrom"
                      value={formData.availableFrom ?? ''}
                      onChange={(e) => handleInputChange('availableFrom', e)}
                      type="date"
                    />
                  </div>
                )}
                <div>
                  <BaseInput
                    label={t('application.availabilityWeek.label')}
                    placeholder={t('application.availabilityWeek.placeholder')}
                    name="availableHours"
                    value={formData.availableHours}
                    onChange={(e) =>
                      updateFormData('availableHours', parseInt(e.target.value))
                    }
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
                    onChange={(e) => handleInputChange('rateType', e)}
                    error={formErrors['rateType']}
                    required
                  >
                    {rateTypeOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value.toUpperCase()}
                      >
                        {t('rateType.options.' + option.value.toUpperCase())}
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
                        onChange={(value) => updateFormData('rateFrom', value)}
                        prepend="Min"
                        error={formErrors['rateFrom']}
                      />
                      <BaseNumberInput
                        placeholder="95"
                        name="rateTo"
                        value={formData.rateTo ? formData.rateTo : ''}
                        onChange={(value) => updateFormData('rateTo', value)}
                        prepend="Max"
                        error={formErrors['rateTo']}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="grid gap-6 p-5 lg:p-10">
            <div className="grid max-w-4xl gap-6">
              <BaseHeading type="h2" size="lg">
                {t('application.heading.upload')}
              </BaseHeading>

              <MultiFileUpload
                onFilesAdded={handleFilesAdded}
                onFilesDeleted={handleFilesDeleted}
                accept={acceptedFiles}
                initialFiles={initialFiles}
              />
            </div>
          </section>

          <section className="grid gap-6 p-5 lg:p-10">
            <div className="grid max-w-4xl gap-6">
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
            </div>
          </section>

          <section className="grid gap-6 p-5 lg:p-10">
            <div className="grid max-w-4xl gap-6">
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
                  placeholder={t('application.personalQualities.placeholder')}
                  allowComma
                />
              </div>
            </div>
          </section>

          <section className="grid gap-6 p-5 lg:p-10">
            <div className="grid max-w-4xl gap-6">
              <BaseHeading type="h2" size="lg">
                {t('application.heading.backgroundInfo')}
              </BaseHeading>
              <div>
                <BaseTextarea
                  placeholder={t('application.backgroundInfo.placeholder')}
                  name="background"
                  value={formData.background}
                  onChange={(e) => handleInputChange('background', e)}
                  required
                  error={formErrors['background']}
                />
              </div>
            </div>
          </section>
        </div>
        <aside className="w-full max-w-sm bg-neutral-50 2xl:max-w-md"></aside>
      </section>
    </form>
  );
}
