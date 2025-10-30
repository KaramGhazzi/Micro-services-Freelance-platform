'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import BaseList, { BaseListItem, BaseListRow } from '../../BaseList';
import { GetAssignmentAdminQuery } from '@/graphql/queries/assignments/getAssignmentAdmin.generated';

type AssignmentStatusAsideProps = {
  assignment: GetAssignmentAdminQuery['assignmentAdmin'];
};

export const AssignmentStatusAside = ({
  assignment,
}: AssignmentStatusAsideProps) => {
  const t = useTranslations();

  const baseListItem: BaseListItem = {
    headers: [t('admin.table.status'), t('admin.table.createdAt')],
    rows:
      assignment?.statusHistory.map((status) => {
        return {
          columns: [
            {
              type: 'status',
              text: status.key ? t(`assignment.status.${status.key}`) : '',
              status: status.key,
            },
            {
              type: 'date',
              text: status.createdAt,
            },
          ],
        } as BaseListRow;
      }) ?? [],
  };
  return (
    <>
      <article className="relative">
        <div className="grid gap-4 border-b border-neutral-100 bg-white ">
          <h3 className="font-heading px-5 pt-10 text-base font-bold tracking-tight lg:px-10 lg:pt-10">
            {t('global.assignmentStatusHistory')}
          </h3>
          <div className="px-5 pb-5 lg:px-10 lg:pb-10">
            <BaseList baseListItem={baseListItem} embedded />
          </div>
        </div>
      </article>
    </>
  );
};
