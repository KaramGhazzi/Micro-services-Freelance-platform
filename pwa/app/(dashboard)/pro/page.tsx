'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WithGuard from '../../_components/WithGuard';
import BaseToolbar from '@/app/_components/toolbar/BaseToolbar';
import { usePlansQuery } from '@/graphql/queries/plans/plans.generated';
import { CompanyType, RenewalInterval } from '@/graphql/types';
import { ProductSlug } from '@/graphql/types';
import ErrorNotFound from '@/app/_components/ErrorNotFound';
import BasePlanCard from '@/app/_components/BasePlanCard';
import BaseButton from '@/app/_components/BaseButton';
import { useAuth } from '@/app/_hooks/useAuth';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';

type ProSubscriptionPaymentOption = {
  interval: RenewalInterval;
  planId: number;
  price: number;
};

type Plan = {
  title: string;
  description: string;
  price: string | null;
  priceAddon?: string;
  items: string[];
  buttonHref?: string | null;
  active?: boolean;
  badge?: string;
};

let proSubscriptionPaymentOptions: ProSubscriptionPaymentOption[] = [];

export default function Pro() {
  const t = useTranslations('upgrade');
  const router = useRouter();
  const { googleAnalyticsEvent } = useEventTracker();
  const { currentCompany } = useAuth();

  const [plans, setPlans] = useState<Plan[]>([]);

  const { data: planData } = usePlansQuery({
    variables: {
      where: {
        product: {
          is: {
            slug: { equals: ProductSlug.FreelancerPro },
          },
        },
      },
    },
  });

  useEffect(() => {
    if (!planData) {
      return;
    }

    planData.plans.forEach((plan) => {
      proSubscriptionPaymentOptions.push({
        interval: plan.renewalInterval as RenewalInterval,
        planId: Number(plan.id),
        price: Number((plan.price?.unit_amount ?? 0) / 100),
      });
    });

    setPlans([
      {
        title: t('plan.free.title'),
        description: t('plan.free.description'),
        price: t('plan.free.price'),
        items: [t('plan.free.usp1'), t('plan.free.usp2')],
        active: true,
      },
      {
        title: t('plan.year.title'),
        description: t('plan.year.description'),
        price: renderPrice(RenewalInterval.Year),
        priceAddon: t('plan.year.priceAddon'),
        items: [t('plan.year.usp1'), t('plan.year.usp2')],
        buttonHref: getButtonHref(RenewalInterval.Year),
        badge: t('plan.year.badge'),
      },
      {
        title: t('plan.quarter.title'),
        description: t('plan.quarter.description'),
        price: renderPrice(RenewalInterval.Quarter),
        priceAddon: t('plan.quarter.priceAddon'),
        items: [t('plan.quarter.usp1'), t('plan.quarter.usp2')],
        buttonHref: getButtonHref(RenewalInterval.Quarter),
      },
    ]);

    googleAnalyticsEvent({ ecommerce: null });
    googleAnalyticsEvent({
      event: EventName.VIEW_ITEM_LIST,
      ecommerce: {
        item_list_name: 'Pro page',
        item_list_id: 'pro',
        items: [
          {
            item_name: `${t('plan.free.title')}`,
            price: 0,
          },
          {
            item_id: 'prod_QEicjGOUX2OqZZ',
            item_name: `${t('plan.year.title')}`,
            price: renderPrice(RenewalInterval.Year),
          },
          {
            item_id: 'prod_QEicjGOUX2OqZZ',
            item_name: `${t('plan.quarter.title')}`,
            price: renderPrice(RenewalInterval.Quarter),
          },
        ],
      },
    });
  }, [planData]);

  if (currentCompany?.type !== CompanyType.Freelancer) {
    return <ErrorNotFound />;
  }

  const renderPrice = (interval: RenewalInterval) => {
    const option = proSubscriptionPaymentOptions.find(
      (option) => option.interval === interval
    );

    if (option?.price) {
      return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(option.price);
    }

    return null;
  };

  const getButtonHref = (interval: RenewalInterval) => {
    const option = proSubscriptionPaymentOptions.find(
      (option) => option.interval === interval
    );

    if (option) {
      return `/pro/stap2?planId=${option?.planId}`;
    }

    return null;
  };
  return (
    <WithGuard permissions={['subscription:create']}>
      {currentCompany?.type === CompanyType.Freelancer && (
        <>
          <BaseToolbar
            title={t('pro.title')}
            subtitle={t('pro.subtitle')}
          ></BaseToolbar>
          <section className="grid w-full max-w-7xl gap-6 px-5 py-5 md:grid-cols-2 md:py-16 lg:px-10 xl:grid-cols-3">
            {plans.map((plan, index) => (
              <BasePlanCard
                key={`pro-plan-card-${index}`}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                priceAddon={plan.priceAddon}
                items={plan.items}
                active={plan.active}
                badge={plan.badge}
              >
                {plan.buttonHref && (
                  <BaseButton
                    wide
                    onClick={() => {
                      googleAnalyticsEvent({ ecommerce: null });
                      googleAnalyticsEvent({
                        event: EventName.SELECT_ITEM,
                        ecommerce: {
                          item_list_name: 'Pro page',
                          item_list_id: 'pro',
                          items: [
                            {
                              item_id: 'prod_QEicjGOUX2OqZZ',
                              item_name: `${plan.title}`,
                              price: `${plan.price}`,
                            },
                          ],
                        },
                      });
                      router.push(`${plan.buttonHref}`);
                    }}
                  >
                    {t('proceed')}
                  </BaseButton>
                )}
              </BasePlanCard>
            ))}
          </section>
        </>
      )}
    </WithGuard>
  );
}
