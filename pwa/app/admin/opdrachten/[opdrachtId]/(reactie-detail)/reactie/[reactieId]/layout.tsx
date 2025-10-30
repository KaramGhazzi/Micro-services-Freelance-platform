'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';
import { useGetAssignmentApplicationAdminQuery } from '@/graphql/queries/assignments/getAssignmentApplicationAdmin.generated';

export default function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { opdrachtId: number; reactieId: number };
}) {
  const assignmentQueryParams = {
    where: { id: { equals: Number(params.reactieId) } },
  };

  const {
    data: { assignmentApplicationAdmin } = {},
    loading,
    error,
  } = useGetAssignmentApplicationAdminQuery({
    variables: assignmentQueryParams,
  });

  if (error && !loading) {
    return notFound();
  } else if (assignmentApplicationAdmin) {
    return (
      <>
        {!loading && (
          <BaseToolbarSub
            title={`${assignmentApplicationAdmin?.owner?.firstName} ${assignmentApplicationAdmin?.owner?.lastName}`}
            titleImage={getImageUrl(
              assignmentApplicationAdmin?.owner?.profilePhoto?.container,
              assignmentApplicationAdmin?.owner?.profilePhoto?.blobName
            )}
            overtitle={`${
              assignmentApplicationAdmin?.assignment?.title ?? '-'
            }`}
            backHref={`/admin/opdrachten/${params.opdrachtId}/reacties`}
            tabs={[
              {
                name: 'Reactie',
                href: `/admin/opdrachten/${params.opdrachtId}/reactie/${params.reactieId}`,
                current: true,
              },
            ]}
          />
        )}

        {children}
      </>
    );
  }
}
