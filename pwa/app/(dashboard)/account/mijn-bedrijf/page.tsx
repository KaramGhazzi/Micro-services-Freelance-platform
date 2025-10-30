'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { CompanyType } from '@/graphql/types';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import { basicMyCompanyToolbarTabs } from '@/app/(dashboard)/_data/companyToolbarTabs';
import CompanySettings from '@/app/_components/company/CompanySettings';
import BillingInformation from '@/app/_components/company/BillingInformation';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Page() {
  const t = useTranslations();
  const { currentCompany, refetchMe } = useAuth();

  const filteredTabs = basicMyCompanyToolbarTabs.filter((tab) => {
    if (currentCompany?.type === CompanyType.Freelancer) {
      return tab.name !== t('navigation.company-profile');
    }

    return true;
  });

  useEffect(() => {
    refetchMe();
  }, []);

  return (
    <section className="flex-grow border-neutral-100 bg-white xl:border-r">
      <BaseToolbarSub
        title={t('account.myCompany')}
        subtitle={t('account.editText')}
        tabs={filteredTabs}
      />

      <CompanySettings />
      <BillingInformation />
    </section>
  );
}
