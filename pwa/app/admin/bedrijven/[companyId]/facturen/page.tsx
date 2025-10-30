'use client';
import React, { useContext } from 'react';
import { SelectedCompanyLayoutContext } from '../layout';
import { useInvoicesAdminQuery } from '@/graphql/queries/invoices/invoicesAdmin.generated';
import InvoicesPage from '@/app/_components/company/InvoicesPage';

export default function Page() {
  const { selectedCompany } = useContext(SelectedCompanyLayoutContext);
  const baseUrl = `/admin/bedrijven/${selectedCompany?.id}/facturen`;

  const { data } = useInvoicesAdminQuery({
    variables: {
      companyId: Number(selectedCompany?.id),
    },
  });

  return <InvoicesPage data={data} baseUrl={baseUrl} />;
}
