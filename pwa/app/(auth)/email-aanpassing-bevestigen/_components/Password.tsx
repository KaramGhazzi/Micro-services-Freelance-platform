'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import SuccessfulMessage from '../../../_components/SuccessfulMessage';
import UnknownErrorMessage from '../../../_components/UnknownErrorMessage';
import BaseButton from '@/app/_components/BaseButton';
import BaseInput from '@/app/_components/BaseInput';

export interface FormData {
  password: string;
}

export interface FormErrors {
  password?: string;
}

export type FormChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

interface Props {
  loading: boolean;
  passwordFormData: FormData;
  passwordFormDataErrors: FormErrors;
  success: boolean;
  unknownError: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Password({
  handleSubmit,
  handleInputChange,
  loading,
  success,
  unknownError,
  passwordFormData,
  passwordFormDataErrors,
}: Readonly<Props>) {
  const t = useTranslations();

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <div className="max-w-4xl gap-10">
          <h1 className="mb-4 font-semibold text-neutral-900">
            {t('account.confirmEmailChangePassword')}
          </h1>
          <div className="">
            <div className="mb-4 text-sm font-medium text-neutral-700">
              <BaseInput
                label={t('account.currentPassword.label')}
                placeholder={t('account.currentPassword.placeholder')}
                name="password"
                required
                type="password"
                value={passwordFormData.password}
                onChange={handleInputChange}
                error={passwordFormDataErrors['password']}
              />
            </div>
            <div className="flex justify-center text-sm font-medium text-neutral-700 lg:block">
              <BaseButton type="submit" loading={loading} size="md">
                {t('global.confirm')}
              </BaseButton>
            </div>
            {success && <SuccessfulMessage />}
            {unknownError && <UnknownErrorMessage />}
          </div>
        </div>
      </section>
    </form>
  );
}
