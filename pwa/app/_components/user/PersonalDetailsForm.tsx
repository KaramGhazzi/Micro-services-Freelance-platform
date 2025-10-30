'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { ValidationError } from 'yup';
import { accountSettingsSchema } from '@package/types/dist/yup/pwa/account-settings.schema';
import { getImageUrl } from '../../(dashboard)/_utils/getImageUrl';
import IconCheckmarkSm from '@/app/_components/icons/IconCheckmarkSm';
import { useUserUpdateMutation } from '@/graphql/mutations/users/userUpdate.generated';
import BaseInput from '@/app/_components/BaseInput';
import BaseButton from '@/app/_components/BaseButton';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import SingleFileUpload from '@/app/_components/SingleFileUpload';
import useFileUpload from '@/app/_libs/useFileUpload';
import { File } from '@/graphql/types';
import { CurrentUser } from '@/app/(dashboard)/_context/CurrentUserContext';
import ChangeEmailModal from '@/app/_components/user/ChangeEmailModal';

interface FormData {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: string | null;
  phoneNumber?: string | null;
  linkedInUrl?: string | null;
  existingUuid?: string | null;
  profilePhoto?: File | null;
}

interface ProfilePhotoFileData {
  file?: globalThis.File;
  temporaryUrl: string;
}

type PersonalDetailsFormProps = {
  user: CurrentUser | undefined;
  isAdmin?: boolean;
};

export default function PersonalDetailsForm({
  user,
  isAdmin,
}: Readonly<PersonalDetailsFormProps>) {
  const validationSchema = accountSettingsSchema();
  const [update, { loading }] = useUserUpdateMutation();
  const [changed, setChanged] = useState(false);
  const [success, setSuccess] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const [emailChange, setEmailChange] = useState<string | undefined | null>();
  const { uploadFile, linkFile } = useFileUpload();
  const t = useTranslations();
  const [profilePhotoImageFileUrl, setProfilePhotoImageFileUrl] = useState<
    string | undefined
  >();
  const [initialImage, setInitialImage] = useState<ProfilePhotoFileData>();
  const [changeEmailModalActive, setChangeEmailModalActive] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    linkedInUrl: '',
  });

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData) as {
      [index: string]: string | undefined;
    }
  );

  useEffect(() => {
    if (user) {
      const {
        email,
        emailChange,
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        linkedInUrl,
        profilePhoto,
      } = user;

      setEmailChange(emailChange ?? '');

      let birthdate = dateOfBirth
        ? new Date(dateOfBirth).toISOString().slice(0, 10)
        : null;
      setFormData({
        email,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth: birthdate,
        linkedInUrl,
      });

      if (profilePhoto) {
        const profilePhotoImageFile = getImageUrl(
          profilePhoto?.container,
          profilePhoto?.blobName
        );
        if (profilePhotoImageFile) {
          setProfilePhotoImageFileUrl(profilePhotoImageFile);
        }
      }
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSuccess(false);
    setChanged(formData[name as keyof FormData] !== value);

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) {
      return;
    }

    setFormErrors({});
    setUnknownError(false);

    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString().slice(0, 10)
          : null,
        phoneNumber: formData.phoneNumber,
        linkedInUrl: formData.linkedInUrl,
      };

      const { email: _, ...validatedData } = await validationSchema.validate(
        { ...data, email: formData.email },
        { abortEarly: false }
      );

      update({
        variables: {
          id: Number(user?.id),
          data: validatedData,
        },
        onCompleted: ({ userUpdate }) => {
          const {
            email,
            firstName,
            lastName,
            dateOfBirth,
            phoneNumber,
            linkedInUrl,
          } = userUpdate;

          setFormData({
            email,
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth: dateOfBirth
              ? new Date(dateOfBirth).toISOString().slice(0, 10)
              : null,
            linkedInUrl,
          });
          setSuccess(true);
          setChanged(false);
        },
      });

      await updateProfilePhotoImage(initialImage?.file as globalThis.File);
    } catch (e: any) {
      if (e instanceof ValidationError) {
        const errors: { [index: string]: string | undefined } = {};
        e.inner.forEach((error) => {
          if (error.path && Object.keys(formData).includes(error.path)) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setUnknownError(true);
      }
    }
  }

  const handleProfilePhotoUpload = (file: globalThis.File) => {
    const temporaryUrl = URL.createObjectURL(file);
    setProfilePhotoImageFileUrl(temporaryUrl);

    setInitialImage({
      file,
      temporaryUrl,
    });

    setChanged(true);
  };

  const updateProfilePhotoImage = async (file: globalThis.File) => {
    if (file) await saveImage(file);
  };

  async function saveImage(file: globalThis.File) {
    const fileData = await uploadFile('uploads', file);

    try {
      await linkFile({
        name: file.name,
        blobName: fileData.blobName,
        container: fileData.containerName,
        uuid: formData.existingUuid,
      });
    } catch (e) {
      console.log('FileUpload error:', e);
    }

    const imageUrl = getImageUrl(fileData.containerName, fileData.blobName);
    setProfilePhotoImageFileUrl(imageUrl);
  }

  const toggleChangeEmailBool = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setChangeEmailModalActive(true);
  };

  const changeEmailModalClosed = (newEmailAddress?: string | null) => {
    if (newEmailAddress) {
      setEmailChange(newEmailAddress);
    }

    setChangeEmailModalActive(false);
  };

  const renderChangeEmailAddress = () => {
    return (
      <div className="mt-2">
        <a
          href={''}
          onClick={(e) => toggleChangeEmailBool(e)}
          className="text-primary-500 font-medium underline"
        >
          {emailChange
            ? t('global.changeEmailInProgressButtonText', {
                email: emailChange,
              })
            : t('global.changeEmailButtonText')}
        </a>

        <ChangeEmailModal
          isOpen={changeEmailModalActive}
          onClose={changeEmailModalClosed}
          user={user}
        />
      </div>
    );
  };

  return (
    <form
      className="flex-grow divide-y-4 divide-neutral-50 border-neutral-100 bg-white xl:border-r"
      onSubmit={handleSubmit}
    >
      <div className="divide-y divide-gray-200 p-10">
        <div className="grid max-w-4xl gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
          <div className="col-span-1 grid h-fit gap-1">
            <div>
              <h1 className="font-semibold text-neutral-900">
                {t('account.personalDetails')}
              </h1>
            </div>
            <div>
              <p className="text-xs leading-5 text-neutral-500">
                {t('account.personalDetailsText')}
              </p>
            </div>
          </div>

          <div className="col-span-2 grid gap-6 lg:grid lg:grid-cols-2 lg:gap-6">
            <div className="col-span-2 flex items-center gap-6">
              <div className="flex flex-col gap-2">
                <SingleFileUpload
                  button={t('profile.photo.button')}
                  footnote={t('profile.photo.footnote')}
                  initialImageUrl={profilePhotoImageFileUrl}
                  onUploadFile={handleProfilePhotoUpload}
                  onDeleteFile={() => console.log('delete pressed')}
                />
              </div>
            </div>

            <div className="text-sm font-medium text-neutral-700">
              <BaseInput
                label={t('account.firstName.label')}
                placeholder={t('account.firstName.placeholder')}
                name="firstName"
                required
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                error={formErrors['firstName']}
              />
            </div>

            <div className="text-sm font-medium text-neutral-700">
              <BaseInput
                label={t('account.lastName.label')}
                placeholder={t('account.lastName.placeholder')}
                name="lastName"
                required
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                error={formErrors['lastName']}
              />
            </div>

            <div className="text-sm font-medium text-neutral-700">
              <BaseInput
                label={t('account.email.label')}
                placeholder={t('account.email.placeholder')}
                name="email"
                required
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors['email']}
                disabled
                tooltip={!isAdmin ? t('account.emailToolTip') : undefined}
              />

              {isAdmin && renderChangeEmailAddress()}
            </div>

            <div className="text-sm font-medium text-neutral-700">
              <BaseInput
                label={t('account.phone.label')}
                placeholder={t('account.phone.placeholder')}
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
                error={formErrors['phoneNumber']}
              />
            </div>

            <div className="text-sm font-medium text-neutral-700">
              <BaseInput
                label={t('account.dateOfBirth')}
                name="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                error={formErrors['dateOfBirth']}
              />
            </div>

            <div className="text-sm font-medium text-neutral-700">
              <BaseInput
                label={t('account.linkedIn.label')}
                name="linkedInUrl"
                type="text"
                placeholder={t('account.linkedIn.placeholder')}
                value={formData.linkedInUrl}
                onChange={handleInputChange}
                error={formErrors['linkedInUrl']}
              />
            </div>

            <div className="col-span-2 flex items-center pt-4">
              <div className="flex justify-center text-sm font-medium text-neutral-700 lg:block">
                <BaseButton
                  disabled={!changed}
                  loading={loading}
                  type="submit"
                  size="md"
                >
                  {t('global.saveChanges')}
                </BaseButton>
              </div>
              {success && (
                <div className="text-success-400 flex flex-nowrap items-center px-4 text-sm">
                  <IconCheckmarkSm />
                  <p className="text-xs">{t('account.successMessage')}</p>
                </div>
              )}
              {unknownError && (
                <div className="flex flex-nowrap items-center px-4 text-sm text-red-500">
                  <p className="text-error-600 text-xs font-medium">
                    {t('account.errorMessage')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
