'use client';
import React from 'react';
import { useInvoicesQuery } from '@/graphql/queries/invoices/invoices.generated';
import InvoicesPage from '@/app/_components/company/InvoicesPage';

export default function Page() {
  const baseUrl = '/account/mijn-producten/facturen';
  const { data } = useInvoicesQuery();

  return <InvoicesPage data={data} baseUrl={baseUrl} />;
}
