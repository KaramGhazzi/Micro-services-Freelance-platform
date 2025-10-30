'use client';
import { companyReferenceSchema } from '@/../../packages/types/dist/yup/pwa/company-reference.schema';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { ValidationError } from 'yup';
import SingleFileUpload from '../SingleFileUpload';
import BaseButton from '../BaseButton';
import Modal from '../BaseDialog';
import BaseHeading from '../BaseHeading';
import BaseInput from '../BaseInput';
import BaseTextarea from '../BaseTextarea';
import BaseUserAvatar from '../BaseUserAvatar';
import IconCheckmarkMd from '../icons/IconCheckmarkMd';
import IconPencil from '../icons/IconPencil';
import IconPlusCircle from '../icons/IconPlusCircle';
import IconTrash from '../icons/IconTrash';
import {
  CurrentCompany,
  CurrentCompanyReference,
  CurrentCompanyReferences,
} from '@/app/(dashboard)/_context/CurrentUserContext';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import useFileUpload from '@/app/_libs/useFileUpload';
import { useCreateOrUpdateCompanyReferenceMutation } from '@/graphql/mutations/company-references/createOrUpdateCompanyReference.generated';
import { useDeleteCompanyReferenceMutation } from '@/graphql/mutations/company-references/deleteCompanyReference.generated';
import {
  CompanyReferenceUpdateInput,
  CompanyReferenceCreateInput,
} from '@/graphql/types';

interface Props {
  currentCompany: CurrentCompany;
  isEditable: boolean;
}

const initialCompanyReferenceFormState = {
  company: {},
  refereeCompanyName: '',
  refereeJob: '',
  refereeFullName: '',
  content: '',
};

const CompanyReferencesList = ({ currentCompany, isEditable }: Props) => {
  const t = useTranslations();
  const global = useTranslations('global');

  const { uploadFile } = useFileUpload();
  const validationCompanyReferenceSchema = companyReferenceSchema();
  const [referenceToUpdate, setReferenceToUpdate] =
    useState<CurrentCompanyReference>();
  const [companyReferences, setCompanyReferences] =
    useState<CurrentCompanyReferences>([]);
  const [isSavingCompanyReference, setIsSavingCompanyReference] =
    useState(false);
  const [referenceFormModalIsOpen, setReferenceFormModalIsOpen] =
    useState(false);
  const [companyReferenceFormData, setCompanyReferenceFormData] =
    useState<CompanyReferenceUpdateInput>(initialCompanyReferenceFormState);
  const [referenceImageToSave, setReferenceImageToSave] =
    useState<globalThis.File>();

  const [createOrUpdateCompanyReferenceMutation] =
    useCreateOrUpdateCompanyReferenceMutation();
  const [deleteCompanyReference] = useDeleteCompanyReferenceMutation();
  const [deleteReferenceModalActive, setDeleteReferenceModalActive] =
    useState(false);
  const [
    deleteReferenceConfirmModalActive,
    setDeleteReferenceConfirmModalActive,
  ] = useState(false);
  const [referenceIdToBeDeleted, setReferenceIdToBeDeleted] =
    useState<number>(0);

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(companyReferenceFormData) as {
      [index: string]: string | undefined;
    }
  );

  useEffect(() => {
    if (!currentCompany) {
      return;
    }
    if (currentCompany.companyReferences) {
      setCompanyReferences(currentCompany.companyReferences);
    }
  }, [currentCompany]);

  const updateReferenceFormData = <T extends keyof CompanyReferenceCreateInput>(
    key: T,
    value: CompanyReferenceUpdateInput[T]
  ) => {
    setCompanyReferenceFormData(
      (prevFormData: CompanyReferenceUpdateInput) => ({
        ...prevFormData,
        [key]: value,
      })
    );
  };

  const deleteReference = async () => {
    setDeleteReferenceModalActive(false);
    try {
      const { data } = await deleteCompanyReference({
        variables: {
          companyReferenceId: Number(referenceIdToBeDeleted),
        },
      });

      if (data) {
        setDeleteReferenceConfirmModalActive(true);
        const updatedReferences = companyReferences.filter(
          (reference) => Number(reference.id) !== Number(referenceIdToBeDeleted)
        );
        setCompanyReferences(updatedReferences);
      }
    } catch (error) {
      console.log(error);
    }

    return false;
  };

  const handleReferenceFormSubmit = async () => {
    setIsSavingCompanyReference(true);

    try {
      await validationCompanyReferenceSchema.validate(
        companyReferenceFormData,
        { abortEarly: false }
      );

      let fileData;
      if (referenceImageToSave) {
        fileData = await uploadFile('uploads', referenceImageToSave);
      }

      const variables = {
        data: {
          content: companyReferenceFormData?.content ?? '',
          refereeCompanyName:
            companyReferenceFormData?.refereeCompanyName ?? '',
          refereeFullName: companyReferenceFormData?.refereeFullName ?? '',
          refereeJob: companyReferenceFormData?.refereeJob ?? '',
        },
        ...(fileData &&
          referenceImageToSave && {
            fileInput: {
              blobName: fileData.blobName,
              container: fileData.containerName,
              name: referenceImageToSave.name,
              size: referenceImageToSave.size,
            },
          }),
        companyReferenceId: referenceToUpdate
          ? Number(referenceToUpdate.id)
          : -1,
      };

      const response = await createOrUpdateCompanyReferenceMutation({
        variables,
      });

      if (response?.data) {
        setIsSavingCompanyReference(false);
        setReferenceFormModalIsOpen(false);
        updateCompanyReferencesInState(
          response.data.createOrUpdateCompanyReference,
          fileData
        );
        resetReferenceForm();
      }
    } catch (e: any) {
      setIsSavingCompanyReference(false);
      if (e instanceof ValidationError) {
        const errors: { [index: string]: string | undefined } = {};
        e.inner.forEach((error) => {
          if (
            error.path &&
            Object.keys(companyReferenceFormData).includes(error.path)
          ) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setFormErrors({ about: global('errors.unknownError') });
      }
    }
  };

  const updateCompanyReferencesInState = (
    companyReferenceResponse: CurrentCompanyReference,
    fileData:
      | {
          containerName: string;
          blobName: string;
        }
      | undefined
  ) => {
    let isUpdatedItem = companyReferences.find(
      (reference) => companyReferenceResponse.id === reference.id
    );
    if (!isUpdatedItem) {
      const newItem = {
        ...companyReferenceResponse,
        referenceImageFile: {
          blobName: fileData?.blobName,
          container: fileData?.containerName,
        },
      } as CurrentCompanyReference;
      setCompanyReferences((prevCompanyReferences) => {
        return [...prevCompanyReferences, newItem];
      });
    } else {
      if (fileData) {
        isUpdatedItem = {
          ...isUpdatedItem,
          referenceImageFile: {
            blobName: fileData?.blobName,
            container: fileData?.containerName,
          },
        };
      }
      const updatedSearches = companyReferences.map((reference) =>
        reference.id === isUpdatedItem?.id ? isUpdatedItem : reference
      );
      setCompanyReferences(updatedSearches);
    }
  };
  const handleUpdateReference = (reference: CurrentCompanyReference) => {
    setReferenceToUpdate(reference);
    setCompanyReferenceFormData(prepareUpdateFormData(reference));
    setReferenceFormModalIsOpen(true);
  };

  const prepareUpdateFormData = (reference: CurrentCompanyReference) => {
    return {
      company: {},
      content: reference.content,
      refereeCompanyName: reference.refereeCompanyName,
      refereeJob: reference.refereeJob,
      refereeFullName: reference.refereeFullName,
    };
  };

  const handleDeleteReference = (referenceId: number) => {
    setReferenceIdToBeDeleted(referenceId);
    setDeleteReferenceModalActive(true);
  };

  const resetReferenceForm = () => {
    setCompanyReferenceFormData(initialCompanyReferenceFormState);
    if (referenceImageToSave) {
      setReferenceImageToSave(undefined);
    }
    if (referenceToUpdate) {
      setReferenceToUpdate(undefined);
    }
  };

  return (
    <>
      <Modal
        isOpen={deleteReferenceModalActive}
        onClose={() => setDeleteReferenceModalActive(false)}
        size="md"
        title={t('company.reference.modal.delete.title')}
        footer={
          <>
            <BaseButton
              onClick={() => {
                setDeleteReferenceModalActive(false);
              }}
              theme="secondary"
              size="md"
            >
              {global('cancel')}
            </BaseButton>

            <BaseButton onClick={deleteReference} size="md">
              {t('company.reference.modal.delete.action')}
            </BaseButton>
          </>
        }
      >
        <p className="text-neutral-500">
          {t('company.reference.modal.delete.description')}
        </p>
      </Modal>

      <Modal
        isOpen={deleteReferenceConfirmModalActive}
        onClose={() => setDeleteReferenceConfirmModalActive(false)}
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
            {t('company.reference.modal.delete.successTitle')}
          </BaseHeading>
          <p className="text-center font-medium text-neutral-700">
            {t('company.reference.modal.delete.successDescription')}
          </p>
        </div>

        <BaseButton
          onClick={() => setDeleteReferenceConfirmModalActive(false)}
          theme="primary"
          size="lg"
          wide
        >
          {t('company.reference.modal.delete.back')}
        </BaseButton>
      </Modal>
      <Modal
        isOpen={referenceFormModalIsOpen}
        onClose={() => {
          setReferenceFormModalIsOpen(false);
        }}
        title={
          referenceToUpdate
            ? t('company.reference.modal.updateTitle')
            : t('company.reference.modal.createTitle')
        }
        footer={
          <>
            <BaseButton
              onClick={() => {
                setReferenceFormModalIsOpen(false);
                resetReferenceForm();
              }}
              theme="secondary"
              size="md"
            >
              {global('cancel')}
            </BaseButton>
            <BaseButton
              theme="primary"
              size="md"
              onClick={handleReferenceFormSubmit}
              loading={isSavingCompanyReference}
            >
              {global('save')}
            </BaseButton>
          </>
        }
      >
        <div className="grid gap-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="grid ">
              <SingleFileUpload
                label={t('company.reference.modal.photo.label')}
                button={t('company.reference.modal.photo.upload')}
                onUploadFile={(fileToUpload) =>
                  setReferenceImageToSave(fileToUpload)
                }
                onDeleteFile={() => setReferenceImageToSave(undefined)}
                initialImageUrl={
                  referenceToUpdate?.referenceImageFile
                    ? getImageUrl(
                        referenceToUpdate?.referenceImageFile.container,
                        referenceToUpdate?.referenceImageFile.blobName
                      )
                    : ''
                }
              />
            </div>

            <div className="col-span-2 grid gap-6">
              <BaseInput
                label={t('company.reference.modal.refereeFullName.label')}
                placeholder={t(
                  'company.reference.modal.refereeFullName.placeholder'
                )}
                name="refereeFullName"
                error={formErrors['refereeFullName']}
                value={companyReferenceFormData?.refereeFullName}
                onChange={(e) =>
                  updateReferenceFormData('refereeFullName', e.target.value)
                }
                type="text"
              />
              <BaseInput
                label={t('company.reference.modal.refereeJob.label')}
                placeholder={t(
                  'company.reference.modal.refereeJob.placeholder'
                )}
                name="refereeJob"
                error={formErrors['refereeJob']}
                value={companyReferenceFormData?.refereeJob}
                onChange={(e) =>
                  updateReferenceFormData('refereeJob', e.target.value)
                }
                type="text"
              />
            </div>
          </div>
          <BaseInput
            label={t('company.reference.modal.refereeCompanyName.label')}
            placeholder={t(
              'company.reference.modal.refereeCompanyName.placeholder'
            )}
            name="refereeCompanyName"
            error={formErrors['refereeCompanyName']}
            value={companyReferenceFormData?.refereeCompanyName}
            onChange={(e) =>
              updateReferenceFormData('refereeCompanyName', e.target.value)
            }
            type="text"
          />
          <BaseTextarea
            label={t('company.reference.modal.content.label')}
            placeholder={t('company.reference.modal.content.placeholder')}
            name="content"
            error={formErrors['content']}
            value={companyReferenceFormData?.content}
            onChange={(e) => updateReferenceFormData('content', e.target.value)}
            size="sm"
            minLength={20}
            maxLength={250}
          />
        </div>
      </Modal>

      <div className="flex justify-between">
        <BaseHeading type="h3" size="lg">
          {t('company.reference.title')}
        </BaseHeading>
        <BaseButton
          onClick={() => setReferenceFormModalIsOpen(true)}
          theme="secondary"
          size="md"
        >
          <IconPlusCircle />
          {t('company.reference.addNew')}
        </BaseButton>
      </div>

      {companyReferences?.map((reference) => {
        return (
          <div key={`reference-${reference.id}`} className="flex gap-4">
            <BaseUserAvatar
              url={
                reference.referenceImageFile
                  ? getImageUrl(
                      reference.referenceImageFile.container,
                      reference.referenceImageFile.blobName
                    )
                  : null
              }
              size="md"
            />
            <div className="flex-auto rounded-xl bg-neutral-50 p-6">
              <p className="mb-4 text-sm text-neutral-700">
                {reference.content}
              </p>
              <div className="flex items-end justify-between">
                <div className="flex-auto">
                  <strong className="flex-auto text-sm font-semibold">
                    {reference.refereeFullName}
                  </strong>
                  <p className="text-sm text-neutral-700">
                    {`${reference.refereeJob} bij ${reference.refereeCompanyName}`}
                  </p>
                </div>
                {isEditable && (
                  <div className="flex gap-4">
                    <div className="mb-0">
                      <BaseButton
                        theme="tertiary"
                        size="xs"
                        square
                        onClick={() => handleUpdateReference(reference)}
                      >
                        <IconPencil />
                      </BaseButton>
                    </div>
                    <BaseButton
                      onClick={() =>
                        handleDeleteReference(Number(reference.id))
                      }
                      theme="tertiary"
                      size="xs"
                      square
                    >
                      <IconTrash />
                    </BaseButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CompanyReferencesList;
