'use client';
import { useTranslations, useFormatter } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useRemainingUsageByProductSlugQuery } from '@/graphql/queries/usage/remainingUsageByProductSlug.generated';
import BaseInput from '@/app/_components/BaseInput';
import BaseButton from '@/app/_components/BaseButton';
import BaseToolbar from '@/app/_components/toolbar/BaseToolbar';
import { usePlansQuery } from '@/graphql/queries/plans/plans.generated';
import AssignmentFormPage from '@/app/_components/assignment/AssignmentFormPage';
import { AssignmentType, ProductSlug } from '@/graphql/types';
import { AssignmentFormHelpAside } from '@/app/_components/assignment/AssignmentFormHelpAside';
import TopBoxEmployers from '@/app/_components/TopBoxEmployers';
import useMountOnce from '@/app/_libs/useMountOnce';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';

export type AssigmentPricingMapping = {
  min: number;
  max?: number;
  price: number;
};

export default function NewAssignment() {
  const t = useTranslations('assignment');
  const f = useFormatter();
  const router = useRouter();
  const { googleAnalyticsEvent } = useEventTracker();

  const [assignmentsPricingMappings, setAssignmentsPricingMappings] = useState<
    AssigmentPricingMapping[]
  >([]);

  const { data: plansData } = usePlansQuery({
    variables: {
      where: {
        slug: {
          startsWith: 'top-assignment-',
        },
      },
    },
  });

  const { data: remainingUsage, loading: remainingUsageLoading } =
    useRemainingUsageByProductSlugQuery({
      variables: {
        productSlug: ProductSlug.CompanyTop,
      },
    });

  const [amount, setAmount] = useState<number>(1);
  const [priceInfo, setPriceInfo] = useState({
    price: 0,
    vat: 0,
    totalPrice: 0,
  });

  const isAmountGreaterThan10 = amount > 10;

  const calculatePricingTable = () => {
    const newAssigmentPricingMappings: AssigmentPricingMapping[] = [];

    // Sort plans by amount
    const sortedPlans = [...(plansData?.plans ?? [])]?.sort((a, b) => {
      const aAmount = Number(a?.usageAmount);
      const bAmount = Number(b?.usageAmount);

      return aAmount - bAmount;
    });

    // Group plans by amount for pricing table
    sortedPlans?.forEach((plan) => {
      const amount = Number(plan?.usageAmount);
      if (isNaN(amount)) {
        return;
      }

      // Grab the latest mapping
      const latestMapping =
        newAssigmentPricingMappings[newAssigmentPricingMappings.length - 1];

      // If the latest mapping has a different price, add a new mapping
      if (latestMapping?.price !== plan.price?.unit_amount) {
        newAssigmentPricingMappings.push({
          min: amount,
          price: plan.price?.unit_amount ?? 0,
        });
      } else {
        // If the latest mapping has the same price, update the max amount
        latestMapping.max = amount;
      }
    });

    setAssignmentsPricingMappings(newAssigmentPricingMappings);
  };

  const calculatePrice = (amount: any) => {
    // Find the plan based on slug
    const priceObj = plansData?.plans?.find(
      (plan) => plan.usageAmount === amount
    );
    if (priceObj) {
      const price = priceObj.price?.unit_amount ?? 0;
      const total = price * amount;
      const vat = total * 0.21;
      const totalPrice = total + vat;
      return {
        price: price / 100,
        vat: vat / 100,
        totalPrice: totalPrice / 100,
      };
    }
    return { price: 0, vat: 0, totalPrice: 0 };
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      const intValue = parseInt(value, 10);
      setAmount(isNaN(intValue) ? 0 : intValue);
    }
  };

  useMountOnce(() => {
    googleAnalyticsEvent({ ecommerce: null });
    googleAnalyticsEvent({
      event: EventName.VIEW_ITEM,
      ecommerce: {
        value: 249,
        items: [
          {
            item_name: `${t('top.title')}`,
            price: 249,
            quantity: 1,
          },
        ],
      },
    });
  });

  useEffect(() => {
    calculatePriceInfo();
  }, [amount]);

  const calculatePriceInfo = () => {
    const { price, vat, totalPrice } = calculatePrice(amount);
    setPriceInfo({ price, vat, totalPrice });
  };

  useEffect(() => {
    if (!plansData) return;
    // Recalculate pricing table when plansData changes
    calculatePricingTable();
    // Recalculate price when plansData changes
    calculatePriceInfo();
  }, [plansData]);

  if (remainingUsageLoading) {
    return <></>;
  }

  if (
    remainingUsage?.remainingUsageByProductSlug?.amount &&
    remainingUsage?.remainingUsageByProductSlug?.amount > 0
  ) {
    return (
      <AssignmentFormPage
        assignmentType={AssignmentType.Top}
        asideComponent={
          <>
            <AssignmentFormHelpAside />
            <TopBoxEmployers />
          </>
        }
        isNewAssignment
      />
    );
  }

  return (
    <>
      <BaseToolbar
        title={t('toolbar.topAssignment')}
        overtitle={t('toolbar.newAssignment')}
        backHref="/opdracht-plaatsen/nieuwe-opdracht"
      />
      <div className="flex-grow xl:flex">
        <div className="flex-grow border-neutral-100 bg-white p-5 lg:p-10 xl:border-r">
          <div className="grid max-w-4xl gap-6">
            <h2 className="font-heading font-semibold tracking-tight text-neutral-900">
              {t('topAssignment.explanation')}
            </h2>
            <p className="text-sm text-neutral-700">
              {t('topAssignment.description')
                .split('\n')
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
            </p>

            <section className="flex items-end gap-3">
              <div className="w-40">
                <BaseInput
                  label={t('topAssignment.amount')}
                  placeholder="5"
                  name="amount"
                  value={amount}
                  onChange={handleInputChange}
                  type="number"
                  required
                />
              </div>

              {!isAmountGreaterThan10 && (
                <BaseButton
                  href={`/opdracht-plaatsen/nieuwe-opdracht/top/stap2?amount=${amount}`}
                  onClick={() => {
                    googleAnalyticsEvent({ ecommerce: null });
                    googleAnalyticsEvent({
                      event: EventName.ADD_TO_CART,
                      ecommerce: {
                        value: priceInfo.totalPrice,
                        items: [
                          {
                            item_id: 'prod_QHLNROqphlCIo1',
                            item_name: `${t('top.title')}`,
                            price: priceInfo.price,
                            quantity: amount,
                          },
                        ],
                      },
                    });
                    router.push(
                      `/opdracht-plaatsen/nieuwe-opdracht/top/stap2?amount=${amount}`
                    );
                  }}
                  disabled={amount < 1 || amount > 10}
                >
                  {t('topAssignment.next')}
                </BaseButton>
              )}
              {isAmountGreaterThan10 && (
                <BaseButton
                  href={'/offerte-aanvragen'}
                  type="submit"
                  theme="secondary"
                >
                  {t('topAssignment.contact')}
                </BaseButton>
              )}
            </section>
            <div>
              <AnimatePresence initial={false}>
                {!isAmountGreaterThan10 && (
                  <motion.div
                    initial={{ height: 0, opacity: 1 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ul className="divide-y divide-neutral-100 rounded-xl bg-neutral-50 text-sm">
                      <Row
                        title={t('topAssignment.assignmentsPerYearCount', {
                          count: amount,
                        })}
                        value={f.number(priceInfo.price, {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      />
                      <Row
                        title={t('topAssignment.vat')}
                        value={f.number(priceInfo.vat, {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      />
                      <Row
                        title={t('topAssignment.total')}
                        value={f.number(priceInfo.totalPrice, {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      />
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <aside className="w-full xl:max-w-sm 2xl:max-w-md">
          <section className="grid gap-6 border-b border-neutral-100 bg-white px-5 py-10 lg:p-10 lg:px-6">
            <dl className="text-sm">
              <header className="mb-2 grid grid-cols-2 gap-5 font-semibold">
                <div>{t('topAssignment.assignmentsPerYear')}</div>
                <div>{t('topAssignment.pricePerAssignment')}</div>
              </header>
              <ul className="divide-y divide-neutral-100 rounded-xl bg-neutral-50">
                {assignmentsPricingMappings.map((mapping, index) => {
                  const { min, max, price } = mapping;
                  let title = '';

                  if (max) {
                    title = `${min} ${t(
                      'topAssignment.table.linkingWord'
                    )} ${max} ${t('topAssignment.table.plural')}`;
                  } else {
                    title =
                      min +
                      ' ' +
                      t(
                        `topAssignment.table.${min > 1 ? 'plural' : 'singular'}`
                      );
                  }

                  return (
                    <Row
                      key={`assignment-price-mapping-${index}`}
                      title={title}
                      value={f.number(price / 100, {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    />
                  );
                })}

                <Row
                  title={t('topAssignment.table.latestRow.title')}
                  value={t('topAssignment.table.latestRow.value')}
                />
              </ul>
            </dl>
          </section>
        </aside>
      </div>
    </>
  );
}

const Row: React.FC<{ title: string; value: any }> = ({ title, value }) => {
  return (
    <li className="grid grid-cols-2 py-[10px]">
      <dt className="px-3 font-medium tabular-nums text-neutral-900">
        {title}
      </dt>
      <dd className="px-3 text-sm text-neutral-700">{value}</dd>
    </li>
  );
};
