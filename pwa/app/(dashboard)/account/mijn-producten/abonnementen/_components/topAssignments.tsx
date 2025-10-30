import React, { useEffect, useState } from 'react';
import { useTranslations, useFormatter } from 'next-intl';
import { ProductSlug } from '@/graphql/types';
import ProductCard from '@/app/(dashboard)/account/mijn-producten/abonnementen/_components/productCard';
import ProgressBar from '@/app/_components/BaseProgressBar';
import { usePlansQuery } from '@/graphql/queries/plans/plans.generated';
import { useAssignmentsRemainingUsageQuery } from '@/graphql/queries/usage/assignmentsRemainingUsage.generated';

interface Credit {
  usageType?: string;
  amount: number;
  refreshDate?: Date | string;
  contractAmount: number;
  productSlug?: string | null;
  contractStartDate?: Date | string;
  contractEndDate?: Date | string;
}

const TopAssignments = () => {
  const t = useTranslations();
  const format = useFormatter();
  const [hasActiveTop, setHasActiveTop] = useState(false);
  const { data: credits } = useAssignmentsRemainingUsageQuery();

  const { data: planData } = usePlansQuery({
    variables: {
      where: {
        product: {
          is: {
            slug: { equals: ProductSlug.CompanyTop },
          },
        },
      },
    },
  });

  const [contracts, setContracts] = useState<Credit[]>();

  useEffect(() => {
    if (!credits) return;

    setContracts(credits.assignmentsRemainingUsage as Credit[]);
  }, [credits]);

  useEffect(() => {
    const hasCompanyTopContract = contracts?.some(
      (contract) =>
        contract.productSlug === ProductSlug.CompanyTop && contract.amount !== 0
    );

    setHasActiveTop(hasCompanyTopContract as boolean);
  }, [contracts]);

  const dateFormatter = (date: Date | string): string => {
    return format.dateTime(new Date(date), {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const renderBasic = (contract: Credit): React.ReactNode => {
    return (
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-neutral-500">{t('global.startedOn')}</dt>
        <dd className="text-neutral-900">
          {(contract?.contractStartDate &&
            dateFormatter(contract?.contractStartDate)) ??
            '-'}
        </dd>

        <dt className="text-neutral-500">{t('global.expiresOn')}</dt>
        <dd className="text-neutral-900">{t('global.notApplicable')}</dd>
        <dt className="text-neutral-500">{t('global.price')}</dt>
        <dd className="text-neutral-900">{t('global.free')}</dd>
      </dl>
    );
  };

  const renderTop = (contract: Credit): React.ReactNode => {
    return (
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-neutral-500">{t('global.PurchasedOn')}</dt>
        <dd className="text-neutral-900">
          {(contract?.contractStartDate &&
            dateFormatter(contract?.contractStartDate)) ??
            '-'}
        </dd>

        <dt className="text-neutral-500">{t('global.validUntil')}</dt>
        <dd className="text-neutral-900">
          {(contract?.contractEndDate &&
            dateFormatter(contract?.contractEndDate)) ??
            '-'}
        </dd>
        <dt className="text-neutral-500">{t('global.pricePerAssignment')}</dt>
        <dd className="text-neutral-900">
          €{format.number((planData?.plans?.[0].price?.unit_amount ?? 0) / 100)}
        </dd>
      </dl>
    );
  };

  return (
    <>
      <div className="grid max-w-4xl gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
        <div className="col-span-1 grid h-fit gap-1">
          <div>
            <h1 className="font-semibold text-neutral-900">
              {t('global.assignments')}
            </h1>
          </div>
        </div>
      </div>

      <section className="grid w-full max-w-6xl gap-6 py-5 md:grid-cols-2 xl:grid-cols-3">
        {contracts?.map((contract) => {
          const slug = contract.productSlug;
          const expired = contract?.contractEndDate
            ? new Date(contract?.contractEndDate as string) < new Date()
            : false;
          const inactive =
            slug === ProductSlug.CompanyTop
              ? contract.amount === 0 || expired
              : hasActiveTop || contract.amount === 0 || expired;

          if (slug === ProductSlug.CompanyPremiumAssignment) return;

          return (
            <ProductCard
              key={slug}
              title={t(
                `global.${
                  slug === ProductSlug.CompanyTop ? 'topAssignments' : 'basic'
                }`
              )}
              description={t(
                `account.my-products.topAssignments.${
                  slug === ProductSlug.CompanyTop
                    ? 'topDescription'
                    : 'basicDescription'
                }`
              )}
              isActive={!inactive}
              disabled={inactive}
            >
              {slug === ProductSlug.CompanyTop
                ? renderTop(contract)
                : renderBasic(contract)}
              <div>
                <div className="mb-2 text-sm">
                  <span className="font-medium text-neutral-900">
                    {`${contract.contractAmount - contract.amount} ${t(
                      'account.my-products.topAssignments.from'
                    )} ${contract.contractAmount} `}
                  </span>
                  <span className="font-medium text-neutral-500">
                    {t('account.my-products.topAssignments.creditsUsed')}
                  </span>
                </div>
                <ProgressBar
                  currentValue={contract.contractAmount - contract.amount}
                  maxValue={contract.contractAmount}
                />
              </div>
            </ProductCard>
          );
        })}
      </section>
    </>
  );
};

export default TopAssignments;
