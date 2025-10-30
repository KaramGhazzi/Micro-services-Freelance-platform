'use client';
import React from 'react';
import Settings from './Settings';
import { User } from '@/graphql/types';
import BaseEmailToggleList from '@/app/_components/user/BaseEmailToggleList';

type EmailSettingsFormProps = {
  user: User | undefined;
  upsert: (settingsData: any) => any;
  loading: boolean;
};

export default function EmailSettings({
  user,
  upsert,
  loading,
}: Readonly<EmailSettingsFormProps>) {
  const formData = {
    assignmentPublished: false,
    assignmentDeclined: false,
    assignmentTransferred: false,
    assignmentClosed: false,
    assignmentArchived: false,
  };

  return (
    <Settings
      title={'email-settings.title'}
      intro={'email-settings.intro'}
      user={user}
      upsert={upsert}
      loading={loading}
      formData={formData}
    >
      <BaseEmailToggleList gap={6} />
    </Settings>
  );
}
