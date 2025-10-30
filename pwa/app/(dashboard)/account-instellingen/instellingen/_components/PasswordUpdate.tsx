'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { updatePasswordSchema } from '@package/types/dist/yup/auth/update-password.schema';
import { ValidationError } from 'yup';
import SuccessfulMessage from '../../../../_components/SuccessfulMessage';
import UnknownErrorMessage from '../../../../_components/UnknownErrorMessage';
import BaseButton from '@/app/_components/BaseButton';
import BaseInput from '@/app/_components/BaseInput';
import { useUpdatePasswordMutation } from '@/graphql/mutations/auth/updatePassword.generated';
import { useAuth } from '@/app/_hooks/useAuth';

interface FormData {
  currentPassword?: string | null;
  newPassword?: string | null;
  newPasswordRepeat?: string | null;
  email?: string | null;
}

type FormChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

const copyObjectWithNullValues = (originalObject: any) => {
  return Object.keys(originalObject).reduce(
    (acc: { [index: string]: undefined }, key) => {
      acc[key] = undefined;
      return acc;
    },
    {}
  );
};

export default function PasswordUpdate() {
  const t = useTranslations('account');
  const { currentUser } = useAuth();
  const [changed, setChanged] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [passwordFormData, setPasswordFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  });

  const [update, { loading }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (currentUser?.email) {
      setUserEmail(currentUser.email);
    }
  }, [currentUser]);

  const [passwordFormDataErrors, setPasswordFormDataErrors] = useState(
    copyObjectWithNullValues(passwordFormData) as {
      [index: string]: string | undefined;
    }
  );

  const validationSchema = updatePasswordSchema();
  const [success, setSuccess] = useState(false);
  const [unknownError, setUnknownError] = useState(false);

  const handleInputChange = async (e: FormChangeEvent) => {
    const { name, value } = e.target;

    setPasswordFormDataErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    setSuccess(false);
    setChanged(passwordFormData[name as keyof FormData] !== value);
    setPasswordFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!loading) {
      setPasswordFormDataErrors({});
      setUnknownError(false);

      try {
        await validationSchema.validate(passwordFormData, {
          abortEarly: false,
        });

        update({
          variables: {
            email: userEmail,
            currentPassword: String(passwordFormData?.currentPassword),
            password: String(passwordFormData?.newPassword),
          },
          onCompleted: () => {
            setSuccess(true);
            setChanged(false);
          },
          onError: (e) => {
            if (e.message === 'credentialsInvalid') {
              setPasswordFormDataErrors({
                currentPassword: t('currentPassword.error'),
              });
            } else {
              setUnknownError(true);
            }
          },
        });
      } catch (e: any) {
        if (e instanceof ValidationError) {
          const errors: { [index: string]: string | undefined } = {};
          e.inner.forEach((error) => {
            if (
              error.path &&
              Object.keys(passwordFormData).includes(error.path)
            ) {
              errors[error.path] = error.message;
            }
          });
          console.log(errors);
          setPasswordFormDataErrors(errors);
        } else {
          setUnknownError(true);
        }
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex-grow divide-y-4 divide-neutral-50 border-neutral-100 bg-white xl:border-r"
      >
        <div className="divide-y divide-gray-200 p-10">
          <section>
            <div className="grid max-w-4xl gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
              <div className="col-span-1 grid h-fit gap-1">
                <div>
                  <h1 className="font-semibold text-neutral-900">
                    {t('editPassword')}
                  </h1>
                </div>
              </div>
              <div className="col-span-2 grid gap-6 lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('currentPassword.label')}
                    placeholder={t('currentPassword.placeholder')}
                    name="currentPassword"
                    required
                    type="password"
                    value={passwordFormData.currentPassword}
                    onChange={handleInputChange}
                    error={passwordFormDataErrors['currentPassword']}
                  />
                </div>
                <div className="text-sm font-medium text-neutral-700"></div>
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('newPassword.label')}
                    placeholder={t('newPassword.placeholder')}
                    name="newPassword"
                    required
                    type="password"
                    value={passwordFormData.newPassword}
                    onChange={handleInputChange}
                    error={passwordFormDataErrors['newPassword']}
                    helper={t('newPassword.helper')}
                  />
                </div>
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('newPasswordRepeat.label')}
                    placeholder={t('newPasswordRepeat.placeholder')}
                    name="newPasswordRepeat"
                    required
                    type="password"
                    value={passwordFormData.newPasswordRepeat}
                    onChange={handleInputChange}
                    error={passwordFormDataErrors['newPasswordRepeat']}
                  />
                </div>
                <div>
                  <div className="flex justify-center text-sm font-medium text-neutral-700 lg:block">
                    <BaseButton
                      loading={loading}
                      disabled={!changed}
                      type="submit"
                      size="md"
                    >
                      {t('editPassword')}
                    </BaseButton>
                  </div>
                  {success && <SuccessfulMessage />}
                  {unknownError && <UnknownErrorMessage />}
                </div>
              </div>
            </div>
          </section>
        </div>
      </form>
    </>
  );
}
