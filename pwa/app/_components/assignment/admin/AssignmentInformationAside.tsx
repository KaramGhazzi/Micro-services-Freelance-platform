'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { GetAssignmentQuery } from '@/graphql/queries/assignments/getAssignment.generated';

type AssignmentInformationAsideProps = {
  assignment: GetAssignmentQuery['assignment'];
};

export const AssignmentInformationAside = ({
  assignment,
}: AssignmentInformationAsideProps) => {
  const t = useTranslations();

  return (
    <>
      <article className="relative">
        <div className="grid gap-6 border-b border-neutral-100 bg-white px-5 py-10 lg:p-10">
          <h3 className="font-heading text-base font-bold tracking-tight">
            {t('global.assignmentInformation')}
          </h3>

          <dl className="flex gap-6 text-sm">
            <dt className="w-32 shrink-0 truncate font-medium">
              {t('global.placedBy')}
            </dt>
            <dd className="text-neutral-600">
              {assignment?.owner.firstName} {assignment?.owner.lastName}
            </dd>
          </dl>

          <dl className="flex gap-6 text-sm">
            <dt className="w-32 shrink-0 truncate font-medium">
              {t('global.company')}
            </dt>
            <dd className="text-neutral-600">{assignment?.company.name}</dd>
          </dl>

          <dl className="flex gap-6 text-sm">
            <dt className="w-32 shrink-0 truncate font-medium">
              {t('global.assignmentID')}
            </dt>
            <dd className="text-neutral-600">{assignment?.id}</dd>
          </dl>

          <dl className="flex gap-6 text-sm">
            <dt className="w-32 shrink-0 truncate font-medium">
              {t('global.assignmentType')}
            </dt>
            <dd className="text-neutral-600">{assignment?.type}</dd>
          </dl>
        </div>
      </article>
    </>
  );
};
