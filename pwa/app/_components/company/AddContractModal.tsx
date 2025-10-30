'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Modal from '@/app/_components/BaseDialog';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseInput from '@/app/_components/BaseInput';
import BaseSelect from '@/app/_components/BaseSelect';
import BaseButton from '@/app/_components/BaseButton';
import BaseToggle from '@/app/_components/BaseToggle';
import { CompanyQuery } from '@/graphql/queries/companies/getCompany.generated';
import { useCreateContractMutation } from '@/graphql/mutations/contract/createContract.generated';
import {
  PlansQuery,
  usePlansQuery,
} from '@/graphql/queries/plans/plans.generated';
import { Interval, ProductSlug, RenewalInterval } from '@/graphql/types';
import ModalConfirmCheckmark from '@/app/_components/ModalConfirmCheckmark';

interface AddContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  company?: CompanyQuery['company'];
  onConfirm?: () => void;
}

const AddContractModal = ({
  isOpen,
  onClose,
  company,
  onConfirm,
}: AddContractModalProps) => {
  const t = useTranslations();
  const [addContractConfirmModal, setAddContractConfirmModal] = useState(false);
  const [productType, setProductType] = useState('');
  const [amountOfCredits, setAmountOfCredits] = useState('');
  const [usageInterval, setUsageInterval] = useState<Interval>(
    productType === ProductSlug.MarketmonitorBasicApplication
      ? Interval.Month
      : Interval.Year
  );
  const [startDate, setStartDate] = useState('');
  const [renewalInterval, setRenewalInterval] = useState<RenewalInterval>(
    RenewalInterval.Year
  );
  const [autoRenew, setAutoRenew] = useState(true);
  const [createContract] = useCreateContractMutation();
  const allowedContracts: ProductSlug[] = [
    ProductSlug.CompanyPremiumAssignment,
    ProductSlug.MarketmonitorPremiumApplication,
    ProductSlug.CompanyPremiumProfile,
  ];
  const allowedInterval: Interval[] = [Interval.Month, Interval.Year];

  const { data: plansData } = usePlansQuery();

  const [uniquePlans, setUniquePlans] = useState<PlansQuery['plans']>();

  // this functionality is added to filter out the duplicate products ids like TopAssignment
  useEffect(() => {
    if (plansData?.plans) {
      const uniquePlansMap = new Map();
      const filteredPlans = plansData.plans.filter((plan) => {
        if (!uniquePlansMap.has(plan.productId)) {
          uniquePlansMap.set(plan.productId, true);
          return true;
        }
        return false;
      });
      setUniquePlans(filteredPlans);
    }
  }, [plansData]);

  const isValid = () =>
    productType === ProductSlug.CompanyPremiumProfile
      ? !!startDate
      : productType && amountOfCredits && startDate;

  const getPlanId = (amountOfCredits: number) => {
    if (productType === ProductSlug.CompanyTop) {
      return plansData?.plans.find(
        (plan) =>
          plan.product.slug === ProductSlug.CompanyTop &&
          plan.usageAmount === amountOfCredits
      )?.id;
    }

    return plansData?.plans.find((plan) => plan.product.slug === productType)
      ?.id;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    switch (e.target.name) {
      case 'productType':
        setProductType(e.target.value);
        break;
      case 'amountOfCredits':
        setAmountOfCredits(e.target.value);
        break;
      case 'usageInterval':
        setUsageInterval(e.target.value as Interval);
        break;
      case 'renewalInterval':
        setRenewalInterval(e.target.value as RenewalInterval);
        break;
      case 'startDate':
        setStartDate(e.target.value);
        break;
      case 'autoRenew':
        setAutoRenew((e.target as HTMLInputElement).checked);
        break;
      default:
        break;
    }
  };

  const handleCreate = async () => {
    //if amount of credits is NaN set it to 1
    const credits = isNaN(parseInt(amountOfCredits))
      ? 1
      : parseInt(amountOfCredits);

    const allowedCredits =
      productType === ProductSlug.CompanyPremiumProfile ? 0 : credits;

    // Get plan id
    const planId = getPlanId(allowedCredits);

    if (!planId) {
      alert('Plan not found');
      return;
    }

    if (!company?.id) {
      alert('Company not found');
      return;
    }

    // Create contract
    await createContract({
      variables: {
        input: {
          companyId: +company.id,
          planId: +planId,
          usageAmount: allowedCredits,
          usageInterval,
          startDate: startDate,
          endDate: !autoRenew // If no auto renew, set end date to 1 year from start date otherwise null
            ? dayjs(startDate).add(1, 'year').format('YYYY-MM-DD')
            : undefined,
          renewalInterval: autoRenew ? renewalInterval : null, // If auto renew, set renewal interval to year otherwise null
        },
      },
    });

    if (onClose) {
      onClose();
    }
    setAddContractConfirmModal(true);

    // Clear form
    setAutoRenew(true);
    setProductType('');
    setAmountOfCredits('');
    setStartDate('');
  };

  const handleConfirm = () => {
    setAddContractConfirmModal(false);
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t('global.addNewContract')}
        size="md"
        footer={
          <>
            <BaseButton onClick={onClose} theme="secondary" size="md">
              {t('global.cancel')}
            </BaseButton>

            <BaseButton onClick={handleCreate} size="md" disabled={!isValid()}>
              {t('global.createContract')}
            </BaseButton>
          </>
        }
      >
        <form>
          <div className="mb-4 text-sm font-medium text-neutral-700">
            <BaseInput
              label={t('global.company')}
              name="company"
              required
              type="company"
              value={company?.name}
              disabled
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 text-sm font-medium text-neutral-700">
            <BaseSelect
              label={t('global.productType')}
              name="productType"
              value={productType}
              onChange={handleInputChange}
              className="mb-2"
            >
              <option disabled value="">
                {t(`global.selectProduct`)}
              </option>

              {uniquePlans?.map(
                (plan) =>
                  allowedContracts.includes(plan.product.slug) && (
                    <option key={plan.id} value={plan?.product?.slug}>
                      {t(`products.${plan.product.slug}`)}
                    </option>
                  )
              )}
            </BaseSelect>
          </div>
          {productType !== ProductSlug.CompanyPremiumProfile && (
            <div className="mb-4 grid grid-cols-2 gap-3 text-sm font-medium text-neutral-700">
              <BaseInput
                label={t('global.amountOfCredits')}
                name="amountOfCredits"
                required={productType !== ProductSlug.CompanyPremiumProfile}
                type="number"
                value={amountOfCredits}
                onChange={handleInputChange}
              />
              <BaseSelect
                label={t('global.newCreditsPer')}
                name="usageInterval"
                value={usageInterval}
                disabled={
                  productType === ProductSlug.MarketmonitorPremiumApplication
                }
                onChange={handleInputChange}
                className="mb-2"
              >
                {Object.values(Interval).map((interval) => {
                  if (
                    (productType ===
                      ProductSlug.MarketmonitorPremiumApplication &&
                      interval !== Interval.Month) ||
                    !allowedInterval.includes(interval)
                  ) {
                    return null;
                  }
                  return (
                    <option key={interval} value={interval}>
                      {t(
                        `global.per${
                          interval.charAt(0) + interval.slice(1).toLowerCase()
                        }`
                      )}
                    </option>
                  );
                })}
              </BaseSelect>
            </div>
          )}
          <div className="mb-4 grid grid-cols-2 gap-3 text-sm font-medium text-neutral-700">
            <BaseInput
              label={t('global.startDate')}
              name="startDate"
              value={startDate}
              onChange={handleInputChange}
              type="date"
            />
            <BaseSelect
              label={t('global.duration')}
              name="renewalInterval"
              value={renewalInterval}
              onChange={handleInputChange}
              disabled={
                productType !== ProductSlug.MarketmonitorPremiumApplication ||
                !autoRenew
              }
              className="mb-2"
            >
              {Object.values(RenewalInterval).map((interval) => {
                if (
                  productType !== ProductSlug.MarketmonitorPremiumApplication &&
                  interval === RenewalInterval.Quarter
                ) {
                  return null;
                }

                return (
                  <option key={interval} value={interval}>
                    {t(`interval.${interval}`)}
                  </option>
                );
              })}
            </BaseSelect>
          </div>

          <BaseToggle
            label={t(`global.autoRenew`)}
            name={'autoRenew'}
            checked={autoRenew}
            onChange={handleInputChange}
            required
          />
        </form>
      </Modal>

      <Modal
        isOpen={addContractConfirmModal}
        onClose={() => setAddContractConfirmModal(false)}
        footer={
          <BaseButton theme="secondary" onClick={() => handleConfirm()}>
            {t('global.close')}
          </BaseButton>
        }
      >
        <ModalConfirmCheckmark />

        <div className="grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('global.contractIsCreated')}
          </BaseHeading>
          <p>{t('global.contractIsCreatedText')}</p>
        </div>
      </Modal>
    </>
  );
};

export default AddContractModal;
