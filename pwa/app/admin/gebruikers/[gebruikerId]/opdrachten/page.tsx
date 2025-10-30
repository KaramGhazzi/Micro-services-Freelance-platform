'use client';
import React, { useRef } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { BaseListRow } from '@/app/_components/BaseList';
import AssignmentList, {
  AssignmentListHandle,
  AssignmentResultType,
} from '@/app/_components/assignment/AssignmentList';

export default function ProjectsPage() {
  const t = useTranslations('');
  const format = useFormatter();
  const { gebruikerId: userId } = useParams<{ gebruikerId: string }>();
  const baseUrl = `/admin/gebruikers/${userId}/opdrachten`;

  const assignmentListRef = useRef<AssignmentListHandle>(null);

  const mapMethod = (assignment: AssignmentResultType) => {
    return {
      url: `/admin/opdrachten/${assignment.id}`,
      columns: [
        {
          type: 'default',
          text: assignment.id,
        },
        {
          type: 'default',
          text: assignment.title,
        },
        {
          type: 'default',
          text: assignment.company.name,
        },
        {
          type: 'status',
          text: t(`assignment.status.${assignment.status}`),
          status: assignment.status,
        },
        {
          type: 'default',
          text: format.dateTime(new Date(assignment.createdAt), {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }),
        },
        {
          type: 'default',
          text: assignment.viewsCount,
        },
        {
          type: 'default',
          text: assignment.commentsCount,
        },
      ],
    } as BaseListRow;
  };

  const headers = [
    t('global.assignmentID'),
    t('global.assignmentTitle'),
    t('global.company'),
    t('global.assignmentStatus'),
    t('global.assignmentCreated'),
    t('assignment.list.views'),
    t('assignment.list.reactions'),
  ];

  const where = {
    ownerId: { equals: Number(userId) },
  };

  return (
    <>
      <AssignmentList
        where={where}
        mapMethod={mapMethod}
        headers={headers}
        paginationUrl={baseUrl}
        ref={assignmentListRef}
      />
    </>
  );
}
