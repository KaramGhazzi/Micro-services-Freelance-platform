'use client';
import React from 'react';
import Settings from './Settings';
import { User } from '@/graphql/types';
import BasePrivacyToggleList from '@/app/_components/user/BasePrivacyToggleList';

type PrivacySettingsFormProps = {
  user: User | undefined;
  upsert: (settingsData: any) => any;
  loading: boolean;
};

export default function PrivacySettings({
  user,
  upsert,
  loading,
}: Readonly<PrivacySettingsFormProps>) {
  const formData = {
    informEmployersAnonymouslyWhenMatched: false,
    provideEmployersWithCvWhenMatched: false,
    informAboutProductsAndServices: false,
    shareWithMotherAndSisterCompanies: false,
    sendNewsletter: false,
    askForFeedback: false,
    sendContent: false,
  };

  return (
    <Settings
      title={'settings.privacy'}
      intro={'settings.intro'}
      user={user}
      upsert={upsert}
      loading={loading}
      formData={formData}
    >
      <BasePrivacyToggleList gap={6} />
    </Settings>
  );
}
