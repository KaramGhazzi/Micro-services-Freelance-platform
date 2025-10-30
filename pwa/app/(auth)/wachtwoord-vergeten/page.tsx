'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react';
import AuthTitle from '../_components/AuthTitle';
import BaseInput from '@/app/_components/BaseInput';
import BaseButton from '@/app/_components/BaseButton';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Page() {
  const t = useTranslations('auth');
  const { forgotPassword } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  const [status, setStatus] = useState({
    success: false,
    invalid: false,
    error: false,
    loading: false,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: '',
    }));

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    if (!formData.email) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: t('passwordForget.email.errors.required'),
      }));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: t('passwordForget.email.errors.invalid'),
      }));
      return;
    }

    setStatus({ success: false, invalid: false, error: false, loading: true });

    try {
      await forgotPassword(formData.email);

      setStatus((status) => ({ ...status, success: true }));
    } catch (error) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: t('passwordForget.email.errors.failed'),
      }));
      return;
    } finally {
      setStatus((status) => ({ ...status, loading: false }));
    }
  }

  return (
    <div className="">
      <div className="grid gap-2">
        <div>
          <AuthTitle>{t('passwordForget.header')}</AuthTitle>
        </div>
        <p className="text-sm text-neutral-700">
          {status?.success && t('passwordForget.messages.success')}
          {status?.invalid && t('passwordForget.messages.invalid')}
          {status?.error && t('passwordForget.messages.error')}
          {!status.success &&
            !status.invalid &&
            !status.error &&
            t('passwordForget.description')}
        </p>
      </div>
      {!status?.success && (
        <>
          <div className="pt-6">
            <BaseInput
              label={t('passwordForget.email.label')}
              placeholder={t('passwordForget.email.placeholder')}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              autoFocus
              required
              error={errors.email}
            />
          </div>
          <div className="pt-10">
            <BaseButton
              onClick={() => handleSubmit()}
              loading={status.loading}
              wide
            >
              {t('passwordForget.button')}
            </BaseButton>
          </div>
          <div className=" pt-6">
            <p className="text-center text-sm text-neutral-700">
              <Link
                href="/inloggen"
                className="text-primary-600 text-sm font-medium hover:underline"
              >
                {t('passwordForget.backButton')}
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
