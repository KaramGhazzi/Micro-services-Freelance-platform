'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import ContractContext from '../../../_context/ContractContext';
import Message from '../../_components/Message';
import { useCheckoutQuery } from '@/graphql/queries/checkout/checkout.generated';
import { ModeType } from '@/graphql/types';
import BaseToolbar from '@/app/_components/toolbar/BaseToolbar';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';
import { useAuth } from '@/app/_hooks/useAuth';
import ContactSidebar from '@/app/(dashboard)/betaling/bevestiging/_components/ContactSidebar';

export default function Page({ params }: { params: { token: string } }) {
  const t = useTranslations();
  const { googleAnalyticsEvent } = useEventTracker();
  const [prefix, setPrefix] = useState('pro');
  const { refetchMe } = useAuth();
  const { activeContractSlugs, refetchActiveContractSlugs } =
    useContext(ContractContext);

  const {
    data: checkoutData,
    refetch,
    stopPolling,
    error,
    loading,
  } = useCheckoutQuery({
    variables: {
      where: {
        token: {
          equals: params?.token,
        },
      },
    },
    pollInterval: 1000,
  });

  useEffect(() => {
    refetch();
  }, [params?.token]);

  useEffect(() => {
    if (checkoutData?.checkout) {
      refetchMe();
      setPrefix(
        checkoutData?.checkout?.plan?.product?.modeType === ModeType.Payment
          ? 'top'
          : 'pro'
      );
      refetchActiveContractSlugs();
    }
  }, [checkoutData]);

  useEffect(() => {
    if (activeContractSlugs?.length) {
      stopPolling();
    }
  }, [activeContractSlugs]);

  useEffect(() => {
    if (!loading && checkoutData?.checkout) {
      googleAnalyticsEvent({ ecommerce: null });
      googleAnalyticsEvent({
        event: EventName.PURCHASE,
        ecommerce: {
          transaction_id: checkoutData.checkout.session?.invoice,
          value: checkoutData.checkout.session?.amount_total,
          tax: checkoutData.checkout.session?.total_details?.amount_tax,
          currency: 'EUR',
          items: {
            item_id: checkoutData.checkout.plan?.product?.externalProviderId,
            item_name: checkoutData.checkout.plan?.product?.name,
            quantity: checkoutData.checkout.plan?.usageAmount,
          },
        },
      });
    }
  }, [loading, checkoutData]);

  if (error && !loading) {
    return notFound();
  }

  if (!checkoutData) {
    return null;
  }

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
          amount={checkoutData?.checkout?.plan?.usageAmount}
        />

        <ContactSidebar />
      </div>
    </>
  );
}
