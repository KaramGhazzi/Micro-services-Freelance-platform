'use client';
import React from 'react';
import { AssignmentCompanyAside } from '@/app/_components/assignment/AssignmentCompanyAside';
import BaseAssignmentDetail from '@/app/_components/assignment/BaseAssignmentDetail';
import { useGetAssignmentQuery } from '@/graphql/queries/assignments/getAssignment.generated';
import TopBoxEmployers from '@/app/_components/TopBoxEmployers';

export default function Page({ params }: { params: { opdrachtId: number } }) {
  const { data, loading } = useGetAssignmentQuery({
    variables: {
      where: { id: { equals: Number(params.opdrachtId) } },
    },
  });

  return (
    <>
      {!loading && (
        <BaseAssignmentDetail
          assignment={data?.assignment}
          asideComponent={
            <>
              <AssignmentCompanyAside assignment={data?.assignment} />
              <TopBoxEmployers />
            </>
          }
        />
      )}
    </>
  );
}
