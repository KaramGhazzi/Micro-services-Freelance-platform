'use client';
import React, { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AssignmentFormPage from '../../../../../_components/assignment/AssignmentFormPage';
import { AssignmentType } from '@/graphql/types';
import { AssignmentFormHelpAside } from '@/app/_components/assignment/AssignmentFormHelpAside';
import { useGetAssignmentQuery } from '@/graphql/queries/assignments/getAssignment.generated';
import BaseEmptyState from '@/app/_components/BaseEmptyState';
import TopBoxEmployers from '@/app/_components/TopBoxEmployers';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Page({ params }: { params: { opdrachtId: string } }) {
  const { opdrachtId: assignmentId } = params;
  const {
    data: { assignment } = {},
    loading,
    error,
  } = useGetAssignmentQuery({
    variables: {
      where: { id: { equals: Number(assignmentId) } },
    },
  });
  const t = useTranslations('assignment');

  const { currentCompany } = useAuth();

  useEffect(() => {
    if (
      assignment?.company?.id &&
      currentCompany?.id &&
      assignment?.company?.id !== currentCompany?.id
    ) {
      return notFound();
    }
  }, [currentCompany, assignment]);

  if (error && !loading) {
    return notFound();
  } else if (assignment) {
    return (
      <>
        {!loading && (
          <>
            {assignment ? (
              <AssignmentFormPage
                assignment={assignment}
                assignmentType={assignment.type as AssignmentType}
                asideComponent={
                  <>
                    <AssignmentFormHelpAside />
                    <TopBoxEmployers />
                  </>
                }
              />
            ) : (
              <BaseEmptyState
                imageUrl="/illustration/empty-illustration.svg"
                title={t('emptyState.assignment.title')}
                description={t('emptyState.assignment.description')}
              />
            )}
          </>
        )}
      </>
    );
  }
}
