'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import tabs from '../_components/tabs';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import PersonalDetailsForm from '@/app/_components/user/PersonalDetailsForm';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Page() {
  const { currentUser, refetchMe } = useAuth();
  const t = useTranslations();

  useEffect(() => {
    refetchMe();
  }, []);

  return (
    <>
      <BaseToolbarSub
        title={t('account.myAccount')}
        subtitle={t('account.editText')}
        tabs={tabs}
      />

      <PersonalDetailsForm user={currentUser} />
    </>
  );
}
