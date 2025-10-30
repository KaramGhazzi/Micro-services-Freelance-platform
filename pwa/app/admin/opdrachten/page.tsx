'use client';
import React, { useRef, useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import BaseButton from '@/app/_components/BaseButton';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import BaseInput from '@/app/_components/BaseInput';
import IconSearch from '@/app/_components/icons/IconSearch';
import BaseSelect from '@/app/_components/BaseSelect';
import BaseFilterButton from '@/app/_components/BaseFilterButton';

import {
  AssignmentSource,
  AssignmentStatus,
  AssignmentType,
  AssignmentWhereInput,
} from '@/graphql/types';
import { BaseListRow } from '@/app/_components/BaseList';
import AssignmentList, {
  AssignmentListHandle,
  AssignmentResultType,
} from '@/app/_components/assignment/AssignmentList';
import { useFilterStorageAsState } from '@/app/_hooks/useFilterStorage';
import {
  numberFilter,
  enumFilter,
  stringFilter,
  listFilter,
} from '@/app/_libs/createFilter';

type SearchForm = {
  id: string;
  title: string;
  company: string;
  source: AssignmentSource | 'all' | '';
  type: AssignmentType | 'all' | '';
  status: AssignmentStatus[];
};

export default function ProjectsPage() {
  const t = useTranslations('');
  const format = useFormatter();
  const currentUrl = '/admin/opdrachten';

  const assignmentListRef = useRef<AssignmentListHandle>(null);

  const [searchForm, setSearchForm, resetSearchForm] =
    useFilterStorageAsState<SearchForm>(currentUrl, {
      id: '',
      title: '',
      company: '',
      source: '',
      type: '',
      status: [],
    });

  const getWhere = (f: SearchForm) => {
    return {
      id: numberFilter(f.id),
      title: stringFilter(f.title),
      source: enumFilter(f.source, f.source !== 'all'),
      type: enumFilter(f.type, f.type !== 'all'),
      status: listFilter(f.status),
      company: stringFilter(f.company, true, {
        is: { name: { contains: f.company } },
      }),
    } as AssignmentWhereInput;
  };

  const [where, setWhere] = useState<AssignmentWhereInput>(() =>
    getWhere(searchForm)
  );

  const [count, setCount] = useState<number>(0);

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
          type: 'type',
          text: t(`assignment.type.${assignment.type}`),
          status: assignment.type,
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
    t('global.assignmentType'),
    t('global.assignmentStatus'),
    t('global.assignmentCreated'),
    t('assignment.list.views'),
    t('assignment.list.reactions'),
  ];

  const statusKeys: AssignmentStatus[] = Object.values(AssignmentStatus);

  const statusOptions = statusKeys.map((statusKey) => ({
    value: statusKey,
    label: t(`assignment.status.${statusKey}`),
  }));

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setWhere(getWhere(searchForm));

    assignmentListRef.current?.resetPage();
  };

  const handleFormReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSearchForm = resetSearchForm();
    setWhere(getWhere(newSearchForm));

    assignmentListRef.current?.resetPage();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchForm((prevFormData: SearchForm) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFilterChange = (selectedOptions: AssignmentStatus[]) => {
    setSearchForm((prevFormData: SearchForm) => ({
      ...prevFormData,
      status: selectedOptions,
    }));
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <BaseToolbarSub
          title={t('global.assignments')}
          subtitle={t('global.resultsCount', { count })}
        >
          <BaseButton type="reset" theme="secondary">
            <span>{t('admin.users.search.reset')}</span>
          </BaseButton>
          <BaseButton type="submit">
            <IconSearch />
            <span>{t('admin.users.search.search')}</span>
          </BaseButton>
        </BaseToolbarSub>
        <div className="relative z-20 grid gap-x-8 gap-y-4 border-b border-neutral-100 bg-white px-5 py-8 lg:grid-cols-3 lg:px-10">
          <div>
            <BaseInput
              label={t('admin.assignments.search.id.label')}
              placeholder={t('admin.assignments.search.id.placeholder')}
              name="id"
              value={searchForm.id}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <BaseInput
              label={t('admin.assignments.search.title.label')}
              placeholder={t('admin.assignments.search.title.placeholder')}
              name="title"
              value={searchForm.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <BaseInput
              label={t('admin.assignments.search.company.label')}
              placeholder={t('admin.assignments.search.company.placeholder')}
              name="company"
              value={searchForm.company}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <BaseSelect
              label={t('admin.assignments.search.source.label')}
              name="source"
              value={searchForm.source}
              onChange={handleInputChange}
              placeholder={t('global.chooseOption')}
            >
              <option value={AssignmentSource.Platform}>
                {t('assignment.source.platform')}
              </option>
              <option value={AssignmentSource.Api}>
                {t('assignment.source.api')}
              </option>
              <option value="all">{t('assignment.source.all')}</option>
            </BaseSelect>
          </div>
          <div>
            <BaseSelect
              label={t('admin.assignments.search.type.label')}
              name="type"
              value={searchForm.type}
              onChange={handleInputChange}
              placeholder={t('global.chooseOption')}
            >
              <option value={AssignmentType.Basic}>
                {t('assignment.type.BASIC')}
              </option>
              <option value={AssignmentType.Top}>
                {t('assignment.type.TOP')}
              </option>
              <option value="all">{t('assignment.type.all')}</option>
            </BaseSelect>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              {t('admin.assignments.search.status.label')}
            </label>
            <BaseFilterButton
              label={t('global.filterStatus')}
              options={statusOptions}
              onChange={handleFilterChange}
              selected={searchForm.status}
              large
            />
          </div>
        </div>
      </form>
      <AssignmentList
        where={where}
        mapMethod={mapMethod}
        headers={headers}
        paginationUrl={currentUrl}
        onUpdateCount={setCount}
        ref={assignmentListRef}
      />
    </>
  );
}
