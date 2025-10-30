'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import tabs from '../_components/tabs';
import PasswordUpdate from './_components/PasswordUpdate';
import PrivacySettings from '@/app/_components/user/PrivacySettings';
import EmailSettings from '@/app/_components/user/EmailSettings';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import { User } from '@/graphql/types';
import { useSettingUpsertMutation } from '@/graphql/mutations/settings/update.generated';
import { useAuth } from '@/app/_hooks/useAuth';

export default function SettingsForm() {
  const t = useTranslations();
  const { currentUser, refetchMe } = useAuth();
  const [upsert, { loading }] = useSettingUpsertMutation();

  useEffect(() => {
    refetchMe();
  }, []);

  return (
    <section className='className="flex-grow xl:border-r" divide-y-4 divide-neutral-50 border-neutral-100 bg-white'>
      <BaseToolbarSub
        title={t('account.myAccount')}
        subtitle={t('account.editText')}
        tabs={tabs}
      />
      <PasswordUpdate />
      <PrivacySettings
        user={currentUser as User}
        upsert={upsert}
        loading={loading}
      />
      <EmailSettings
        user={currentUser as User}
        upsert={upsert}
        loading={loading}
      />
    </section>
  );
}
