import React from 'react';
import { useTranslations } from 'next-intl';
import AuthTitle from './AuthTitle';
import IconCheckmarkSm from '@/app/_components/icons/IconCheckmarkSm';
import IconXSm from '@/app/_components/icons/IconXSm';
import BaseButton from '@/app/_components/BaseButton';
import IconLoader from '@/app/_components/icons/IconLoader';

interface Props {
  title: string;
  loading: boolean;
  success: boolean;
  redirect: () => void;
}

const backgroundClass = (loading: boolean, success: boolean) => {
  if (loading) {
    return 'bg-neutral-100';
  }

  if (success) {
    return 'bg-lime-50';
  }

  return 'bg-red-50';
};

const checkMark = (loading: boolean, success: boolean) => {
  const iconClasses = 'h-12 w-12 p-2';

  if (loading) {
    return <IconLoader className={`${iconClasses} animate-spin`}></IconLoader>;
  }

  if (success) {
    return (
      <IconCheckmarkSm className="h-12 w-12 p-2 text-green-400"></IconCheckmarkSm>
    );
  }

  return <IconXSm className={`${iconClasses} text-red-400`}></IconXSm>;
};

const RedirectMessage = ({ title, loading, success, redirect }: Props) => {
  const t = useTranslations('auth');

  return (
    <div className="grid gap-10">
      <div className="grid gap-4">
        <div className="flex justify-center">
          <div
            className={`flex h-16 w-16  items-center justify-center rounded-full ${backgroundClass(
              loading,
              success
            )}`}
          >
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-full ${backgroundClass(
                loading,
                success
              )}`}
            >
              {checkMark(loading, success)}
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex justify-center">
            <AuthTitle>{title}</AuthTitle>
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-neutral-700">
              {t('passwordReset.messages.success.description')}
            </p>
          </div>
        </div>
      </div>
      <div>
        <BaseButton onClick={redirect} loading={loading} wide type="submit">
          {t('passwordReset.messages.success.button')}
        </BaseButton>
      </div>
    </div>
  );
};

export default RedirectMessage;
