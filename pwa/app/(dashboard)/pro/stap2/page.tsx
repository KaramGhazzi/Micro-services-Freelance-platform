'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import BillingForm from '../../opdracht-plaatsen/nieuwe-opdracht/top/stap2/_components/BillingForm';
import BaseToolbar from '@/app/_components/toolbar/BaseToolbar';
import { useCheckoutCreateMutation } from '@/graphql/mutations/checkout/createCheckout.generated';
import { useAuth } from '@/app/_hooks/useAuth';
import useMountOnce from '@/app/_libs/useMountOnce';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';

export default function Step2() {
  const t = useTranslations('upgrade');
  const { googleAnalyticsEvent } = useEventTracker();
  const [createCheckout] = useCheckoutCreateMutation();
  const searchParams = useSearchParams();
  const { currentCompanyId } = useAuth();
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProSubscriptionToCompany();
  };

  useMountOnce(() => {
    const planId = searchParams.get('planId');

    googleAnalyticsEvent({ ecommerce: null });
    googleAnalyticsEvent({
      event: EventName.BEGIN_CHECKOUT,
      ecommerce: {
        items: [
          {
            item_id: 'prod_QEicjGOUX2OqZZ',
            item_variant: planId,
            quantity: 1,
          },
        ],
      },
    });
  });

  const addProSubscriptionToCompany = async () => {
    const planId = searchParams.get('planId');

    if (planId === null || currentCompanyId === undefined) {
      return;
    }

    googleAnalyticsEvent({ ecommerce: null });
    googleAnalyticsEvent({
      event: EventName.BEGIN_PAYMENT,
      ecommerce: {
        items: [
          {
            item_id: 'prod_QEicjGOUX2OqZZ',
            item_variant: planId,
            quantity: 1,
          },
        ],
      },
    });

    try {
      const { data } = await createCheckout({
        variables: {
          data: {
            planId: parseInt(planId),
            companyId: Number(currentCompanyId),
          },
        },
      });

      if (data?.checkoutCreate?.session?.url) {
        window.location.href = data?.checkoutCreate?.session?.url;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <BaseToolbar title={t('pro.title')} subtitle={t('pro.subtitle')} />
      <BillingForm handleSubmitSuccess={handleFormSubmit} backHref="/pro" />
    </>
  );
}
