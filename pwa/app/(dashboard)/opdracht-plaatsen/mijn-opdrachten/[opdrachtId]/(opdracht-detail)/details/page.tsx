'use client';
import React from 'react';
import DeclineReasonBanner from '../../../_components/DeclineReasonBanner';
import BaseAssignmentDetail from '@/app/_components/assignment/BaseAssignmentDetail';
import { AssignmentStatus } from '@/graphql/types';
import { useGetMyAssignmentQuery } from '@/graphql/queries/assignments/getMyAssignment.generated';
import { AssignmentCompanyAside } from '@/app/_components/assignment/AssignmentCompanyAside';
import TopBoxEmployers from '@/app/_components/TopBoxEmployers';

export default function Page({ params }: { params: { opdrachtId: number } }) {
  const { data: { assignment } = {}, loading } = useGetMyAssignmentQuery({
    variables: {
      where: { id: { equals: Number(params.opdrachtId) } },
    },
  });

  return (
    <>
      {!loading && assignment && (
        <>
          {assignment.currentStatus.key === AssignmentStatus.Declined && (
            <DeclineReasonBanner
              assignmentTitle={assignment.title}
              assignmentId={assignment.id}
              currentStatus={assignment.currentStatus}
              canEdit
            />
          )}
          <BaseAssignmentDetail
            assignment={assignment}
            asideComponent={
              <>
                <AssignmentCompanyAside assignment={assignment} />
                <TopBoxEmployers />
              </>
            }
          />
        </>
      )}
    </>
  );
}
