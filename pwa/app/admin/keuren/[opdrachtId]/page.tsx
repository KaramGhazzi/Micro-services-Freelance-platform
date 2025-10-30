'use client';
import React from 'react';
import { AssignmentType } from '@/graphql/types';
import AssignmentFormPage from '@/app/_components/assignment/AssignmentFormPage';
import { AssignmentInformationAside } from '@/app/_components/assignment/admin/AssignmentInformationAside';
import { useGetAssignmentAdminQuery } from '@/graphql/queries/assignments/getAssignmentAdmin.generated';
import { AssignmentStatusAside } from '@/app/_components/assignment/admin/AssignmentStatusAside';
import { useUpdateAssignmentAdminMutation } from '@/graphql/mutations/assignments/updateAssignment.generated';
import ErrorNotFound from '@/app/_components/ErrorNotFound';

const AdminAssignmentDetailPage = ({
  params,
}: {
  params: { opdrachtId: string };
}) => {
  const { opdrachtId: assignmentId } = params;
  const {
    data: { assignmentAdmin: assignment } = {},
    error,
    loading,
  } = useGetAssignmentAdminQuery({
    variables: {
      where: { id: { equals: Number(assignmentId) } },
    },
  });

  const [saveMutation] = useUpdateAssignmentAdminMutation();

  if (error && !loading) {
    return <ErrorNotFound />;
  } else if (assignment) {
    return (
      <>
        {assignment && (
          <AssignmentFormPage
            assignment={assignment}
            assignmentType={assignment.type ?? AssignmentType.Basic}
            admin
            saveMutation={saveMutation}
            mutationError={error}
            asideComponent={
              <>
                <AssignmentInformationAside assignment={assignment} />
                <AssignmentStatusAside assignment={assignment} />
              </>
            }
          />
        )}
      </>
    );
  }
};

export default AdminAssignmentDetailPage;
