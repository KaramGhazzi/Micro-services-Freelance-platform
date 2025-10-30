'use client';
import { notFound, useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import { useGetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';
import BaseCreateReviewFlow from '@/app/_components/BaseCreateReviewFlow';
import { Assignment, AssignmentStatus } from '@/graphql/types';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('assignment');
  const params = useParams();
  const currentRoute = usePathname();

  const { data, loading, error, refetch } = useGetAssignmentApplicationQuery({
    variables: {
      where: { id: { equals: Number(params.reactieId) } },
    },
  });

  let tabs = [
    {
      name: 'Mijn reactie',
      href: `/opdracht-vinden/mijn-reacties/${params.reactieId}`,
      current:
        currentRoute === `/opdracht-vinden/mijn-reacties/${params.reactieId}`
          ? true
          : false,
    },
    {
      name: 'Opdracht details',
      href: data?.assignmentApplication?.assignment?.id
        ? `/opdracht-vinden/mijn-reacties/${params.reactieId}/details/${data.assignmentApplication.assignment.id}`
        : '',
      current:
        currentRoute ===
        `/opdracht-vinden/mijn-reacties/${params.reactieId}/details/${data?.assignmentApplication?.assignment.id}`
          ? true
          : false,
    },
  ];

  const assignment = data?.assignmentApplication?.assignment as
    | Assignment
    | undefined;

  if (error && !loading) {
    return notFound();
  } else if (assignment) {
    if (
      (params.opdrachtId && assignment.id !== params.opdrachtId) ||
      assignment.status === AssignmentStatus.Archived
    ) {
      return notFound();
    }

    return (
      <>
        <BaseToolbarSub
          title={assignment?.title ?? ''}
          overtitle={t('toolbar.myApplications')}
          backHref="/opdracht-vinden/mijn-reacties"
          tabs={tabs}
        >
          {/* <BaseTippy content={<span>{t('tooltip.transferAssignment')}</span>}>
            <div>
              <BaseButton theme="secondary" square>
                <IconTrash />
              </BaseButton>
            </div>
          </BaseTippy> */}
          {assignment?.reviewEnabled && (
            <BaseCreateReviewFlow
              assignment={assignment}
              ctaButtonText={t('reviewRecruiter')}
              onReviewSubmit={() => refetch()}
            />
          )}
        </BaseToolbarSub>
        {children}
      </>
    );
  }
}
