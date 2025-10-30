'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import BasePlanCard from '@/app/_components/BasePlanCard';
import BaseButton from '@/app/_components/BaseButton';
import { useRemainingUsageByProductSlugQuery } from '@/graphql/queries/usage/remainingUsageByProductSlug.generated';
import { ProductSlug } from '@/graphql/types';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';
import useMountOnce from '@/app/_libs/useMountOnce';

export default function NewAssignment() {
  const t = useTranslations();
  const router = useRouter();
  const { googleAnalyticsEvent } = useEventTracker();

  const [basicButtonDisabled, setBasicButtonDisabled] = useState<boolean>(true);
  const { data: basicCreditData } = useRemainingUsageByProductSlugQuery({
    variables: { productSlug: ProductSlug.CompanyBasic },
  });

  const {
    data: remainingAssignmentUsage,
    loading: remainingAssignmentUsageLoading,
  } = useRemainingUsageByProductSlugQuery({
    variables: {
      productSlug: ProductSlug.CompanyTop,
    },
  });

  useMountOnce(() => {
    googleAnalyticsEvent({ ecommerce: null });
    googleAnalyticsEvent({
      event: EventName.VIEW_ITEM_LIST,
      ecommerce: {
        item_list_name: 'Nieuwe opdracht',
        item_list_id: 'nieuwe-opdracht',
        items: [
          {
            item_name: `${t('assignment.basic.title')}`,
            price: 0,
          },
          {
            item_id: 'prod_QHLNROqphlCIo1',
            item_name: `${t('assignment.top.title')}`,
            price: 139,
          },
          {
            item_name: `${t('assignment.topSubscription.title')}`,
          },
        ],
      },
    });
  });

  useEffect(() => {
    if (
      basicCreditData?.remainingUsageByProductSlug?.amount &&
      basicCreditData.remainingUsageByProductSlug.amount > 0
    ) {
      setBasicButtonDisabled(false);
    }
  }, [basicCreditData]);

  useEffect(() => {
    if (
      remainingAssignmentUsage?.remainingUsageByProductSlug?.amount &&
      remainingAssignmentUsage?.remainingUsageByProductSlug?.amount > 0
    ) {
      router.push('/opdracht-plaatsen/nieuwe-opdracht/top');
    }
  }, [remainingAssignmentUsage]);

  if (remainingAssignmentUsageLoading) return <></>;

  return (
    remainingAssignmentUsage?.remainingUsageByProductSlug?.amount === 0 && (
      <>
        <BaseToolbarSub
          title={t('assignment.toolbar.newAssignment')}
          subtitle={t('assignment.toolbar.chooseType')}
        />
        <section className="grid w-full max-w-7xl gap-6 px-5 py-5 md:grid-cols-2 md:py-16 lg:px-10 xl:grid-cols-3">
          <BasePlanCard
            title={t('assignment.basic.title')}
            description={t('assignment.basic.description')}
            price={t('assignment.basic.free')}
            items={[t('assignment.basic.usp1'), t('assignment.basic.usp2')]}
          >
            <BaseButton
              wide
              onClick={() => {
                googleAnalyticsEvent({ ecommerce: null });
                googleAnalyticsEvent({
                  event: EventName.SELECT_ITEM,
                  ecommerce: {
                    item_list_name: 'Nieuwe opdracht',
                    item_list_id: 'nieuwe-opdracht',
                    items: [
                      {
                        item_name: `${t('assignment.basic.title')}`,
                        price: 0,
                      },
                    ],
                  },
                });
                router.push('/opdracht-plaatsen/nieuwe-opdracht/basic');
              }}
              disabled={basicButtonDisabled}
            >
              {t('assignment.basic.button')}
            </BaseButton>
          </BasePlanCard>
          <BasePlanCard
            title={t('assignment.top.title')}
            description={t('assignment.top.description')}
            price={'€ 139'}
            priceAddon={t('assignment.top.priceAddon')}
            items={[
              t('assignment.top.usp1'),
              t('assignment.top.usp2'),
              t('assignment.top.usp3'),
            ]}
            badge={t('global.mostChosen')}
          >
            <BaseButton
              wide
              onClick={() => {
                googleAnalyticsEvent({ ecommerce: null });
                googleAnalyticsEvent({
                  event: EventName.SELECT_ITEM,
                  ecommerce: {
                    item_list_name: 'Nieuwe opdracht',
                    item_list_id: 'nieuwe-opdracht',
                    items: [
                      {
                        item_name: `${t('assignment.top.title')}`,
                        price: 139,
                      },
                    ],
                  },
                });
                router.push('/opdracht-plaatsen/nieuwe-opdracht/top');
              }}
            >
              {t('assignment.top.button')}
            </BaseButton>
          </BasePlanCard>
          <BasePlanCard
            title={t('assignment.topSubscription.title')}
            description={t('assignment.topSubscription.description')}
            price={'Op aanvraag'}
            items={[
              t('assignment.topSubscription.usp1'),
              t('assignment.topSubscription.usp2'),
              t('assignment.topSubscription.usp3'),
              t('assignment.topSubscription.usp4'),
            ]}
          >
            <BaseButton
              wide
              onClick={() => {
                googleAnalyticsEvent({ ecommerce: null });
                googleAnalyticsEvent({
                  event: EventName.SELECT_ITEM,
                  ecommerce: {
                    item_list_name: 'Nieuwe opdracht',
                    item_list_id: 'nieuwe-opdracht',
                    items: [
                      {
                        item_name: `${t('assignment.topSubscription.title')}`,
                      },
                    ],
                  },
                });
                router.push('/offerte-aanvragen');
              }}
            >
              {t('assignment.topSubscription.button')}
            </BaseButton>
          </BasePlanCard>
        </section>
      </>
    )
  );
}
