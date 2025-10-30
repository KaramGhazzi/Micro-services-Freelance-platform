'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';
import BasePagination from '@/app/_components/BasePagination';
import { useUsersQuery } from '@/graphql/queries/users/users.generated';
import { SortOrder, User, UsersCompanies } from '@/graphql/types';
import IconPlusCircleFill from '@/app/_components/icons/IconPlusCircleFill';
import BaseButton from '@/app/_components/BaseButton';
import AddUserModal from '@/app/_components/user/AddUserModal';
import { useInviteAdminMutation } from '@/graphql/mutations/auth/inviteAdmin.generated';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';
import BaseIconButton from '@/app/_components/BaseIconButton';
import IconPencilAlt from '@/app/_components/icons/IconPencilAlt';
import IconArrowDiagonalOut from '@/app/_components/icons/IconArrowDiagonalOut';
import EditUserModal from '@/app/_components/user/EditUserModal';

export default function Page({
  params: { companyId },
}: Readonly<{
  params: { companyId: string };
}>) {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage: number = Number(searchParams.get('pagina')) || 1;
  const resultsPerPage: number = Number(searchParams.get('resultaten')) || 12;
  const [addUserModalActive, setAddUserModalActive] = useState(false);
  const [editUserModalActive, setEditUserModalActive] = useState(false);
  const [inviteAdminMutation] = useInviteAdminMutation();

  const baseUrl = `/admin/bedrijven/${companyId}/gebruikers`;

  const { data, loading, refetch } = useUsersQuery({
    variables: {
      where: {
        userCompanies: {
          some: {
            companyId: {
              equals: Number(companyId),
            },
          },
        },
      },
      skip: (currentPage - 1) * resultsPerPage,
      take: resultsPerPage,
      orderBy: [{ createdAt: SortOrder.Desc }],
    },
  });

  const getTotalPages = () => {
    if (data) {
      return data.count > 0 ? Math.ceil(data.count / resultsPerPage) : 1;
    }

    return 1;
  };

  const numberOfPages: number = getTotalPages();
  const [users, setUsers] = useState<BaseListRow[]>([]);
  const [companyHasNoUsers, setCompanyHasNoUsers] = useState<boolean>(false);
  const [companyHasOneUser, setCompanyHasOneUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [selectedUserCompany, setSelectedUserCompany] =
    useState<UsersCompanies>();

  const editUserModalClosed = (success?: boolean) => {
    if (success) {
      refetch();
    }
    setEditUserModalActive(false);
  };

  const handleEditUserModalActive = (
    user: User,
    userCompany: UsersCompanies | undefined,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.stopPropagation();

    setSelectedUser(user);
    setSelectedUserCompany(
      user.userCompanies?.filter(
        (userCompany) => userCompany?.company?.id === companyId
      )[0]
    );

    if (userCompany) {
      setEditUserModalActive(true);
    }
  };

  const renderEditActions = (
    user: User,
    userCompany: UsersCompanies | undefined
  ) => {
    return (
      <td key={`renderEditActions-${user?.id}`} className="py-4 pr-10">
        <div className="duration-250 flex items-center justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          <div>
            <BaseIconButton
              icon={<IconPencilAlt />}
              theme="secondary"
              onClick={(e) => handleEditUserModalActive(user, userCompany, e)}
            />
          </div>
          <div>
            <BaseIconButton icon={<IconArrowDiagonalOut />} theme="secondary" />
          </div>
        </div>
      </td>
    );
  };

  const AddUserModalClosed = (success?: boolean) => {
    if (success) {
      refetch();
    }
    setAddUserModalActive(false);
  };

  const baseListItem: BaseListItem = {
    headers: [t('global.name'), t('global.status'), t('global.roles'), ''],
    rows: users,
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    const baseListRows = data?.users.map((user) => {
      const currentUserCompany = user.userCompanies?.filter(
        (userCompany) => userCompany?.company?.id === companyId
      )[0];
      const userCompanyStatus = currentUserCompany?.status;
      const userCompanyRole = currentUserCompany?.userCompanyRoles?.[0]?.role;

      return {
        url: `/admin/gebruikers/${user.id}`,
        newTab: true,
        columns: [
          {
            type: 'icon',
            text: `${user.firstName} ${user.lastName}`,
            subText: user.email,
            imageUrl: getImageUrl(
              user?.profilePhoto?.container,
              user?.profilePhoto?.blobName
            ),
          },
          {
            type: 'status',
            text: t(`account.users.status.${userCompanyStatus}`),
            status: userCompanyStatus,
          },
          {
            type: 'default',
            text: t(`account.users.userCompanyRole.${userCompanyRole}`),
          },
          {
            type: 'customColumn',
            children: renderEditActions(
              user as User,
              currentUserCompany as UsersCompanies
            ),
          },
        ],
      };
    });

    setUsers(baseListRows as BaseListRow[]);
    setCompanyHasNoUsers(data?.count === 0);
    setCompanyHasOneUser(data?.count === 1);
  }, [data]);

  const handlePageChange = (pageNumber: number) => {
    router.push(`${baseUrl}?pagina=${pageNumber}&resultaten=${resultsPerPage}`);
  };

  const handleResultsPerPageChange = (resultsPerPage: number) => {
    router.push(`${baseUrl}?pagina=1&resultaten=${resultsPerPage}`);
  };

  return (
    <>
      <div className="flex max-w-[100vw] grow flex-col overflow-auto">
        <div className="flex w-full flex-col justify-end bg-white p-5 lg:flex-row lg:px-10 lg:py-6">
          <div className="flex">
            <BaseButton
              theme="primary"
              onClick={() => setAddUserModalActive(true)}
            >
              <IconPlusCircleFill /> {t('global.addNewUser')}
            </BaseButton>
          </div>
        </div>

        <div className="grow">
          <BaseList baseListItem={baseListItem} loading={loading} />
        </div>
        <section className="px-5 py-8 lg:p-10">
          <div className="flex w-full items-center justify-between">
            <BasePagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              resultsPerPage={resultsPerPage}
              onPageChange={handlePageChange}
              onResultsPerPageChange={handleResultsPerPageChange}
            />
          </div>
        </section>
      </div>

      <AddUserModal
        isOpen={addUserModalActive}
        onClose={AddUserModalClosed}
        inviteAdminMutation={inviteAdminMutation}
        companyId={Number(companyId)}
        firstUser={companyHasNoUsers}
      />

      <EditUserModal
        isOpen={editUserModalActive}
        onClose={editUserModalClosed}
        user={selectedUser}
        userCompany={selectedUserCompany}
        refetch={refetch}
        companyHasOneUser={companyHasOneUser}
      />
    </>
  );
}
