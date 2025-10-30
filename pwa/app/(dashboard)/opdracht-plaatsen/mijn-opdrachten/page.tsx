'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { UsageType } from '@package/types/dist/class-validator';
import SkeletonCard from '../../opdracht-vinden/zoeken/_components/SkeletonCard';
import AssignmentCard from './_components/AssignmentCard';
import SearchUser from './_components/SearchUser';
import BasePagination from '@/app/_components/BasePagination';
import BaseButton from '@/app/_components/BaseButton';
import BaseToaster from '@/app/_components/BaseToaster';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import IconPlusCircleFill from '@/app/_components/icons/IconPlusCircleFill';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import {
  SortOrder,
  UserRole,
  User,
  UserCompanyRole,
  CompanyType,
  AssignmentStatus,
} from '@/graphql/types';
import BaseEmptyState from '@/app/_components/BaseEmptyState';
import { useGetMyCompanyAssignmentsQuery } from '@/graphql/queries/assignments/getMyCompanyAssignments.generated';
import { useGetMyAssignmentsQuery } from '@/graphql/queries/assignments/getMyAssignments.generated';
import { useRemainingUsageByCreditTypeLazyQuery } from '@/graphql/queries/usage/remainingUsageByCreditType.generated';
import OutOfCreditsModal from '@/app/(dashboard)/_components/OutOfCreditsModal';
import { useCompanyQuery } from '@/graphql/queries/companies/getCompany.generated';
import BaseFilterButton from '@/app/_components/BaseFilterButton';
import { useAuth } from '@/app/_hooks/useAuth';

export default function MyAssignments() {
  const router = useRouter();
  const { currentUser, currentCompany, currentCompanyId, userCompanyRoles } =
    useAuth();

  const t = useTranslations();
  const searchParams = useSearchParams();
  const toaster = searchParams.get('toaster');
  const [outOfCreditsModalActive, setOutOfCreditsModalActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState<AssignmentStatus[]>([
    AssignmentStatus.Published,
    AssignmentStatus.PendingReview,
    AssignmentStatus.Declined,
    AssignmentStatus.Closed,
    AssignmentStatus.Concept,
    AssignmentStatus.Paused,
  ]);

  const currentPage: number = Number(searchParams.get('pagina')) || 1;
  const resultsPerPage: number = Number(searchParams.get('resultaten')) || 12;
  const [getRemainingUsage] = useRemainingUsageByCreditTypeLazyQuery();

  const [showAllAssignments, setShowAllAssignments] = useState(true);

  const baseWhereClause = {
    company: {
      is: {
        id: {
          equals: Number(currentCompanyId),
        },
      },
    },
    status: statusFilter.length
      ? {
          in: [
            ...statusFilter,
            ...(statusFilter.includes(AssignmentStatus.PendingReview)
              ? [AssignmentStatus.InReview, AssignmentStatus.Reviewed]
              : []),
            ...(statusFilter.includes(AssignmentStatus.Published)
              ? [AssignmentStatus.Publishing]
              : []),
          ],
        }
      : {},
  };

  const fetchAssignmentQuery =
    showAllAssignments &&
    (userCompanyRoles.includes(UserCompanyRole.Supervisor) ||
      userCompanyRoles.includes(UserCompanyRole.Owner))
      ? useGetMyCompanyAssignmentsQuery
      : useGetMyAssignmentsQuery;

  const {
    data: assignmentData,
    loading,
    refetch = () => {},
  } = fetchAssignmentQuery({
    variables: {
      where: baseWhereClause,
      skip: (currentPage - 1) * resultsPerPage,
      take: resultsPerPage,
      orderBy: [{ createdAt: SortOrder.Desc }],
    },
  }) || {};
  const assignments = assignmentData?.assignments ?? [];
  const count = 0;

  const { data: companyData } = useCompanyQuery({
    variables: {
      where: {
        id: {
          equals: Number(currentCompanyId),
        },
      },
    },
  });

  const statusKeys: AssignmentStatus[] = [
    AssignmentStatus.Published,
    AssignmentStatus.PendingReview,
    AssignmentStatus.Declined,
    AssignmentStatus.Closed,
    AssignmentStatus.Concept,
    AssignmentStatus.Paused,
    AssignmentStatus.Archived,
  ];

  const statusOptions = statusKeys.map((statusKey) => ({
    value: statusKey,
    label: t(`assignment.application.status.${statusKey}`),
  }));

  const users: User[] = (companyData?.company.companyUsers ?? [])
    .filter((userCompanies) => {
      return (
        currentUser?.id !== userCompanies.user.id &&
        (userCompanies.user.role === UserRole.Admin ||
          userCompanies.user.role === UserRole.User)
      );
    })
    .map((userCompanies) => {
      return { ...(userCompanies.user as User) };
    });

  const getTotalPages = () => {
    if (count) {
      return count > 0 ? Math.ceil(count / resultsPerPage) : 1;
    }

    return 1;
  };

  const handleUserSelect = (user: User | null) => {
    setSelectedUser(user);
  };

  const numberOfPages: number = getTotalPages();

  const handlePageChange = (pageNumber: any) => {
    router.push(
      `/opdracht-plaatsen/mijn-opdrachten?pagina=${pageNumber}&resultaten=${resultsPerPage}`
    );
  };

  const handleResultsPerPageChange = (resultsPerPage: any) => {
    router.push(
      `/opdracht-plaatsen/mijn-opdrachten?pagina=1&resultaten=${resultsPerPage}`
    );
  };

  const creditCheck = async () => {
    const remainingUsage = await getRemainingUsage({
      variables: { usageType: UsageType.ASSIGNMENT },
    });

    if (
      remainingUsage?.data?.remainingUsageByCreditType?.amount === undefined ||
      remainingUsage?.data?.remainingUsageByCreditType?.amount < 1
    ) {
      setOutOfCreditsModalActive(true);
    } else {
      router.push('/opdracht-plaatsen/nieuwe-opdracht');
    }
  };

  useEffect(() => {
    if (currentUser) {
      refetch();
    }
  }, [showAllAssignments]);

  useEffect(() => {
    if (selectedUser) {
      refetch({
        ...baseWhereClause,
        where: {
          ownerId: {
            equals: Number(selectedUser.id),
          },
        },
      });
    } else {
      refetch({
        where: baseWhereClause,
      });
    }
  }, [selectedUser]);

  const handleShowAllAssignmentsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;

    setShowAllAssignments(checked);
  };

  const handleStatusFilterChange = (selectedOptions: AssignmentStatus[]) => {
    setStatusFilter(selectedOptions);
  };

  return (
    <>
      <BaseToolbarSub
        title={t('assignment.toolbar.myAssignments')}
        subtitle={t('assignment.toolbar.assignmentsCount', {
          count: count ?? 0,
        })}
      >
        <div>
          <BaseButton theme="primary" onClick={creditCheck}>
            <IconPlusCircleFill /> {t('assignment.toolbar.newAssignment')}
          </BaseButton>
        </div>
      </BaseToolbarSub>
      {toaster && (
        <BaseToaster theme="success">{t(`toaster.${toaster}`)}</BaseToaster>
      )}
      <section className="lg:px-10 lg:pt-6">
        <div className="relative m-5 flex flex-wrap gap-4 align-middle lg:mx-0 lg:mt-0">
          {(userCompanyRoles.includes(UserCompanyRole.Supervisor) ||
            userCompanyRoles.includes(UserCompanyRole.Owner)) &&
            currentCompany?.type !== CompanyType.Freelancer && (
              <>
                <div className="flex items-center">
                  <BaseCheckbox
                    label={t('assignment.toolbar.showAllAssignments')}
                    name="showAllAssignments"
                    checked={showAllAssignments}
                    onChange={handleShowAllAssignmentsChange}
                  />
                </div>
                {showAllAssignments && (
                  <div className="grow sm:grow-0">
                    <SearchUser
                      placeholder={t('assignment.toolbar.filterUsers')}
                      users={users}
                      companyName={currentCompany?.name}
                      onUserSelect={handleUserSelect}
                      hideSelectedUser
                      popOverResults
                    />
                  </div>
                )}
              </>
            )}
          <div className="grow sm:grow-0">
            <BaseFilterButton
              label={t('global.filterStatus')}
              options={statusOptions}
              onChange={handleStatusFilterChange}
              selected={statusFilter}
              large
            />
          </div>
        </div>

        {!loading && assignments?.length === 0 && (
          <BaseEmptyState
            imageUrl="/illustration/my-jobs.svg"
            title={t(`emptyState.assignments.title`)}
            description={t(`emptyState.assignments.description`)}
          />
        )}
        <div className="grid gap-1 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
          {loading && !assignments && (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
          {!loading &&
            assignments?.map((assignment, index) => {
              return (
                <AssignmentCard
                  key={index}
                  assignment={assignment}
                  index={index}
                  showOwner={
                    userCompanyRoles.includes(UserCompanyRole.Supervisor) ||
                    userCompanyRoles.includes(UserCompanyRole.Owner)
                  }
                />
              );
            })}
        </div>
      </section>
      {!loading && assignments && assignments?.length > 0 && (
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
      <OutOfCreditsModal
        isOpen={outOfCreditsModalActive}
        onClose={() => setOutOfCreditsModalActive(false)}
        referToAssignments
      >
        {t('assignment.basic.newAssignmentOutOfCreditsBasicText')}
      </OutOfCreditsModal>
    </>
  );
}
