'use client';
import { useTranslations } from 'next-intl';
import IconCheckmarkSm from '@/app/_components/icons/IconCheckmarkSm';

export default function SuccessfulMessage() {
  const t = useTranslations('account');

  return (
    <>
      <div className="text-success-400 flex flex-nowrap items-center px-4 text-sm">
        <IconCheckmarkSm />
        <p className="text-xs">{t('successMessage')}</p>
      </div>
    </>
  );
}
