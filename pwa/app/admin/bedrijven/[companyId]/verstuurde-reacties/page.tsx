'use client';
import { useTranslations } from 'next-intl';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';
import BasePagination from '@/app/_components/BasePagination';
import { useGetAllCompanyAssignmentApplicationsQuery } from '@/graphql/queries/assignments/getAllCompanyAssignmentApplications.generated';

export default function Page() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { companyId } = useParams<{ companyId: string }>();
  const baseUrl = `/admin/bedrijven/${companyId}/verstuurde-reacties`;
  const currentPage: number = Number(searchParams.get('pagina')) || 1;
  const resultsPerPage: number = Number(searchParams.get('resultaten')) || 12;
  const { data, loading } = useGetAllCompanyAssignmentApplicationsQuery({
    variables: {
      companyId: parseInt(companyId),
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

  const headers = [
    t('admin.applications.table.replyBy'),
    t('admin.applications.table.assignmentTitle'),
    t('admin.applications.table.company'),
    t('admin.applications.table.status'),
    t('admin.applications.table.createdAt'),
  ];

  const rows =
    data?.applications?.map((application) => {
      return {
        columns: [
          {
            type: 'default',
            text: [application?.owner.firstName, application?.owner.lastName]
              .filter((e) => e)
              .join(' '),
          },
          {
            type: 'default',
            text: application.assignment.title,
          },
          {
            type: 'default',
            text: application.assignment?.company.name ?? '-',
          },
          {
            type: 'status',
            text: t(`assignment.application.status.${application.status}`),
            status: application?.status,
          },
          {
            type: 'date',
            text: application.createdAt,
          },
        ],
        url: `/admin/opdrachten/${application.assignment.id}/reacties/${application.id}`,
      } as BaseListRow;
    }) ?? [];

  const baseListItem: BaseListItem = {
    headers,
    rows,
  };

  return (
    <>
      <BaseList baseListItem={baseListItem} loading={loading} />
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
