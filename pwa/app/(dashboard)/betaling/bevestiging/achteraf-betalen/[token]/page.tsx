'use client';
import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Message from '../../../_components/Message';
import BaseToolbar from '@/app/_components/toolbar/BaseToolbar';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';
import ContactSidebar from '@/app/(dashboard)/betaling/bevestiging/_components/ContactSidebar';
import { useCheckoutInvoiceQuery } from '@/graphql/queries/checkout-invoice/checkout-invoice.generated';

export default function Page({ params }: { params: { token: string } }) {
  const t = useTranslations();
  const { googleAnalyticsEvent } = useEventTracker();
  const prefix = 'top';

  const { data, error, loading } = useCheckoutInvoiceQuery({
    variables: {
      token: params.token,
    },
  });

  useEffect(() => {
    if (data?.checkoutInvoice) {
      const { currency, invoiceId, itemName, productId, quantity, tax, value } =
        data.checkoutInvoice;
      googleAnalyticsEvent({ ecommerce: null });
      googleAnalyticsEvent({
        event: EventName.PURCHASE,
        ecommerce: {
          transaction_id: invoiceId,
          value,
          tax,
          currency,
          items: {
            item_id: productId,
            item_name: itemName,
            quantity,
          },
        },
      });
    }
  }, [data]);

  if (error) return notFound();
  if (!data || loading) return null;

  return (
    <>
      <BaseToolbar
        title={t(`payments.${prefix}.title`)}
        subtitle={t(`payments.${prefix}.subtitle`)}
      />
      <div className="flex-grow xl:flex">
        <Message
          prefix={prefix}
          success={true}
          amount={data.checkoutInvoice.quantity}
        />

        <ContactSidebar />
      </div>
    </>
  );
}
