'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { resetPasswordSchema } from '@package/types/dist/yup/auth/resetPassword.schema';
import { ValidationError } from 'yup';
import AuthTitle from '../../_components/AuthTitle';
import PasswordReset from '../../_components/PasswordReset';
import BaseButton from '@/app/_components/BaseButton';
import IconCheckmarkSm from '@/app/_components/icons/IconCheckmarkSm';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import { useAuth } from '@/app/_hooks/useAuth';

interface FormData {
  password: string;
  passwordRepeat: string;
}

export default function Page({
  params: { passwordResetToken },
}: Readonly<{
  params: { passwordResetToken: string };
}>) {
  const t = useTranslations('auth');
  const router = useRouter();
  const validationSchema = resetPasswordSchema();
  const { resetPassword, loading } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    password: '',
    passwordRepeat: '',
  });

  const [status, setStatus] = useState({
    success: false,
    invalid: false,
    error: false,
    loading: false,
  });

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData) as {
      [index: string]: string | undefined;
    }
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function redirect() {
    router.push('/dashboard');
  }

  const invalidLink = () =>
    t.rich('passwordReset.messages.invalid.description', {
      link: (chunks) => (
        <Link href="/wachtwoord-vergeten" className="underline">
          {chunks}
        </Link>
      ),
    });

  async function handleSubmit() {
    if (!loading) setFormErrors({});

    setStatus({ success: false, invalid: false, error: false, loading: true });

    try {
      await validationSchema.validate(formData, {
        abortEarly: false,
      });

      await resetPassword(passwordResetToken, formData.password);

      setStatus((status) => ({ ...status, success: true }));
    } catch (error: any) {
      setStatus((status) => ({ ...status, success: false }));

      if (error instanceof ValidationError) {
        const errors: { [index: string]: string | undefined } = {};
        error.inner.forEach((error) => {
          if (error.path && Object.keys(formData).includes(error.path)) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else if (error.message !== 'Token invalid') {
        setFormErrors({
          passwordRepeat: invalidLink() as string,
        });
        setStatus((status) => ({ ...status, invalid: true }));
      } else {
        setFormErrors({ passwordRepeat: t('errors.unknownError') });
        setStatus((status) => ({ ...status, error: true }));
      }
    } finally {
      setStatus((status) => ({ ...status, loading: false }));
    }
  }

  if (!status.success) {
    return (
      <PasswordReset
        invalid={status.invalid}
        error={status.error}
        loading={status.loading}
        formData={formData}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    );
  } else {
    return (
      <div className="grid gap-10">
        <div className="grid gap-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16  items-center justify-center rounded-full bg-lime-50">
              <span className="flex h-14 w-14 items-center justify-center rounded-full	bg-lime-100">
                <IconCheckmarkSm className="h-12 w-12 p-2  text-green-400"></IconCheckmarkSm>
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-center">
              <AuthTitle>{t('passwordReset.messages.success.title')}</AuthTitle>
            </div>
            <div className="flex justify-center">
              <p className="text-sm text-neutral-700">
                {t('passwordReset.messages.success.description')}
              </p>
            </div>
          </div>
        </div>
        <div>
          <BaseButton onClick={redirect} wide type="submit">
            {t('passwordReset.messages.success.button')}
          </BaseButton>
        </div>
      </div>
    );
  }
}
