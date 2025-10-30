'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { useEffect, useMemo, useState } from 'react';
import { SelectedAssignmentLayoutContext } from '@/app/admin/_data/selectedAssignmentLayoutContext';
import BaseButton from '@/app/_components/BaseButton';
import IconPencilAlt from '@/app/_components/icons/IconPencilAlt';
import ErrorNotFound from '@/app/_components/ErrorNotFound';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import { useGetAssignmentAdminQuery } from '@/graphql/queries/assignments/getAssignmentAdmin.generated';
import { AssignmentStatus } from '@/graphql/types';

const editingAllowedStatusTypes = [
  AssignmentStatus.Concept,
  AssignmentStatus.PendingReview,
  AssignmentStatus.InReview,
  AssignmentStatus.Published,
  AssignmentStatus.Paused,
  AssignmentStatus.Closed,
];

export default function SelectedAssignmentLayout({
  params,
  children,
}: {
  params: { opdrachtId: string };
  children: React.ReactNode;
}) {
  const { opdrachtId: assignmentId } = params;
  const t = useTranslations();
  const currentRoute = usePathname();
  const [hasChanged, setHasChanged] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [handleSave, setHandleSave] = useState(() => () => {});

  const {
    data: { assignmentAdmin: assignment } = {},
    error,
    loading,
    refetch,
  } = useGetAssignmentAdminQuery({
    variables: {
      where: { id: { equals: Number(assignmentId) } },
    },
  });

  const tabs = useMemo(
    () => [
      {
        name: 'Opdracht details',
        href: `/admin/opdrachten/${assignment?.id}`,
        current:
          currentRoute === `/admin/opdrachten/${assignment?.id}` ? true : false,
      },
      {
        name: `Reacties (${assignment?.commentsCount})`,
        href: `/admin/opdrachten/${assignment?.id}/reacties`,
        current:
          currentRoute === `/admin/opdrachten/${assignment?.id}/reacties`
            ? true
            : false,
      },
    ],
    [assignment, currentRoute]
  );

  useEffect(() => {
    if (assignment?.status) {
      setCanEdit(
        editingAllowedStatusTypes.includes(assignment.status) &&
          currentRoute === `/admin/opdrachten/${assignment.id}`
      );
    } else {
      setCanEdit(false);
    }
  }, [assignment, currentRoute]);

  useEffect(() => {
    setEditMode(false);
  }, [assignment, currentRoute]);

  const context = useMemo(
    () => ({
      hasChanged,
      setHasChanged,
      canEdit,
      editMode,
      setEditMode,
      assignment,
      setHandleSave,
      loading,
      error,
      refetch,
    }),
    [hasChanged, setHasChanged, canEdit, editMode, setEditMode, assignment]
  );

  if (error && !loading) {
    return <ErrorNotFound />;
  } else if (assignment) {
    return (
      <SelectedAssignmentLayoutContext.Provider value={context}>
        {assignment && (
          <>
            <BaseToolbarSub
              title={assignment.title ?? ''}
              overtitle={t('assignment.toolbar.assignments')}
              backHref="/admin/opdrachten"
              tabs={tabs}
            >
              {canEdit && !editMode && (
                <BaseButton
                  theme="secondary"
                  wide
                  onClick={() => setEditMode((prev) => !prev)}
                >
                  <IconPencilAlt className="hidden sm:flex" />
                  <span>{t('assignment.toolbar.edit')}</span>
                </BaseButton>
              )}

              {canEdit && editMode && (
                <>
                  <BaseButton
                    theme="secondary"
                    wide
                    onClick={() => setEditMode((prev) => !prev)}
                  >
                    <span>{t('assignment.toolbar.cancel')}</span>
                  </BaseButton>
                  <BaseButton
                    theme="primary"
                    wide
                    onClick={handleSave}
                    disabled={!hasChanged}
                  >
                    <span>{t('admin.assignment.toolbar.save')}</span>
                  </BaseButton>
                </>
              )}
            </BaseToolbarSub>
            {children}
          </>
        )}
      </SelectedAssignmentLayoutContext.Provider>
    );
  }
}
