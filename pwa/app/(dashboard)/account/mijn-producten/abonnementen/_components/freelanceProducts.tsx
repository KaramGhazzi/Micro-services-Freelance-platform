import React, { useContext, useEffect, useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ProductSlug as ProductSlugEnum } from '@package/types/dist/class-validator';
import { usePlansQuery } from '@/graphql/queries/plans/plans.generated';
import ProductCard from '@/app/(dashboard)/account/mijn-producten/abonnementen/_components/productCard';
import Modal from '@/app/_components/BaseDialog';
import BaseButton from '@/app/_components/BaseButton';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseRadio from '@/app/_components/BaseRadio';
import { useCancelSubscription } from '@/graphql/mutations/contract/cancelSubscription.generated';
import { useContractsQuery } from '@/graphql/queries/contracts/contracts.generated';
import {
  Contract,
  Plan,
  ProductSlug,
  RenewalInterval,
  UsageType,
} from '@/graphql/types';
import { useEnableSubscription } from '@/graphql/mutations/contract/enableSubscription.generated';
import ContractContext from '@/app/(dashboard)/_context/ContractContext';
import { useAuth } from '@/app/_hooks/useAuth';

enum ModalState {
  CancelSubscription,
  CancelSubscriptionConfirm,
  EnableSubscription,
  EnableSubscriptionConfirm,
}

const FreelanceProducts = () => {
  const t = useTranslations();
  const router = useRouter();
  const format = useFormatter();
  const [preferredSubscription, setPreferredSubscription] = useState(
    RenewalInterval.Year
  );
  const { currentCompany, isCompany } = useAuth();
  const { hasActiveContractSlugs } = useContext(ContractContext);
  const { data: contractsData, refetch } = useContractsQuery({
    variables: {
      where: {
        usageType: {
          equals: UsageType.AssignmentApplication,
        },
      },
    },
  });
  const { data: plansData } = usePlansQuery();
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [cancelSubscription] = useCancelSubscription();
  const [enableSubscription] = useEnableSubscription();
  const [contractId, setContractId] = useState<number | null>();
  const [basicContracts, setBasicContracts] = useState<Contract[]>();
  const [proContracts, setProContracts] = useState<Contract[]>();
  const [basicPlans, setBasicPlans] = useState<Plan[]>([]);
  const [proPlans, setProPlans] = useState<Plan[]>();

  const handleCancelSubscription = async (
    contractId: number | null | undefined
  ) => {
    if (contractId) {
      await cancelSubscription({
        variables: {
          contractId: contractId,
        },
      });
      refetch();
    }
    // Used to hide the cancel button after canceling the subscription
    setModalState(ModalState.CancelSubscriptionConfirm);
  };

  const handleReactiveSubscription = async (
    contractId: number | null | undefined
  ) => {
    if (contractId) {
      await enableSubscription({
        variables: {
          contractId: contractId,
        },
      });
      refetch();
    }

    setModalState(ModalState.EnableSubscriptionConfirm);
  };

  useEffect(() => {
    const basicContracts = contractsData?.contracts.filter(
      (contract) =>
        contract?.plan?.product?.slug === ProductSlug.FreelancerBasic
    ) as Contract[];

    const proContracts = contractsData?.contracts.filter(
      (contract) => contract?.plan?.product?.slug === ProductSlug.FreelancerPro
    ) as Contract[];

    setBasicContracts(basicContracts);
    setProContracts(proContracts);
  }, [contractsData]);

  useEffect(() => {
    const basicPlans = plansData?.plans.filter(
      (plan) => plan?.product?.slug === ProductSlug.FreelancerBasic
    ) as Plan[];

    const proPlans = plansData?.plans.filter(
      (plan) => plan?.product?.slug === ProductSlug.FreelancerPro
    ) as Plan[];

    setBasicPlans(basicPlans);
    setProPlans(proPlans);
  }, [plansData]);

  const upgradeToPro = (planId: number) => {
    return router.push(`/pro?planId=${planId}`);
  };

  const contractPrice = (contract: Contract) => {
    if (!contract.subscription) return 0;

    const priceInCents = contract.subscription?.items?.data.reduce(
      (acc, item) => acc + (item?.price?.unit_amount ?? 0),
      0
    );

    return priceInCents ? priceInCents / 100 : 0;
  };

  const matchingContract = (plan?: Plan) => {
    return (
      proContracts?.find(
        (contract) => Number(contract?.planId) === Number(plan?.id)
      ) ??
      basicContracts?.find(
        (contract) => Number(contract?.planId) === Number(plan?.id)
      ) ??
      null
    );
  };

  function renderUpgradeToPro() {
    if (currentCompany?.cocNumber) {
      return (
        <form>
          <div className="mb-8 grid gap-1">
            {proPlans?.map((plan: Plan) => {
              return (
                <BaseRadio
                  key={plan.id}
                  label={`${t(
                    plan.renewalInterval === RenewalInterval.Quarter
                      ? 'payments.pro.subscription-option.quarterly.label'
                      : 'payments.pro.subscription-option.annual.label'
                  )} (${format.number((plan?.price?.unit_amount || 0) / 100, {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                  )`}
                  name="quarterly"
                  checked={preferredSubscription === plan.renewalInterval}
                  onChange={() =>
                    setPreferredSubscription(
                      plan.renewalInterval as RenewalInterval
                    )
                  }
                />
              );
            })}
          </div>

          <BaseButton
            wide
            theme="primary"
            size="lg"
            onClick={() =>
              upgradeToPro(
                Number(
                  proPlans?.find(
                    (plan: Plan) =>
                      plan?.renewalInterval === preferredSubscription
                  )?.id
                )
              )
            }
          >
            {t('global.upgradeToPro')}
          </BaseButton>
        </form>
      );
    }
  }

  const renderBasic = (): React.ReactNode => {
    const basicPlan = basicPlans?.find(
      (plan) => plan?.product.slug === ProductSlug.FreelancerBasic
    );

    const contract = matchingContract(basicPlan);

    return (
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-neutral-500">{t('global.startedOn')}</dt>
        <dd className="text-neutral-900">
          {(contract?.startDate &&
            format.dateTime(new Date(contract?.startDate), {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })) ??
            '-'}
        </dd>

        <dt className="text-neutral-500">{t('global.price')}</dt>
        <dd className="text-neutral-900">{t('global.free')}</dd>

        <dt className="text-neutral-500">{t('global.expiresOn')}</dt>
        <dd className="text-neutral-900">{t('global.notApplicable')}</dd>
      </dl>
    );
  };

  function renderProContract(contract: Contract): React.ReactNode {
    if (contract?.plan?.product.slug === ProductSlug.FreelancerPro) {
      const isCancelled: boolean = contract?.endDate !== null;
      const endDate = isCancelled
        ? contract.endDate
        : contract.subscriptionExpireDate;

      return (
        <ProductCard
          key={contract.id}
          title={t('global.pro')}
          description={t('account.my-products.proDescription')}
          isActive={!!matchingContract(contract?.plan)}
        >
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-medium">
            <dt className="text-neutral-500">{t('global.startedOn')}</dt>
            <dd className="text-neutral-900">
              {format.dateTime(new Date(contract.startDate), {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </dd>

            <dt className="text-neutral-500">{t('global.price')}</dt>
            <dd className="text-neutral-900">
              {format.number(contractPrice(contract), {
                style: 'currency',
                currency: 'EUR',
              })}
            </dd>

            <dt className="text-neutral-500">{t('global.duration')}</dt>
            <dd className="text-neutral-900">
              {t(
                `global.${
                  contract.plan.slug === 'pro-search-1-year'
                    ? 'annual'
                    : 'quarterly'
                }`
              )}
            </dd>

            <dt className="text-neutral-500">
              {isCancelled ? t('global.expiredOn') : t('global.extendsOn')}
            </dt>
            <dd className="text-neutral-900">
              {format.dateTime(new Date(endDate), {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </dd>
          </dl>

          {!isCancelled ? (
            <BaseButton
              theme="secondary"
              onClick={() => {
                setModalState(ModalState.CancelSubscription);
                setContractId(Number(contract.id));
              }}
            >
              <span>{t('account.my-products.cancelSubscription')}</span>
            </BaseButton>
          ) : (
            <BaseButton
              theme="primary"
              onClick={() => {
                setModalState(ModalState.EnableSubscription);
                setContractId(Number(contract.id));
              }}
            >
              <span>{t('account.my-products.reactivateSubscription')}</span>
            </BaseButton>
          )}
        </ProductCard>
      );
    }
  }

  return (
    !isCompany && (
      <>
        <div className="grid max-w-4xl gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
          <div className="col-span-1 grid h-fit gap-1">
            <div>
              <h1 className="font-semibold text-neutral-900">
                {t('global.freelanceProducts')}
              </h1>
            </div>
          </div>
        </div>

        <section className="grid w-full max-w-6xl gap-6 py-5 md:grid-cols-2 xl:grid-cols-3">
          <ProductCard
            key="basic"
            title={t('global.basic')}
            description={t('account.my-products.basicDescription')}
            isActive={!hasActiveContractSlugs([ProductSlugEnum.FREELANCER_PRO])}
            disabled={hasActiveContractSlugs([ProductSlugEnum.FREELANCER_PRO])}
          >
            {renderBasic()}
          </ProductCard>
          {!hasActiveContractSlugs([ProductSlugEnum.FREELANCER_PRO]) ? (
            <ProductCard
              key="pro"
              title={t('global.pro')}
              description={t('account.my-products.proDescription')}
              isActive={false}
              disabled={false}
            >
              {renderUpgradeToPro()}
            </ProductCard>
          ) : (
            proContracts?.map((contract) => renderProContract(contract))
          )}
        </section>

        <Modal
          isOpen={modalState === ModalState.CancelSubscription}
          onClose={() => setModalState(null)}
          size="md"
          title={t('account.my-products.cancelSubscriptionModalTitle')}
          footer={
            <>
              <BaseButton
                onClick={() => setModalState(null)}
                theme="secondary"
                size="md"
              >
                {t('account.my-products.cancelSubscriptionModalReject')}
              </BaseButton>

              <BaseButton
                onClick={() => handleCancelSubscription(contractId)}
                size="md"
              >
                {t('account.my-products.cancelSubscriptionModalConfirm')}
              </BaseButton>
            </>
          }
        >
          <p className="text-neutral-500">
            {t('account.my-products.cancelSubscriptionModalText')}
          </p>
        </Modal>

        <Modal
          isOpen={modalState === ModalState.EnableSubscription}
          onClose={() => setModalState(null)}
          size="md"
          title={t('account.my-products.enableSubscriptionModalTitle')}
          footer={
            <>
              <BaseButton
                onClick={() => setModalState(null)}
                theme="secondary"
                size="md"
              >
                {t('account.my-products.enableSubscriptionModalReject')}
              </BaseButton>

              <BaseButton
                onClick={() => handleReactiveSubscription(contractId)}
                size="md"
              >
                {t('account.my-products.enableSubscriptionModalConfirm')}
              </BaseButton>
            </>
          }
        >
          <p className="text-neutral-500">
            {t('account.my-products.enableSubscriptionModalText')}
          </p>
        </Modal>

        <Modal
          isOpen={
            modalState === ModalState.CancelSubscriptionConfirm ||
            modalState === ModalState.EnableSubscriptionConfirm
          }
          onClose={() => setModalState(null)}
          size="md"
        >
          <div className="flex justify-center">
            <i className="bg-success-50 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
              <span className="bg-success-100 flex h-14 w-14 items-center justify-center rounded-full">
                <IconCheckmarkMd className="text-success-500 h-10 w-10" />
              </span>
            </i>
          </div>
          <div className="mb-8 grid gap-1 text-center">
            <BaseHeading type="h2" size="base">
              {modalState === ModalState.CancelSubscriptionConfirm
                ? t('account.my-products.cancelSubscriptionConfirmTitle')
                : t('account.my-products.enableSubscriptionConfirmTitle')}
            </BaseHeading>

            <p>
              {modalState === ModalState.CancelSubscriptionConfirm
                ? t('account.my-products.cancelSubscriptionConfirmText')
                : t('account.my-products.enableSubscriptionConfirmText')}
            </p>
          </div>
          <BaseButton
            onClick={() => setModalState(null)}
            theme="primary"
            size="md"
            wide
          >
            {t('account.my-products.backToSubscriptions')}
          </BaseButton>
        </Modal>
      </>
    )
  );
};

export default FreelanceProducts;
