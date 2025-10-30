'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import BasePagination from '@/app/_components/BasePagination';
import BaseToaster from '@/app/_components/BaseToaster';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';

import { renderContracts } from '@/app/_libs/renderContracts';

import { Company, SortOrder, UserWhereInput } from '@/graphql/types';
import { useUsersQuery } from '@/graphql/queries/users/users.generated';

import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';
import BaseInput from '@/app/_components/BaseInput';
import BaseButton from '@/app/_components/BaseButton';
import IconSearch from '@/app/_components/icons/IconSearch';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';
import {
  useFilterStorage,
  useFilterStorageAsState,
} from '@/app/_hooks/useFilterStorage';
import { numberFilter, orFilter, stringFilter } from '@/app/_libs/createFilter';
import { useAuth } from '@/app/_hooks/useAuth';

type SearchForm = {
  searchName: string;
  searchEmail: string;
  searchPhoneNumber: string;
  searchUserId: string;
};

export default function Users() {
  const baseUrl = '/admin/gebruikers';
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser } = useAuth();
  const t = useTranslations('');
  const toaster = searchParams.get('toaster');

  const filterStorage = useFilterStorage(baseUrl, {
    currentPage: 1,
    resultsPerPage: 12,
  });

  const currentPage: number = filterStorage.setOrGet(
    'currentPage',
    Number.parseInt(searchParams.get('pagina') ?? '')
  );
  const resultsPerPage: number = filterStorage.setOrGet(
    'resultsPerPage',
    Number.parseInt(searchParams.get('resultaten') ?? '')
  );

  const [searchForm, setSearchForm, resetSearchForm] =
    useFilterStorageAsState<SearchForm>(filterStorage, {
      searchName: '',
      searchEmail: '',
      searchPhoneNumber: '',
      searchUserId: '',
    });

  const getWhere = (f: SearchForm) => {
    return {
      AND: f.searchName
        .trim()
        .split(/\s+/)
        .map((word) => ({
          OR: orFilter(
            ['firstName', 'lastName'],
            [stringFilter(word), stringFilter(word)]
          ),
        }))
        .filter((filter) => filter),

      email: stringFilter(f.searchEmail),
      phoneNumber: stringFilter(f.searchPhoneNumber),
      id: numberFilter(f.searchUserId),
    } as UserWhereInput;
  };

  const [queryWhere, setQueryWhere] = useState<UserWhereInput>(() =>
    getWhere(searchForm)
  );

  const { data, loading } = useUsersQuery({
    variables: {
      where: queryWhere,
      skip: (currentPage - 1) * resultsPerPage,
      take: resultsPerPage,
      orderBy: [{ createdAt: SortOrder.Desc }],
    },
  });

  const getTotalPages = () => {
    if (data) {
      return data.count > 0 ? Math.ceil(data.count / resultsPerPage) : 1;
    }

    return 1;
  };

  const numberOfPages: number = getTotalPages();

  const handlePageChange = (pageNumber: any) => {
    router.push(`${baseUrl}?pagina=${pageNumber}&resultaten=${resultsPerPage}`);
  };

  const handleResultsPerPageChange = (resultsPerPage: any) => {
    router.push(`${baseUrl}?pagina=1&resultaten=${resultsPerPage}`);
  };

  const baseListItem: BaseListItem = {
    headers: [
      t('global.users'),
      t('global.company'),
      t('global.companyType'),
      t('global.contract'),
      t('global.registrationDate'),
    ],
    rows:
      data?.users?.map((user) => {
        return {
          url: `${baseUrl}/${user?.id}`,
          columns: [
            {
              type: 'icon',
              text:
                ((user?.firstName || user?.lastName) &&
                  `${user?.firstName} ${user?.lastName}`) ??
                user?.email,
              subText: user?.email,
              label:
                currentUser?.email === user?.email && t('global.currentUser'),
              imageUrl: getImageUrl(
                user?.profilePhoto?.container,
                user?.profilePhoto?.blobName
              ),
            },
            {
              type: 'default',
              text: user?.userCompanies
                ?.map((userCompany) => userCompany?.company?.name)
                .join(', '),
            },
            {
              type: 'default',
              text: user?.userCompanies
                ?.map((userCompany) =>
                  t(`company.type.${userCompany.company.type}`)
                )
                .join(', '),
            },
            {
              type: 'default',
              ellipsis: true,
              text: user?.userCompanies?.map((userCompany) =>
                renderContracts(userCompany.company as Company, t)
              ),
            },
            {
              type: 'date',
              text: user?.createdAt || '1970-01-01T00:00:00.000Z',
            },
          ],
        } as BaseListRow;
      }) ?? [],
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set page to 1
    router.push(`${baseUrl}?pagina=1&resultaten=${resultsPerPage}`);

    // Set filters and trigger query
    setQueryWhere(getWhere(searchForm));
  };

  const handleFormReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set page to 1
    router.push(`${baseUrl}?pagina=1&resultaten=${resultsPerPage}`);

    // Reset form data
    const newSearchForm = resetSearchForm();

    // Set filters and trigger query
    setQueryWhere(getWhere(newSearchForm));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchForm((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <BaseToolbarSub
          title={t('global.users')}
          subtitle={t('global.resultsCount', { count: data?.count ?? 0 })}
        >
          <BaseButton type="reset" theme="secondary">
            <span>{t('admin.users.search.reset')}</span>
          </BaseButton>
          <BaseButton type="submit">
            <IconSearch className="hidden sm:flex" />
            <span>{t('admin.users.search.search')}</span>
          </BaseButton>
        </BaseToolbarSub>

        {toaster && (
          <BaseToaster theme="success">{t(`toaster.${toaster}`)}</BaseToaster>
        )}

        <div className="grid gap-8 border-b border-neutral-100 bg-white">
          <div className="grid gap-6 p-10 xl:grid-cols-4">
            <div className="grid gap-2">
              <BaseInput
                label={t('admin.users.search.name.label')}
                placeholder={t('admin.users.search.name.placeholder')}
                name="searchName"
                value={searchForm.searchName}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <BaseInput
                label={t('admin.users.search.email.label')}
                placeholder={t('admin.users.search.email.placeholder')}
                name="searchEmail"
                value={searchForm.searchEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <BaseInput
                label={t('admin.users.search.phoneNumber.label')}
                placeholder={t('admin.users.search.phoneNumber.placeholder')}
                name="searchPhoneNumber"
                value={searchForm.searchPhoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <BaseInput
                label={t('admin.users.search.userId.label')}
                placeholder={t('admin.users.search.userId.placeholder')}
                name="searchUserId"
                value={searchForm.searchUserId}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </form>

      <div className="max-w-[100vw] grow overflow-x-auto">
        <BaseList loading={loading} baseListItem={baseListItem} />
      </div>
      {!loading && (
        <section className="px-5 py-8 lg:p-10">
          <div className="flex w-full items-center justify-between">
            <BasePagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              resultsPerPage={resultsPerPage}
              onPageChange={handlePageChange}
              onResultsPerPageChange={handleResultsPerPageChange}
            />
          </div>
        </section>
      )}
    </>
  );
}
