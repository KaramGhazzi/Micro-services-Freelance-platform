'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import BillingForm from './_components/BillingForm';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';
import useMountOnce from '@/app/_libs/useMountOnce';

export default function Step2() {
  const t = useTranslations();
  const router = useRouter();
  const { googleAnalyticsEvent } = useEventTracker();
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get('amount'));

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/opdracht-plaatsen/nieuwe-opdracht/top/stap3?amount=${amount}`
    );
  };

  useMountOnce(() => {
    googleAnalyticsEvent({ ecommerce: null });
    googleAnalyticsEvent({
      event: EventName.BEGIN_CHECKOUT,
      ecommerce: {
        value: '',
        items: [
          {
            item_id: 'prod_QHLNROqphlCIo1',
            item_name: `${t('assignment.top.title')}`,
            quantity: amount,
          },
        ],
      },
    });
  });

  if (!amount) {
    return router.push(`/opdracht-plaatsen/nieuwe-opdracht/top`);
  }

  return (
    <BillingForm
      handleSubmitSuccess={handleFormSubmit}
      backHref="/opdracht-plaatsen/nieuwe-opdracht/top"
    />
  );
}
