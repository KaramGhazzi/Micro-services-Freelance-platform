'use client';
import { useTranslations } from 'next-intl';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import { Company, ProductSlug } from '@/graphql/types';
import {
  CompanyDetailsQuery,
  useCompanyDetailsQuery,
} from '@/graphql/queries/companies/getCompanyDetails.generated';

export const SelectedCompanyLayoutContext = createContext<{
  selectedCompany: Company | undefined;
  refetch: () => void;
  hasValidContracts: boolean;
}>({
  selectedCompany: undefined,
  refetch: () => {},
  hasValidContracts: false,
});

interface SelectedCompanyLayoutContextProps {
  children?: React.ReactNode;
  params: { companyId: string };
}

const SelectedCompanyLayout = ({
  children,
  params,
}: SelectedCompanyLayoutContextProps) => {
  const t = useTranslations();
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>();
  const [hasValidContracts, setHasValidContracts] = useState(Boolean);

  const { data, loading, error, refetch } = useCompanyDetailsQuery({
    variables: {
      where: {
        id: {
          equals: parseInt(params.companyId),
        },
      },
    },
  });

  useEffect(() => {
    if (data?.company) {
      setSelectedCompany(data.company as Company);
    }

    if (data?.company.contracts) {
      const validContracts = checkValidContracts(data.company.contracts);
      setHasValidContracts(validContracts);
    }

    if (error) {
      console.error('Error fetching company:', error);
      router.push('/admin/bedrijven');
    }
  }, [data, error, router]);

  const checkValidContracts = (
    contracts: CompanyDetailsQuery['company']['contracts']
  ) => {
    const currentDate = new Date();
    return contracts?.some((contract) => {
      if (contract.plan.product.slug === ProductSlug.FreelancerPro) {
        const endDate = contract.endDate ? new Date(contract.endDate) : null;
        const startDate = new Date(contract.startDate);

        return endDate
          ? endDate > currentDate && startDate < currentDate
          : true;
      }

      return false;
    });
  };

  const selectedCompanyObject = useMemo(
    () => ({
      selectedCompany,
      refetch,
      hasValidContracts,
    }),
    [selectedCompany, refetch, hasValidContracts]
  );

  useEffect(() => {
    refetch();
  }, [selectedCompany?.type]);

  const adminCompaniesToolbarTabs = [
    {
      name: t('admin.companiesTabs.companyDetails'),
      href: `/admin/bedrijven/${selectedCompany?.id}`,
    },
    {
      name: t('admin.companiesTabs.users'),
      href: `/admin/bedrijven/${selectedCompany?.id}/gebruikers`,
    },
    {
      name: t('admin.companiesTabs.contracts'),
      href: `/admin/bedrijven/${selectedCompany?.id}/contracten`,
    },
    {
      name: t('admin.companiesTabs.invoices'),
      href: `/admin/bedrijven/${selectedCompany?.id}/facturen`,
    },
    {
      name: t('admin.companiesTabs.assignments'),
      href: `/admin/bedrijven/${selectedCompany?.id}/opdrachten`,
    },
    {
      name: t('admin.companiesTabs.sentReplies'),
      href: `/admin/bedrijven/${selectedCompany?.id}/verstuurde-reacties`,
    },
    {
      name: t('admin.companiesTabs.reviews'),
      href: `/admin/bedrijven/${selectedCompany?.id}/beoordelingen`,
    },
  ];

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <SelectedCompanyLayoutContext.Provider value={selectedCompanyObject}>
      {selectedCompany && (
        <div className="flex flex-grow flex-col">
          <BaseToolbarSub
            title={`${t('admin.companies.account')}: ${selectedCompany?.name}`}
            subtitle={t('admin.companies.editCompanyInformation')}
            tabs={adminCompaniesToolbarTabs}
            backHref={'/admin/bedrijven'}
          />
          {children}
        </div>
      )}
    </SelectedCompanyLayoutContext.Provider>
  );
};

export default SelectedCompanyLayout;
