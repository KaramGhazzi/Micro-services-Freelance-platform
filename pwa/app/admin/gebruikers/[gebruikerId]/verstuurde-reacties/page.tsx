'use client';
import React from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';
import BasePagination from '@/app/_components/BasePagination';
import { useAssignmentApplicationsAdminQuery } from '@/graphql/queries/assignments/getAssignmentApplicationsAdmin.generated';
import { SortOrder } from '@/graphql/types';

export default function Page() {
  const t = useTranslations();
  const format = useFormatter();
  const router = useRouter();
  const { gebruikerId: userId } = useParams<{ gebruikerId: string }>();
  const baseUrl = `/admin/gebruikers/${userId}/verstuurde-reacties`;

  const searchParams = useSearchParams();
  const currentPage: number = Number(searchParams.get('pagina')) || 1;
  const resultsPerPage: number = Number(searchParams.get('resultaten')) || 25;

  const { data, loading } = useAssignmentApplicationsAdminQuery({
    variables: {
      where: {
        ownerId: {
          equals: parseInt(userId),
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

  const handlePageChange = (pageNumber: any) => {
    router.push(`${baseUrl}?pagina=${pageNumber}&resultaten=${resultsPerPage}`);
  };

  const handleResultsPerPageChange = (resultsPerPage: any) => {
    router.push(`${baseUrl}?pagina=1&resultaten=${resultsPerPage}`);
  };

  const baseListItem: BaseListItem = {
    headers: [
      'ID',
      t('global.assignmentTitle'),
      t('global.assignmentCompany'),
      t('global.applicationDate'),
      t('global.applicationStatus'),
      t('global.applicationSenderCompany'),
    ],
    rows:
      data?.assignmentApplications?.map((assignmentApplication) => {
        return {
          url: `/admin/opdrachten/${assignmentApplication.assignment.id}`,
          columns: [
            {
              type: 'default',
              text: assignmentApplication.id,
            },
            {
              type: 'default',
              text: assignmentApplication.assignment.title || '',
            },
            {
              type: 'default',
              text: assignmentApplication.assignment.company.name ?? '-',
            },
            {
              type: 'default',
              text: format.dateTime(new Date(assignmentApplication.createdAt), {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }),
            },
            {
              type: 'status',
              text: t(
                `assignment.application.status.${assignmentApplication.status}`
              ),
              status: assignmentApplication.status,
            },
            {
              type: 'default',
              text: assignmentApplication.company.name ?? '-',
            },
          ],
        } satisfies BaseListRow;
      }) || [],
  };

  return (
    <>
      <div className="max-w-[100vw] grow overflow-auto">
        <BaseList loading={loading} baseListItem={baseListItem} />
      </div>
      <section className="px-5 py-8 lg:p-10">
        <div className="flex w-full items-center justify-between">
          <BasePagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            resultsPerPage={resultsPerPage}
            resultsPerPageOptions={[25, 50, 100]}
            onPageChange={handlePageChange}
            onResultsPerPageChange={handleResultsPerPageChange}
          />
        </div>
      </section>
    </>
  );
}
