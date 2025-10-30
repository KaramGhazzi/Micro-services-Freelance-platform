'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useEnvContext } from 'next-runtime-env';
import { ProductSlug } from '@package/types/dist/class-validator';
import ContractContext from '@/app/(dashboard)/_context/ContractContext';
import { useTopBoxCompaniesQuery } from '@/graphql/queries/contracts/topBoxCompanies.generated';
import { useCompaniesPublicdataQuery } from '@/graphql/queries/companies/getCompaniesPublicData.generated';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';

type PublicCompany = {
  id: string;
  name?: string | null;
  logoImageFile: {
    container: string;
    blobName: string;
  };
};

const TopBoxEmployers = () => {
  const { hasActiveContractSlugs } = useContext(ContractContext);
  const [topBoxCompanies, setTopBoxCompanies] = useState<number[]>([]);

  const [shuffledCompanyData, setShuffledCompanyData] = useState<any[]>([]);

  const t = useTranslations();
  const envContext = useEnvContext();
  const marketingUrl =
    envContext['NEXT_PUBLIC_MARKETING_SITE_COMPANY_PROFILE'] ??
    process?.env?.['NEXT_PUBLIC_MARKETING_SITE_COMPANY_PROFILE'];

  const { data: companyData } = useCompaniesPublicdataQuery({
    variables: { where: { id: { in: topBoxCompanies } } },
    skip:
      topBoxCompanies.length === 0 ||
      hasActiveContractSlugs([ProductSlug.TOP_BOX]),
  });

  const shuffleArray = (array: any) => {
    return array.slice().sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (!companyData?.companiesPublicData) {
      return;
    }
    const shuffledData = shuffleArray([...companyData.companiesPublicData]);
    setShuffledCompanyData(shuffledData);
  }, [companyData]);

  useTopBoxCompaniesQuery({
    onCompleted: (data) => {
      const companies: number[] = [];
      data.topBoxCompanies.map((topBoxCompany) => {
        companies.push(topBoxCompany.companyId);
      });

      if (companies.length === 0) {
        return;
      }
      setTopBoxCompanies(companies);
    },
    skip: hasActiveContractSlugs([ProductSlug.TOP_BOX]),
  });

  const createMarketingUrl = (id: string, name?: string | null) => {
    return marketingUrl + id + '_' + name?.split(' ').join('_');
  };

  const renderTopBoxEmployerItem = (company: PublicCompany) => {
    return (
      <a
        href={createMarketingUrl(company.id, company.name)}
        target="_blank"
        className="flex w-1/3 justify-center px-3"
        key={company.id}
      >
        <div className="relative aspect-square w-full">
          <img
            src={getImageUrl(
              company.logoImageFile?.container,
              company.logoImageFile?.blobName
            )}
            alt={`${t('global.ourTopEmployerLogo')} ${company.name}`}
            title={`${t('global.ourTopEmployerLogo')} ${company.name}`}
            className="absolute left-0 top-0 h-full w-full w-full object-contain object-center"
          />
        </div>
      </a>
    );
  };

  if (
    companyData === undefined ||
    companyData?.companiesPublicData.length === 0 ||
    hasActiveContractSlugs([ProductSlug.TOP_BOX])
  ) {
    return <></>;
  }

  return (
    <article className="grid gap-6 border-b bg-white p-6">
      <h4 className="font-heading mb-4 text-center font-bold tracking-tight">
        {t('global.ourTopEmployers')}
      </h4>

      <div className="mx-auto flex w-full max-w-xs flex-wrap justify-center gap-y-4">
        {shuffledCompanyData?.map((item) => {
          return renderTopBoxEmployerItem(item as PublicCompany);
        })}
      </div>
    </article>
  );
};

export default TopBoxEmployers;
