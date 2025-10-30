'use client';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';
import BasePagination from '@/app/_components/BasePagination';
import {
  AssignmentsAdminQuery,
  useAssignmentsAdminQuery,
} from '@/graphql/queries/assignments/assignmentsAdmin.generated';
import {
  AssignmentOrderByWithRelationInput,
  AssignmentWhereInput,
  SortOrder,
} from '@/graphql/types';
import { useFilterStorage } from '@/app/_hooks/useFilterStorage';

export type AssignmentResultType = NonNullable<
  AssignmentsAdminQuery['assignments']
>[0];

export type AssignmentListHandle = {
  resetPage: () => void;
};

type Props = {
  where: AssignmentWhereInput;
  mapMethod: (assignment: AssignmentResultType) => BaseListRow;
  headers: string[];
  paginationUrl: string;
  onUpdateCount?: (count: number) => void;
  onUpdateResultsPerPage?: (resultsPerPage: number) => void;
  orderBy?:
    | Array<AssignmentOrderByWithRelationInput>
    | AssignmentOrderByWithRelationInput;
};

const AssignmentList = forwardRef<AssignmentListHandle, Props>(
  (
    {
      where,
      mapMethod,
      headers,
      paginationUrl,
      onUpdateCount,
      onUpdateResultsPerPage,
      orderBy = { createdAt: SortOrder.Desc },
    },
    ref
  ) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const filterStorage = useFilterStorage(paginationUrl, {
      currentPage: 1,
      resultsPerPage: 12,
    });

    useImperativeHandle(ref, () => ({
      resetPage() {
        handlePageChange(1);
      },
    }));

    const currentPage: number = filterStorage.setOrGet(
      'currentPage',
      Number.parseInt(searchParams.get('pagina') ?? '')
    );
    const resultsPerPage: number = filterStorage.setOrGet(
      'resultsPerPage',
      Number.parseInt(searchParams.get('resultaten') ?? '')
    );

    const fetchVariables = {
      where,
      skip: (currentPage - 1) * resultsPerPage,
      take: resultsPerPage,
      orderBy,
    };

    const { data, loading } = useAssignmentsAdminQuery({
      variables: fetchVariables,
    });

    useEffect(() => {
      if (onUpdateCount) {
        onUpdateCount(data?.count ?? 0);
      }

      if (onUpdateResultsPerPage) {
        onUpdateResultsPerPage(resultsPerPage);
      }
    }, [data]);

    const getTotalPages = () => {
      if (data) {
        return data.count > 0 ? Math.ceil(data.count / resultsPerPage) : 1;
      }

      return 1;
    };

    const numberOfPages: number = getTotalPages();

    const handlePageChange = (pageNumber: any) => {
      router.push(
        `${paginationUrl}?pagina=${pageNumber}&resultaten=${resultsPerPage}`
      );
    };

    const handleResultsPerPageChange = (resultsPerPage: any) => {
      router.push(`${paginationUrl}?pagina=1&resultaten=${resultsPerPage}`);
    };

    const rows: BaseListRow[] = data?.assignments?.map(mapMethod) ?? [];

    const baseListItem: BaseListItem = {
      headers,
      rows,
    };

    return (
      <>
        {!loading && (
          <div className="h-full max-w-[100vw] overflow-auto">
            <BaseList baseListItem={baseListItem} />
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
        )}
      </>
    );
  }
);
AssignmentList.displayName = 'AssignmentList';

export default AssignmentList;
