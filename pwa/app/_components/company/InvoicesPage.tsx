'use client';
import { useTranslations, useFormatter } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';
import IconDocumentText from '@/app/_components/icons/IconDocumentText';
import BaseIconButton from '@/app/_components/BaseIconButton';
import WithGuard from '@/app/_components/WithGuard';
import IconArrowDownIn from '@/app/_components/icons/IconArrowDownIn';
import BasePagination from '@/app/_components/BasePagination';
import BaseAlert from '@/app/_components/BaseAlert';
import { InvoicesQuery } from '@/graphql/queries/invoices/invoices.generated';

type InvoicesPageProps = {
  data?: InvoicesQuery;
  baseUrl: string;
};

export default function InvoicesPage({ data, baseUrl }: InvoicesPageProps) {
  const router = useRouter();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const format = useFormatter();

  const currentPage: number = Number(searchParams.get('pagina')) || 1;
  const resultsPerPage: number = Number(searchParams.get('resultaten')) || 20;

  const getTotalPages = () => {
    // TODO: implement pagination in stripe
    return 1;
  };

  const numberOfPages: number = getTotalPages();

  const handlePageChange = (pageNumber: any) => {
    router.push(`${baseUrl}?pagina=${pageNumber}&resultaten=${resultsPerPage}`);
  };

  const handleResultsPerPageChange = (resultsPerPage: any) => {
    router.push(`${baseUrl}?pagina=1&resultaten=${resultsPerPage}`);
  };

  const renderInvoiceTitle = (invoice: any) => {
    return (
      <td
        key={`renderInvoiceTitle-${invoice.id}`}
        className="whitespace-nowrap py-4 pr-10 first-of-type:pl-4 md:pr-0 lg:first-of-type:pl-10"
      >
        <div className="flex">
          <div className="mr-1 shrink-0">
            <IconDocumentText className="text-neutral-900" />
          </div>
          <div className="grow-1">
            <div className="font-semibold text-neutral-900">
              {invoice?.name?.substring(0, 50)}
            </div>
            <span className="text-neutral-700">{invoice?.subscription}</span>
          </div>
        </div>
      </td>
    );
  };

  const renderInvoicePrice = (invoice: any) => {
    return (
      <td
        key={`renderInvoicePrice-${invoice.id}`}
        className="whitespace-nowrap px-2 py-4 lg:px-0"
      >
        <div>
          {t('account.myInvoices.invoicePrices.excl', {
            price: format.number(invoice?.priceExVat / 100, {
              style: 'currency',
              currency: 'EUR',
            }),
          })}
        </div>
        <div>
          {t('account.myInvoices.invoicePrices.incl', {
            price: format.number(invoice?.priceInclVat / 100, {
              style: 'currency',
              currency: 'EUR',
            }),
          })}
        </div>
      </td>
    );
  };

  const renderInvoiceActions = (invoice: any) => {
    return (
      <td
        key={`renderInvoiceActions-${invoice.id}`}
        className="whitespace-nowrap px-2 py-4 lg:px-0"
      >
        <BaseIconButton
          href={invoice?.downloadLink}
          type="button"
          theme="secondary"
          icon={<IconArrowDownIn />}
          download={true}
        ></BaseIconButton>
      </td>
    );
  };

  const baseListItem: BaseListItem = {
    headers: [
      t('account.myInvoices.table.head.title'),
      t('account.myInvoices.table.head.status'),
      t('account.myInvoices.table.head.invoiceDate'),
      t('account.myInvoices.table.head.amount'),
      '',
    ],
    rows:
      data?.invoices?.map((invoice) => {
        return {
          columns: [
            {
              type: 'customColumn',
              children: renderInvoiceTitle(invoice),
            },
            {
              type: 'status',
              text: t(
                `account.myInvoices.invoiceStatusOptions.${invoice?.status}`
              ),
              status: invoice?.status,
            },
            {
              type: 'date',
              text: invoice?.date,
            },
            {
              type: 'customColumn',
              children: renderInvoicePrice(invoice),
            },
            {
              type: 'customColumn',
              children: renderInvoiceActions(invoice),
            },
          ],
        } as BaseListRow;
      }) ?? [],
  };

  return (
    <WithGuard permissions={['invoice:get-collection']}>
      <div className="flex-grow border-neutral-100 bg-white p-4 px-5 lg:px-10 xl:border-r">
        <BaseAlert
          title={t('global.invoicesNotAvailableTitle')}
          text={t('global.providerUnavailableText')}
          theme="warning"
        />
      </div>

      <div className="h-full max-w-[100vw] overflow-auto">
        <BaseList baseListItem={baseListItem} />
      </div>
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
    </WithGuard>
  );
}
