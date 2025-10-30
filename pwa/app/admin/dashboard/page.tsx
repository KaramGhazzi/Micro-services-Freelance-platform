'use client';

import { useTranslations } from 'next-intl';
import BaseHeading from '@/app/_components/BaseHeading';

export default function Dashboard() {
  const t = useTranslations('dashboard');
  return (
    <div className="flex min-h-full items-center justify-center p-6">
      <div className="flex flex-col items-center gap-2">
        <BaseHeading type="h1" size="2xl">
          {t('salutation')}
        </BaseHeading>
        <p>{t('paragraph')}</p>
      </div>
    </div>
  );
}
