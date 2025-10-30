/* eslint-disable react/jsx-no-undef */
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import SkeletonCard from '../zoeken/_components/SkeletonCard';
import BasePagination from '@/app/_components/BasePagination';
import BaseToaster from '@/app/_components/BaseToaster';
import BaseFilterButton from '@/app/_components/BaseFilterButton';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import IconArrowRight from '@/app/_components/icons/IconArrowRight';
import IconBuilding from '@/app/_components/icons/IconBuilding';
import IconClock from '@/app/_components/icons/IconClock';
import {
  AssignmentApplicationStatus,
  AssignmentStatus,
  SortOrder,
} from '@/graphql/types';
import { useSentAssignmentApplicationsQuery } from '@/graphql/queries/assignments/getSentAssignmentApplications.generated';
import IconChatAlt from '@/app/_components/icons/IconChatAlt';
import BaseStatus from '@/app/_components/BaseStatus';
import BaseEmptyState from '@/app/_components/BaseEmptyState';

export default function MyAssignmentApplications() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const toaster = searchParams.get('toaster');

  const currentPage: number = Number(searchParams.get('pagina')) || 1;
  const resultsPerPage: number = Number(searchParams.get('resultaten')) || 12;
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<
    AssignmentApplicationStatus[]
  >([]);

  const {
    data,
    loading,
    refetch: refetchApplicationAssignments,
  } = useSentAssignmentApplicationsQuery({
    variables: {
      where: {
        assignment: {
          is: {
            NOT: [
              {
                status: {
                  equals: AssignmentStatus.Archived,
                },
              },
            ],
          },
        },
        ...(selectedFilterOptions?.length
          ? {
              status: {
                in: selectedFilterOptions,
              },
            }
          : {}),
      },
      skip: (currentPage - 1) * resultsPerPage,
      take: resultsPerPage,
      orderBy: [{ createdAt: SortOrder.Desc }],
    },
  });

  const getTotalPages = () => {
    if (data) {
      return data.count > 0 ? Math.ceil(data?.count / resultsPerPage) : 1;
    }

    return 1;
  };

  const numberOfPages: number = getTotalPages();

  const handlePageChange = (pageNumber: any) => {
    router.push(
      `/opdracht-vinden/mijn-reacties?pagina=${pageNumber}&resultaten=${resultsPerPage}`
    );
  };

  const handleResultsPerPageChange = (resultsPerPage: any) => {
    router.push(
      `/opdracht-vinden/mijn-reacties?pagina=1&resultaten=${resultsPerPage}`
    );
  };

  const handleFilterChange = (
    selectedOptions: AssignmentApplicationStatus[]
  ) => {
    setSelectedFilterOptions(selectedOptions);
    refetchApplicationAssignments();
  };

  const statusKeys: AssignmentApplicationStatus[] = [
    AssignmentApplicationStatus.Concept,
    AssignmentApplicationStatus.New,
    AssignmentApplicationStatus.Question,
    AssignmentApplicationStatus.Pending,
    AssignmentApplicationStatus.Proposed,
    AssignmentApplicationStatus.Accepted,
    AssignmentApplicationStatus.Declined,
  ];

  const statusOptions = statusKeys.map((statusKey) => ({
    value: statusKey,
    label: t(`assignment.application.status.${statusKey}`),
  }));

  return (
    <>
      <BaseToolbarSub
        title={t('assignment.toolbar.myApplications')}
        subtitle={t('global.resultsCount', { count: data?.count ?? 0 })}
      />
      {toaster && (
        <BaseToaster theme="success">{t(`toaster.${toaster}`)}</BaseToaster>
      )}
      <section className="lg:px-10 lg:pt-6">
        <div className="mb-6 flex">
          <BaseFilterButton
            label={t('global.filterStatus')}
            options={statusOptions}
            onChange={handleFilterChange}
          />
        </div>
        {!loading && data?.assignmentApplications?.length === 0 && (
          <BaseEmptyState
            imageUrl="/illustration/sent-responses.svg"
            title={t(`emptyState.applicationsSent.title`)}
            description={t(`emptyState.applicationsSent.description`)}
          />
        )}
        <div className="grid gap-1 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
          {!loading &&
            data?.assignmentApplications?.map((application) => {
              return (
                <Link
                  key={application.id}
                  className="hover:pointer-cursor group relative flex flex-col gap-4 border border-transparent bg-white px-5 py-5 shadow-sm transition-all hover:border-neutral-300 lg:rounded-2xl lg:p-8 lg:py-8"
                  href={
                    application.status === AssignmentApplicationStatus.Concept
                      ? `/opdracht-vinden/opdracht/${application?.assignment?.id}?concept=${application?.id}`
                      : `/opdracht-vinden/mijn-reacties/${application?.id}`
                  }
                >
                  <header className="flex grow flex-col gap-3">
                    <div className="flex justify-between gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-neutral-200 shadow-sm">
                        <figure className="absolute inset-0 flex items-center rounded-lg border border-white bg-white ">
                          <i className="absolute inset-0 rounded-lg"></i>
                          <IconBuilding className="mx-auto" />
                        </figure>
                      </div>
                      <BaseStatus theme={application?.status}>
                        {t(
                          `assignment.application.status.${application.status}`
                        )}
                      </BaseStatus>
                    </div>

                    <div className="line-clamp-2">
                      <h2 className="font-heading text-base font-bold tracking-tight text-neutral-900 ">
                        {application.assignment.title}
                      </h2>
                    </div>
                  </header>
                  <ul className="grid gap-2">
                    <li className="flex gap-2 text-sm text-neutral-700">
                      <IconBuilding className="text-neutral-400" />
                      <span>{application?.assignment?.company?.name}</span>
                    </li>
                    <li className="flex gap-2 text-sm text-neutral-700">
                      <IconClock className="text-neutral-400" />
                      <span suppressHydrationWarning>
                        {t('assignment.detail.appliedAt') +
                          ' ' +
                          new Intl.DateTimeFormat('nl-NL', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          }).format(new Date(application.createdAt))}
                      </span>
                    </li>
                    <li className="flex gap-2 text-sm text-neutral-700">
                      <IconChatAlt className="text-neutral-400" />
                      <span>
                        {t('assignment.detail.messages', {
                          count: 0,
                        })}
                      </span>
                    </li>
                  </ul>
                  <div className="absolute bottom-8 right-8 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                    <IconArrowRight className="text-neutral-900" />
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
      {!loading && data?.count !== 0 && (
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
    </>
  );
}
