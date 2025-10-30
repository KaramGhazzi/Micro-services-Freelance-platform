'use client';
import React from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { BaseListRow } from '@/app/_components/BaseList';
import AssignmentList, {
  AssignmentResultType,
} from '@/app/_components/assignment/AssignmentList';

export default function Page({
  params: { companyId },
}: Readonly<{ params: { companyId: string } }>) {
  const format = useFormatter();
  const t = useTranslations();
  const baseUrl = '/admin';

  const currentUrl = `/admin/bedrijven/${companyId}/opdrachten`;

  const mapMethod = (assignment: AssignmentResultType) => {
    return {
      url: `${baseUrl}/opdrachten/${assignment.id}`,
      columns: [
        {
          type: 'default',
          text: assignment.id,
        },
        {
          type: 'default',
          text: assignment.title,
          isBold: true,
        },
        {
          type: 'default',
          text: `${assignment.owner.firstName} ${assignment.owner.lastName}`,
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
          type: 'status',
          text: t(`assignment.status.${assignment.status}`),
          status: assignment.status,
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
    'ID',
    t('global.assignmentTitle'),
    t('admin.assignments.check.table.head.assignmentOwner'),
    t('global.assignmentDate'),
    t('global.assignmentStatus'),
    t('assignment.list.views'),
    t('assignment.list.reactions'),
  ];

  const where = {
    companyId: { equals: Number(companyId) },
  };

  return (
    <>
      <AssignmentList
        where={where}
        mapMethod={mapMethod}
        headers={headers}
        paginationUrl={currentUrl}
      ></AssignmentList>
    </>
  );
}
