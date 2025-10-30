'use client';
import { useTranslations } from 'next-intl';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import { User } from '@/graphql/types';
import { useUserQuery } from '@/graphql/queries/user/user.generated';

export const SelectedUserLayoutContext = createContext<{
  selectedUser: User | undefined;
}>({
  selectedUser: undefined,
});
interface SelectedUserLayoutContextProps {
  children?: React.ReactNode;
  params: { gebruikerId: string };
}

const SelectedUserLayout = ({
  children,
  params,
}: SelectedUserLayoutContextProps) => {
  const t = useTranslations();
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const { data, loading, error } = useUserQuery({
    variables: {
      id: Number(params.gebruikerId),
    },
  });

  useEffect(() => {
    if (data?.user) {
      setSelectedUser(data.user as User);
    }

    if (error) {
      console.error('Error fetching user:', error);
      router.push('/admin/gebruikers');
    }
  }, [data, error, router]);

  const selectedUserObject = useMemo(
    () => ({
      selectedUser,
    }),
    [selectedUser]
  );

  const adminUsersToolbarTabs = [
    {
      name: t('admin.usersTabs.general'),
      href: `/admin/gebruikers/${selectedUser?.id}`,
    },

    {
      name: t('admin.usersTabs.searchTerms'),
      href: `/admin/gebruikers/${selectedUser?.id}/zoekopdrachten`,
    },
    {
      name: t('admin.usersTabs.applicationProfiles'),
      href: `/admin/gebruikers/${selectedUser?.id}/reactieprofielen`,
    },
    {
      name: t('admin.usersTabs.sentReplies'),
      href: `/admin/gebruikers/${selectedUser?.id}/verstuurde-reacties`,
    },
    {
      name: t('admin.usersTabs.assignments'),
      href: `/admin/gebruikers/${selectedUser?.id}/opdrachten`,
    },
    {
      name: t('admin.usersTabs.reviews'),
      href: `/admin/gebruikers/${selectedUser?.id}/beoordelingen`,
    },
  ];

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <SelectedUserLayoutContext.Provider value={selectedUserObject}>
      {selectedUser && (
        <div className="flex flex-grow flex-col">
          <BaseToolbarSub
            title={`${selectedUser?.firstName} ${selectedUser?.lastName}`}
            subtitle={t('admin.users.editUserInformation')}
            tabs={adminUsersToolbarTabs}
            backHref={'/admin/gebruikers'}
          />
          {children}
        </div>
      )}
    </SelectedUserLayoutContext.Provider>
  );
};

export default SelectedUserLayout;
