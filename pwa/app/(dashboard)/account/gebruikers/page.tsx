'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import BasePagination from '@/app/_components/BasePagination';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import { SortOrder, User, UsersCompanies } from '@/graphql/types';
import {
  useCurrentCompanyUsersLazyQuery,
  useCurrentCompanyUsersQuery,
} from '@/graphql/queries/users/currentCompanyUsers.generated';
import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';
import BaseButton from '@/app/_components/BaseButton';
import IconXSm from '@/app/_components/icons/IconXSm';
import IconCheckmarkSm from '@/app/_components/icons/IconCheckmarkSm';
import BaseIconButton from '@/app/_components/BaseIconButton';
import IconTrash from '@/app/_components/icons/IconTrash';
import IconPencilAlt from '@/app/_components/icons/IconPencilAlt';
import Modal from '@/app/_components/BaseDialog';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';
import BaseHeading from '@/app/_components/BaseHeading';
import { useUserCompanyDeleteMutation } from '@/graphql/mutations/users-companies/deleteUserCompany.generated';
import IconPlusCircleFill from '@/app/_components/icons/IconPlusCircleFill';
import AddUserModal from '@/app/_components/user/AddUserModal';
import BaseSelect from '@/app/_components/BaseSelect';
import EditUserModal from '@/app/_components/user/EditUserModal';
import { useAuth } from '@/app/_hooks/useAuth';

enum UserDeleteStatus {
  NO_ASSIGNMENTS = 'NO_ASSIGNMENTS',
  TRANSFER_ASSIGNMENTS = 'TRANSFER_ASSIGNMENTS',
}

const getActiveUsersFromCompany = (
  allUsers: User[] | undefined,
  activeUserId: string | undefined,
  activeCompanyId: string | undefined
) => {
  return (
    allUsers?.filter(
      (user) =>
        user.id !== activeUserId &&
        user.userCompanies?.some(
          ({ company, status }) =>
            company.id === activeCompanyId && status === 'ACTIVE'
        )
    ) ?? []
  );
};

export default function Users({
  params: { email },
}: Readonly<{ params: { email: string } }>) {
  const baseUrl = '/account/gebruikers';
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('');
  const { currentUser, currentCompanyId } = useAuth();
  const currentPage: number = Number(searchParams.get('pagina')) || 1;
  const resultsPerPage: number = Number(searchParams.get('resultaten')) || 12;
  const currentUserId = Number(currentUser?.id);
  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState<string | null>(null);
  const [deleteTransferSelectedUserId, setDeleteTransferSelectedUserId] =
    useState<number | null>(null);

  // Currently used user in a action for example delete or edit
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [activeUserCompany, setActiveUserCompany] =
    useState<UsersCompanies | null>(null);

  const [deleteUserModalActive, setDeleteUserModalActive] = useState<
    UserDeleteStatus | boolean
  >(false);

  const [withdrawInvitationModalActive, setWithdrawInvitationModalActive] =
    useState<boolean>(false);

  const [deleteUserConfirmModalActive, setDeleteUserConfirmModalActive] =
    useState(false);
  const [addUserModalActive, setAddUserModalActive] = useState(false);
  const [editUserModalActive, setEditUserModalActive] = useState(false);
  const [userCompanyDelete] = useUserCompanyDeleteMutation({
    refetchQueries: ['currentCompanyUsers'],
  });

  const { data, loading, refetch } = useCurrentCompanyUsersQuery({
    variables: {
      where: {},
      skip: (currentPage - 1) * resultsPerPage,
      take: resultsPerPage,
      orderBy: [{ createdAt: SortOrder.Desc }],
    },
  });

  // getAllUsers function is used to fetch all users in the company for reassigning assignments.
  const [getAllUsers, { data: allUsersData, called }] =
    useCurrentCompanyUsersLazyQuery({
      variables: {
        where: {},
      },
    });

  useEffect(() => {
    if (!called && (activeUser?.assignments?.length ?? 0) > 0) {
      getAllUsers();
    }
  }, [activeUser, called, getAllUsers]);

  useEffect(() => {
    setUsers((data?.users as User[]) ?? []);
  }, [data]);

  const getTotalPages = () => {
    if (data) {
      return data.count > 0 ? Math.ceil(data.count / resultsPerPage) : 1;
    }

    return 1;
  };

  const numberOfPages: number = getTotalPages();

  const handlePageChange = (pageNumber: any) => {
    router.push(`${baseUrl}?pagina=${pageNumber}&resultaten=${resultsPerPage}`);
  };

  const handleResultsPerPageChange = (resultsPerPage: any) => {
    router.push(`${baseUrl}?pagina=1&resultaten=${resultsPerPage}`);
  };

  const AddUserModalClosed = (success?: boolean) => {
    if (success) {
      refetch();
    }
    setAddUserModalActive(false);
  };

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
    if (userCompany) {
      setActiveUser(user);
      setActiveUserCompany(userCompany);
      setEditUserModalActive(true);
    }
  };

  const withdrawInvitation = async (
    user: User,
    userCompany: UsersCompanies
  ) => {
    setActiveUser(user);
    setActiveUserCompany(userCompany);
    setWithdrawInvitationModalActive(true);
  };

  const renderInvitedUserActions = (
    user: User,
    userCompany: UsersCompanies
  ) => {
    return (
      <td key={`renderInvitedUserActions-${user?.id}`} className="py-4 pr-10">
        <div className="flex items-center justify-end">
          <BaseButton
            theme={'secondary'}
            size={'md'}
            onClick={() => withdrawInvitation(user, userCompany)}
          >
            <IconXSm />
            {t('account.users.actions.withdrawInvitation')}
          </BaseButton>
        </div>
      </td>
    );
  };

  const renderRequestedUserActions = (id: number) => {
    return (
      <td key={`renderRequestedUserActions-${id}`} className="py-4 pr-10">
        <div className="flex items-center justify-end">
          <div className="mr-4">
            <BaseButton
              theme={'secondary'}
              size={'md'}
              onClick={() => console.log(id)}
            >
              <IconXSm />
              {t('account.users.actions.refuse')}
            </BaseButton>
          </div>

          <div>
            <BaseButton
              theme={'secondary'}
              size={'md'}
              onClick={() => console.log(id)}
            >
              <IconCheckmarkSm />
              {t('account.users.actions.giveAccess')}
            </BaseButton>
          </div>
        </div>
      </td>
    );
  };

  const renderEditActions = (
    user: User,
    userCompany: UsersCompanies | undefined
  ) => {
    if (Number(user?.id) === currentUserId) {
      return <td key={`renderEditActions-${user?.id}`}></td>;
    }

    return (
      <td key={`renderEditActions-${user?.id}`} className="py-4 pr-10">
        <div className="duration-250 flex items-center justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          <div>
            <BaseIconButton
              icon={<IconTrash />}
              theme="secondary"
              onClick={(e) => handleOpenDeleteUserModal(user, userCompany, e)}
            />
          </div>

          <div>
            <BaseIconButton
              icon={<IconPencilAlt />}
              theme="secondary"
              onClick={(e) => handleEditUserModalActive(user, userCompany, e)}
            />
          </div>
        </div>
      </td>
    );
  };

  const renderUserActions = (
    user: User,
    userCompany: UsersCompanies | undefined
  ) => {
    switch (userCompany?.status) {
      case 'REQUESTED':
        return renderRequestedUserActions(Number(user?.id));
      case 'INVITED':
        return renderInvitedUserActions(user, userCompany);
      default:
        return renderEditActions(user, userCompany);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDeleteTransferSelectedUserId(Number(event.target.value));
  };

  const baseListItem: BaseListItem = {
    headers: [
      t('account.users.list-header.name'),
      t('account.users.list-header.status'),
      t('account.users.list-header.roles'),
      '',
    ],
    rows:
      users?.map((user) => {
        const currentUserCompany = user?.userCompanies?.find((userCompany) => {
          return userCompany?.company?.id == currentCompanyId;
        });

        const usersCompaniesStatus = currentUserCompany?.status;
        const role = currentUserCompany?.userCompanyRoles?.[0]?.role;

        return {
          columns: [
            {
              type: 'icon',
              text:
                ((user?.firstName || user?.lastName) &&
                  `${user?.firstName} ${user?.lastName}`) ??
                user?.email,
              subText: user?.email,
              label:
                currentUser?.email === user?.email &&
                t('account.users.currentUser'),
            },
            {
              type: 'status',
              text: usersCompaniesStatus
                ? t(`account.users.status.${usersCompaniesStatus}`)
                : '',
              status: usersCompaniesStatus,
            },
            {
              type: 'default',
              text:
                (role && t(`account.users.userCompanyRole.${role}`)) ?? null,
            },
            {
              type: 'customColumn',
              children: renderUserActions(user, currentUserCompany),
            },
          ],
        } as BaseListRow;
      }) ?? [],
  };

  const handleOpenDeleteUserModal = (
    user: User,
    userCompany: UsersCompanies | undefined,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.stopPropagation();
    if (userCompany) {
      setActiveUser(user);
      setActiveUserCompany(userCompany);

      setDeleteUserModalActive(
        user?.assignments?.length
          ? UserDeleteStatus.TRANSFER_ASSIGNMENTS
          : UserDeleteStatus.NO_ASSIGNMENTS
      );
    }
  };

  const handleDeleteUser = async (
    user: User | null,
    userCompany: UsersCompanies | null
  ) => {
    if (!user || !userCompany) {
      return;
    }

    setError(null);

    try {
      if (deleteTransferSelectedUserId) {
        await deleteUser(user, userCompany);

        setDeleteUserModalActive(false);
        setDeleteUserConfirmModalActive(true);
      } else {
        setError(t('global.userSelectError'));
      }
    } catch (error: any) {
      setError(error.message);

      console.log('error', error);
    }
  };

  const deleteUser = async (
    user: User | null,
    userCompany: UsersCompanies | null
  ) => {
    if (!user || !userCompany) {
      return;
    }

    await userCompanyDelete({
      variables: {
        where: {
          id: +userCompany.id,
        },
        currentOwner: +user.id,
        newOwner: deleteTransferSelectedUserId
          ? Number(deleteTransferSelectedUserId)
          : 0,
      },
    });

    setWithdrawInvitationModalActive(false);
    setDeleteUserModalActive(false);
    setDeleteUserConfirmModalActive(true);
  };

  const filteredUsers = getActiveUsersFromCompany(
    (allUsersData?.users as User[]) ?? [],
    activeUser?.id,
    activeUserCompany?.company.id
  );

  return (
    <>
      <BaseToolbarSub
        title={t('global.users')}
        subtitle={t('global.resultsCount', { count: data?.count ?? 0 })}
      >
        <BaseButton theme="primary" onClick={() => setAddUserModalActive(true)}>
          <IconPlusCircleFill /> {t('global.addNewUser')}
        </BaseButton>
      </BaseToolbarSub>

      <div className="h-full max-w-[100vw] overflow-auto">
        <BaseList loading={loading} baseListItem={baseListItem} />
      </div>

      {!loading && (
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
      )}

      <Modal
        isOpen={deleteUserModalActive === UserDeleteStatus.NO_ASSIGNMENTS}
        onClose={() => setDeleteUserModalActive(false)}
        size="md"
        title={t('global.deleteUserTitle')}
        footer={
          <>
            <BaseButton
              onClick={() => setDeleteUserModalActive(false)}
              theme="secondary"
              size="lg"
            >
              {t('global.cancel')}
            </BaseButton>

            <BaseButton
              onClick={() => deleteUser(activeUser, activeUserCompany)}
              size="lg"
            >
              {t('global.deleteUserConfirm')}
            </BaseButton>
          </>
        }
      >
        <p className="text-neutral-500">{t('global.deleteUserText')}</p>
      </Modal>

      <Modal
        isOpen={withdrawInvitationModalActive}
        onClose={() => setWithdrawInvitationModalActive(false)}
        size="md"
        title={t('global.withdrawInvitation')}
        footer={
          <>
            <BaseButton
              onClick={() => setWithdrawInvitationModalActive(false)}
              theme="secondary"
              size="lg"
            >
              {t('global.cancel')}
            </BaseButton>

            <BaseButton
              onClick={() => deleteUser(activeUser, activeUserCompany)}
              size="lg"
            >
              {t('global.withdrawInvitatioConfirm')}
            </BaseButton>
          </>
        }
      >
        <p className="text-neutral-500">{t('global.withdrawInvitationText')}</p>
      </Modal>

      <Modal
        isOpen={deleteUserModalActive === UserDeleteStatus.TRANSFER_ASSIGNMENTS}
        onClose={() => setDeleteUserModalActive(false)}
        size="md"
        title={t('global.deleteUserWarning')}
        footer={
          <>
            <BaseButton
              onClick={() => setDeleteUserModalActive(false)}
              theme="secondary"
              size="lg"
            >
              {t('global.cancel')}
            </BaseButton>

            <BaseButton
              onClick={() => handleDeleteUser(activeUser, activeUserCompany)}
              disabled={!deleteTransferSelectedUserId}
              size="lg"
            >
              {t('global.deleteUserTitle')}
            </BaseButton>
          </>
        }
      >
        <div className="grid gap-5">
          <p className="text-neutral-500">
            {t('global.deleteUserWarningText')}
          </p>
          <BaseSelect
            label={t('global.transferAssignmentLabel')}
            name="selectedUser"
            value={deleteTransferSelectedUserId}
            onChange={handleSelectChange}
            required
            error={error ?? ''}
            placeholder={t('global.selectUser')}
          >
            {filteredUsers.map((user: User) => (
              <option key={user.id} value={user.id}>
                {/* In case firstName or lastName is empty, show email */}
                {user.firstName || user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.email}
              </option>
            ))}
          </BaseSelect>
        </div>
      </Modal>
      <Modal
        isOpen={deleteUserConfirmModalActive}
        onClose={() => setDeleteUserConfirmModalActive(false)}
        size="md"
      >
        <div className="flex justify-center">
          <i className="bg-success-50 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="bg-success-100 flex h-14 w-14 items-center justify-center rounded-full">
              <IconCheckmarkMd className="text-success-500 h-10 w-10" />
            </span>
          </i>
        </div>
        <div className="mb-8 grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('global.deleteUserConfirmationTitle')}
          </BaseHeading>
        </div>
        <BaseButton
          onClick={() => setDeleteUserConfirmModalActive(false)}
          theme="primary"
          size="lg"
          wide
        >
          {t('global.backToUsersOverview')}
        </BaseButton>
      </Modal>

      <AddUserModal
        isOpen={addUserModalActive}
        onClose={AddUserModalClosed}
        email={email ? decodeURIComponent(email) : ''}
      />

      <EditUserModal
        isOpen={editUserModalActive}
        onClose={editUserModalClosed}
        user={activeUser}
        userCompany={activeUserCompany}
        refetch={refetch}
      />
    </>
  );
}
