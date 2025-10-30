'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Countries, FirstDisplayedCountries } from '@package/types';
import BasePagination from '@/app/_components/BasePagination';
import BaseToaster from '@/app/_components/BaseToaster';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';

import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';
import BaseButton from '@/app/_components/BaseButton';
import IconSearch from '@/app/_components/icons/IconSearch';
import {
  Company,
  CompanyType,
  CompanyWhereInput,
  SortOrder,
} from '@/graphql/types';
import { useCompaniesQuery } from '@/graphql/queries/companies/companies.generated';
import BaseInput from '@/app/_components/BaseInput';
import BaseSelect from '@/app/_components/BaseSelect';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';
import {
  useFilterStorage,
  useFilterStorageAsState,
} from '@/app/_hooks/useFilterStorage';
import {
  enumFilter,
  numberFilter,
  stringFilter,
} from '@/app/_libs/createFilter';
import { renderContracts } from '@/app/_libs/renderContracts';

type SearchForm = {
  name: string;
  cocNumber: string; // COC numbers in other countries than NL can contain other characters than 0-9
  id: string;
  companyType: CompanyType | '';
  countryCode: Countries | '';
  onlyPaidContracts: boolean;
};

export default function Companies() {
  const baseUrl = '/admin/bedrijven';
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('');
  const countryNames = useTranslations('countries');
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
      name: '',
      cocNumber: '',
      id: '',
      companyType: '',
      countryCode: '',
      onlyPaidContracts: false,
    });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, checked, value } = e.target as HTMLInputElement;
    setSearchForm((prevFormData: SearchForm) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const getWhere = (f: SearchForm) => {
    const where: CompanyWhereInput = {
      id: numberFilter(f.id),
      cocNumber: stringFilter(f.cocNumber),
      name: stringFilter(f.name),
      type: enumFilter(f.companyType),
      address: stringFilter(f.countryCode, true, {
        is: { countryCode: { equals: f.countryCode } },
      }),
    };

    return where;
  };

  const [where, setWhere] = useState<CompanyWhereInput>(getWhere(searchForm));

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`${baseUrl}?pagina=1&resultaten=${resultsPerPage}`);

    setWhere(getWhere(searchForm));
  };

  const handleFormReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`${baseUrl}?pagina=1&resultaten=${resultsPerPage}`);

    const newSearchForm = resetSearchForm();

    setWhere(getWhere(newSearchForm));
  };

  const { data, loading } = useCompaniesQuery({
    variables: {
      where,
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
      t('global.companies'),
      t('admin.companies.search.companyType.label'),
      t('global.cocNumber'),
      t('global.registrationDate'),
      t('global.contract'),
    ],
    rows:
      data?.companies?.map((company) => {
        return {
          url: `${baseUrl}/${company?.id}`,
          columns: [
            {
              type: 'icon',
              text: company.name,
              subText: `${company?.address?.addressLine1}, ${company?.address?.postalCode} ${company?.address?.city}`,
              imageUrl: getImageUrl(
                company?.logoImageFile?.container,
                company?.logoImageFile?.blobName
              ),
            },
            {
              type: 'default',
              text: t('company.type.' + company?.type),
            },
            {
              type: 'default',
              text: company?.cocNumber,
            },
            {
              type: 'date',
              text: company?.createdAt || '1970-01-01T00:00:00.000Z',
            },
            {
              type: 'contract',
              text: renderContracts(company as Company, t),
            },
          ],
        } as BaseListRow;
      }) ?? [],
  };

  return (
    <div className="flex grow flex-col">
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <BaseToolbarSub
          title={t('global.companies')}
          subtitle={t('global.resultsCount', {
            count: data?.count ?? 0,
          })}
        >
          <BaseButton type="reset" theme="secondary">
            <span>{t('admin.companies.search.reset')}</span>
          </BaseButton>
          <BaseButton type="submit">
            <IconSearch className="hidden sm:flex" />
            <span>{t('admin.companies.search.search')}</span>
          </BaseButton>
        </BaseToolbarSub>
        <div className="grid gap-8 border-b border-neutral-100 bg-white">
          <div className="grid gap-6 p-10 xl:grid-cols-3">
            <BaseInput
              label={t('admin.companies.search.name.label')}
              placeholder={t('admin.companies.search.name.placeholder')}
              name="name"
              value={searchForm.name}
              onChange={handleInputChange}
            />
            <BaseInput
              label={t('admin.companies.search.coc.label')}
              placeholder={t('admin.companies.search.coc.placeholder')}
              name="cocNumber"
              value={searchForm.cocNumber}
              onChange={handleInputChange}
            />
            <BaseInput
              label={t('admin.companies.search.id.label')}
              placeholder={t('admin.companies.search.id.placeholder')}
              name="id"
              value={searchForm.id}
              onChange={handleInputChange}
            />
            <BaseSelect
              value={searchForm.countryCode}
              onChange={handleInputChange}
              name="countryCode"
              label={t('admin.companies.search.country.label')}
              placeholder={t('admin.companies.search.country.placeholder')}
            >
              {Object.keys(FirstDisplayedCountries).map((country) => (
                <option key={country} value={country}>
                  {countryNames(country)}
                </option>
              ))}
              {Object.keys(Countries).map((country) => (
                <option key={country} value={country}>
                  {countryNames(country)}
                </option>
              ))}
            </BaseSelect>
            <BaseSelect
              value={searchForm.companyType}
              onChange={handleInputChange}
              name="companyType"
              label={t('admin.companies.search.companyType.label')}
              placeholder={t('admin.companies.search.companyType.placeholder')}
            >
              <option value={CompanyType.Client}>
                {t('company.type.CLIENT')}
              </option>
              <option value={CompanyType.Seconder}>
                {t('company.type.SECONDER')}
              </option>
              <option value={CompanyType.Freelancer}>
                {t('company.type.FREELANCER')}
              </option>
              <option value={CompanyType.Intermediar}>
                {t('company.type.INTERMEDIAR')}
              </option>
              <option value={CompanyType.Unknown}>
                {t('company.type.UNKNOWN')}
              </option>
            </BaseSelect>
            <div className="grid gap-2">
              <div className="text-sm font-medium text-neutral-700">
                {t('admin.companies.search.onlyPaidContracts.label')}
              </div>
              <BaseCheckbox
                label={t(
                  'admin.companies.search.onlyPaidContracts.checkboxLabel'
                )}
                name="onlyPaidContracts"
                checked={searchForm.onlyPaidContracts ?? false}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </form>
      {toaster && (
        <BaseToaster theme="success">{t(`toaster.${toaster}`)}</BaseToaster>
      )}

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
    </div>
  );
}
