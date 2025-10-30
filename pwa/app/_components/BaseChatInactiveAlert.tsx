'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import IconExclamationMarkCircleFill from '@/app/_components/icons/IconExclamationMarkCircleFill';

const BaseChatInactiveAlert: React.FC = () => {
  const t = useTranslations();
  return (
    <div className="flex gap-3 bg-white p-8 px-5 text-sm lg:p-10">
      <div>
        <IconExclamationMarkCircleFill className="text-warning-500" />
      </div>
      <div>
        <p className="font-semibold">{t('chat.inactive.title')}</p>
        <p className="text-neutral-700">{t('chat.inactive.description')}</p>
      </div>
    </div>
  );
};

export default BaseChatInactiveAlert;
