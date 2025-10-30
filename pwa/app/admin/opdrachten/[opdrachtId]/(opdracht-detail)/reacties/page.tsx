'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAssignmentApplicationsAdminQuery } from '@/graphql/queries/assignments/getAssignmentApplicationsAdmin.generated';
import { SortOrder } from '@/graphql/types';
import BasePagination from '@/app/_components/BasePagination';
import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';

export default function Page({
  params,
}: Readonly<{ params: { opdrachtId: string } }>) {
  const t = useTranslations();
  const format = useFormatter();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage: number = Number(searchParams.get('pagina')) || 1;
  const resultsPerPage: number = Number(searchParams.get('resultaten')) || 12;
  const baseUrl = `/admin/opdrachten/${params.opdrachtId}/reacties`;

  const { data, loading } = useAssignmentApplicationsAdminQuery({
    variables: {
      where: {
        assignmentId: {
          equals: Number(params.opdrachtId),
        },
      },
      orderBy: [{ createdAt: SortOrder.Desc }, { updatedAt: SortOrder.Desc }],
      skip: (currentPage - 1) * resultsPerPage,
      take: resultsPerPage,
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
      t('assignment.table.head.name'),
      t('global.applicationDate'),
      t('global.applicationStatus'),
    ],
    rows:
      data?.assignmentApplications?.map((assignmentApplication) => {
        return {
          url: `/admin/opdrachten/${assignmentApplication.assignment.id}/reactie/${assignmentApplication.id}`,
          columns: [
            {
              type: 'default',
              text: [
                assignmentApplication.owner.firstName,
                assignmentApplication.owner.lastName,
              ].join(' '),
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
          ],
        } satisfies BaseListRow;
      }) || [],
  };

  return (
    <>
      <BaseList loading={loading} baseListItem={baseListItem} />
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
    </>
  );
}
