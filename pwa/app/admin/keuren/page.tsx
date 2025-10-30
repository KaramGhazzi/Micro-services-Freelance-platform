'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import BaseToolbar from '@/app/_components/toolbar/BaseToolbar';
import {
  AssignmentStatus,
  AssignmentWhereInput,
  SortOrder,
} from '@/graphql/types';
import { BaseListRow } from '@/app/_components/BaseList';
import AssignmentList, {
  AssignmentResultType,
} from '@/app/_components/assignment/AssignmentList';

const orderBy = { createdAt: SortOrder.Asc };

export default function AssignmentsCheckPage() {
  const currentUrl = '/admin/keuren';
  const t = useTranslations();
  const [count, setCount] = useState<number>(0);

  const where: AssignmentWhereInput = {
    status: {
      in: [AssignmentStatus.PendingReview, AssignmentStatus.InReview],
    },
  };

  const mapMethod = (assignment: AssignmentResultType) => {
    return {
      url: `${currentUrl}/${assignment?.id}`,
      columns: [
        {
          type: 'default',
          text: `${assignment?.title?.substring(0, 50)} (${assignment?.id})`,
          children: [],
          isBold: true,
        },
        {
          type: 'default',
          children: [],
          text: t(`assignment.type.${assignment?.type}`),
        },
        {
          type: 'default',
          text: assignment?.company?.name,
        },
        {
          type: 'default',
          text: `${assignment?.owner?.firstName} ${assignment?.owner?.lastName}`,
        },
        {
          type: 'default',
          text: t(
            `admin.assignments.contractTypeOptions.${assignment?.contractType}`
          ),
        },
        {
          type: 'date',
          text: assignment?.createdAt || '1970-01-01T00:00:00.000Z',
        },
      ],
    } as BaseListRow;
  };

  const headers = [
    t('admin.assignments.check.table.head.title'),
    t('admin.assignments.check.table.head.assignmentType'),
    t('admin.assignments.check.table.head.companyName'),
    t('admin.assignments.check.table.head.assignmentOwner'),
    t('admin.assignments.check.table.head.contractType'),
    t('admin.assignments.check.table.head.registrationDate'),
  ];

  return (
    <>
      <BaseToolbar
        title={t('navigation.admin.forApproval')}
        subtitle={t('admin.assignments.check.projectsToCheck', {
          count: count,
        })}
      />

      <AssignmentList
        where={where}
        orderBy={orderBy}
        mapMethod={mapMethod}
        headers={headers}
        paginationUrl={currentUrl}
        onUpdateCount={(number) => setCount(number)}
      ></AssignmentList>
    </>
  );
}
