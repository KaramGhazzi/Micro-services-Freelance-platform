'use client';
import React, { useContext } from 'react';
import { SelectedCompanyLayoutContext } from './layout';
import CompanySettings from '@/app/_components/company/CompanySettings';
import BillingInformation from '@/app/_components/company/BillingInformation';

export default function Page() {
  const { selectedCompany } = useContext(SelectedCompanyLayoutContext);

  return (
    <div className="bg-white">
      <CompanySettings companyOverride={selectedCompany} isAdmin />
      <BillingInformation companyOverride={selectedCompany} />
    </div>
  );
}
