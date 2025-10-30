'use client';
import React, { useContext, useEffect, useRef } from 'react';
import { SelectedAssignmentLayoutContext } from '@/app/admin/_data/selectedAssignmentLayoutContext';
import { GetAssignmentQuery } from '@/graphql/queries/assignments/getAssignment.generated';
import BaseAssignmentDetail from '@/app/_components/assignment/BaseAssignmentDetail';
import { AssignmentStatusAside } from '@/app/_components/assignment/admin/AssignmentStatusAside';
import { AssignmentInformationAside } from '@/app/_components/assignment/admin/AssignmentInformationAside';
import ErrorNotFound from '@/app/_components/ErrorNotFound';
import AssignmentFormPage from '@/app/_components/assignment/AssignmentFormPage';
import {
  AssignmentExpertise,
  AssignmentStatus,
  AssignmentType,
} from '@/graphql/types';
import { useUpdateAssignmentAdminMutation } from '@/graphql/mutations/assignments/updateAssignment.generated';
import AssignmentFormExpertise from '@/app/_components/assignment/AssignmentFormExpertise';
import DeclineReasonBanner from '@/app/(dashboard)/opdracht-plaatsen/mijn-opdrachten/_components/DeclineReasonBanner';

const AdminAssignmentDetailPage = () => {
  const {
    setHasChanged,
    editMode,
    setEditMode,
    setHandleSave,
    assignment,
    refetch,
    error,
    loading,
  } = useContext(SelectedAssignmentLayoutContext);
  const formRef = useRef<any>();
  const [saveMutation] = useUpdateAssignmentAdminMutation();

  const handleSave = async () => {
    if (formRef.current) {
      try {
        await formRef.current?.saveAssignment?.();
        setEditMode(false);
        refetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    setHandleSave(() => handleSave);
  }, [handleSave]);

  if (error && !loading) {
    return <ErrorNotFound />;
  } else if (assignment) {
    const expertises =
      assignment?.expertises?.map(
        (expertise: AssignmentExpertise) => expertise.expertise
      ) ?? [];

    return (
      <div className="relative">
        {assignment && (
          <>
            {assignment.currentStatus.key === AssignmentStatus.Declined && (
              <DeclineReasonBanner
                assignmentTitle={assignment.title}
                assignmentId={assignment.id}
                currentStatus={assignment.currentStatus}
              />
            )}
            {!editMode ? (
              <>
                <BaseAssignmentDetail
                  assignment={assignment as GetAssignmentQuery['assignment']}
                  hideReference={true}
                  asideComponent={
                    <>
                      <AssignmentInformationAside assignment={assignment} />{' '}
                      <AssignmentStatusAside assignment={assignment} />
                    </>
                  }
                />
                {expertises.length > 0 && (
                  <div className="flex-grow divide-y-4 divide-neutral-50 border-neutral-100 bg-white xl:border-r">
                    <AssignmentFormExpertise
                      expertises={expertises}
                      isEditable={false}
                    />
                  </div>
                )}
              </>
            ) : (
              <AssignmentFormPage
                ref={formRef}
                assignment={assignment}
                assignmentType={assignment.type as AssignmentType}
                asideComponent={
                  <>
                    <AssignmentInformationAside assignment={assignment} />{' '}
                    <AssignmentStatusAside assignment={assignment} />
                  </>
                }
                showToolbar={false}
                saveMutation={saveMutation}
                onHasChanged={setHasChanged}
                admin
              />
            )}
          </>
        )}
      </div>
    );
  }
};

export default AdminAssignmentDetailPage;
