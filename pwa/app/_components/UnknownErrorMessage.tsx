'use client';
import { useTranslations } from 'next-intl';

export default function UnknownErrorMessage() {
  const t = useTranslations('account');

  return (
    <>
      <div className="flex flex-nowrap items-center px-4 text-sm text-red-500">
        <p className="text-error-600 text-xs font-medium">
          {t('errorMessage')}
        </p>
      </div>
    </>
  );
}
