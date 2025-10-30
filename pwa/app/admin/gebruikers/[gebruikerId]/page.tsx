'use client';
import React, { useContext } from 'react';
import { SelectedUserLayoutContext } from './layout';
import PersonalDetailsForm from '@/app/_components/user/PersonalDetailsForm';
import Companies from '@/app/_components/user/Companies';
import PrivacySettings from '@/app/_components/user/PrivacySettings';
import ResetPassword from '@/app/_components/user/ResetPassword';
import EmailSettings from '@/app/_components/user/EmailSettings';
import { User } from '@/graphql/types';
import { useSettingUpsertAdminMutation } from '@/graphql/mutations/settings/setting-upsert-admin.generated';
import DeleteUser from '@/app/_components/user/DeleteUser';

export default function Page() {
  const { selectedUser } = useContext(SelectedUserLayoutContext);
  const [upsert, { loading }] = useSettingUpsertAdminMutation();

  return (
    <div className="divide-y-4 divide-neutral-50">
      <PersonalDetailsForm user={selectedUser as User} isAdmin />
      <Companies user={selectedUser as User} />
      <PrivacySettings
        user={selectedUser as User}
        upsert={upsert}
        loading={loading}
      />
      <ResetPassword user={selectedUser as User} />
      <EmailSettings
        user={selectedUser as User}
        upsert={upsert}
        loading={loading}
      />
      <DeleteUser user={selectedUser as User} />
    </div>
  );
}
