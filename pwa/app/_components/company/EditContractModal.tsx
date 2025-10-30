'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FieldConfig } from '../../_libs/productsConfig';
import Modal from '@/app/_components/BaseDialog';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseInput from '@/app/_components/BaseInput';
import BaseButton from '@/app/_components/BaseButton';
import BaseToggle from '@/app/_components/BaseToggle';
import BaseSelect from '@/app/_components/BaseSelect';
import { useUpdateContractMutation } from '@/graphql/mutations/contract/updateContract.generated';
import {
  Company,
  RenewalInterval,
  Contract,
  ProductSlug,
  Interval,
} from '@/graphql/types';
import ModalConfirmCheckmark from '@/app/_components/ModalConfirmCheckmark';

interface EditContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
  contract: Contract;
  onConfirm: () => void;
}

const formatDate = (date: Date | string | undefined): string => {
  if (!date) return '';

  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const useEditContractForm = (initialContract: Contract | undefined) => {
  const [productType, setProductType] = useState<string | undefined>();
  const [amountOfCredits, setAmountOfCredits] = useState<number | undefined>();
  const [usageInterval, setUsageInterval] = useState<string | undefined>();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [renewalInterval, setRenewalInterval] = useState<
    RenewalInterval | undefined
  >();
  const [autoRenew, setAutoRenew] = useState<boolean>(true);

  useEffect(() => {
    if (initialContract) {
      setProductType(initialContract?.plan.product.slug);
      setAmountOfCredits(initialContract?.usageAmount as number);
      setUsageInterval(initialContract?.usageInterval as Interval);
      setStartDate(initialContract?.startDate);
      setEndDate(initialContract?.endDate ?? null);
      setRenewalInterval(initialContract?.renewalInterval as RenewalInterval);
      setAutoRenew(initialContract?.endDate ? false : true);
    }
  }, [initialContract]);

  return {
    productType,
    setProductType,
    amountOfCredits,
    setAmountOfCredits,
    usageInterval,
    setUsageInterval,
    startDate,
    setStartDate,
    endDate,
    renewalInterval,
    setRenewalInterval,
    autoRenew,
    setAutoRenew,
  };
};

const EditContractModal = ({
  isOpen,
  onClose,
  company,
  contract,
  onConfirm,
}: EditContractModalProps) => {
  const t = useTranslations();
  const [updateContract] = useUpdateContractMutation();
  const [editContractConfirmModal, setEditContractConfirmModal] =
    useState(false);

  const {
    productType,
    setProductType,
    amountOfCredits,
    setAmountOfCredits,
    usageInterval,
    setUsageInterval,
    startDate,
    setStartDate,
    endDate,
    renewalInterval,
    setRenewalInterval,
    autoRenew,
    setAutoRenew,
  } = useEditContractForm(contract);
  // Get the correct field configuration based on the selected product type
  const fieldConfig = FieldConfig[productType as ProductSlug];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    switch (e.target.name) {
      case 'productType':
        setProductType(e.target.value as ProductSlug);
        break;
      case 'amountOfCredits':
        setAmountOfCredits(parseInt(e.target.value));
        break;
      case 'usageInterval':
        setUsageInterval(e.target.value as string);
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

  const handleUpdate = async () => {
    const credits = isNaN(amountOfCredits as number) ? 0 : amountOfCredits;

    if (!company?.id) {
      return;
    }

    const { data: updatedContract } = await updateContract({
      variables: {
        companyId: +company.id,
        contractId: +contract.id,
        input: {
          usageAmount: credits,
          usageInterval: usageInterval as Interval,
          startDate: startDate,
          endDate: !autoRenew
            ? dayjs(startDate).add(1, 'year').format('YYYY-MM-DD')
            : endDate,
          renewalInterval: autoRenew ? renewalInterval : null,
        },
      },
    });

    if (updatedContract?.updateContract.isSuccess) {
      if (onClose) {
        onClose();
      }
      setEditContractConfirmModal(true);
    }
  };

  const handleConfirm = () => {
    setEditContractConfirmModal(false);
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t('global.editContract')}
        size="md"
        footer={
          <>
            <BaseButton onClick={onClose} theme="secondary" size="md">
              {t('global.cancel')}
            </BaseButton>

            <BaseButton onClick={handleUpdate} size="md">
              {t('global.updateContract')}
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
              disabled
            >
              <option value={productType}>
                {t(`products.${productType}`)}
              </option>
            </BaseSelect>
          </div>

          <div className="mb-4 text-sm font-medium text-neutral-700">
            <BaseInput
              label={t('global.amountOfCredits')}
              name="amountOfCredits"
              value={amountOfCredits}
              onChange={handleInputChange}
              type="number"
              disabled={!fieldConfig?.amountOfCredits?.enabled}
            />
          </div>

          <div className="mb-4 text-sm font-medium text-neutral-700">
            <BaseSelect
              label={t('global.newCreditsPer')}
              name="usageInterval"
              value={usageInterval}
              disabled={!fieldConfig?.usageInterval?.enabled}
              onChange={handleInputChange}
              className="mb-2"
            >
              {fieldConfig?.usageInterval?.options?.map((interval) => {
                const formattedInterval = interval
                  .toLowerCase()
                  .split('_')
                  .map(
                    (renewalInterval: Interval) =>
                      renewalInterval.charAt(0).toUpperCase() +
                      renewalInterval.slice(1)
                  )
                  .join('');

                return (
                  <option key={interval} value={interval}>
                    {t(`global.per${formattedInterval}`)}
                  </option>
                );
              })}
            </BaseSelect>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3 text-sm font-medium text-neutral-700">
            <BaseInput
              label={t('global.startDate')}
              name="startDate"
              value={formatDate(startDate)}
              onChange={handleInputChange}
              type="date"
              disabled={!fieldConfig?.renewalInterval?.enabled}
            />
            <BaseSelect
              label={t('global.renewalInterval')}
              name="renewalInterval"
              value={renewalInterval}
              disabled={!fieldConfig?.renewalInterval?.enabled}
              onChange={handleInputChange}
              className="mb-2"
            >
              {fieldConfig?.renewalInterval?.options?.map((interval) => {
                const formattedInterval = interval
                  .toLowerCase()
                  .split('_')
                  .map(
                    (renewalInterval: Interval) =>
                      renewalInterval.charAt(0).toUpperCase() +
                      renewalInterval.slice(1)
                  )
                  .join('');

                return (
                  <option key={interval} value={interval}>
                    {t(`global.per${formattedInterval}`)}
                  </option>
                );
              })}
            </BaseSelect>
          </div>

          <div className="mb-4 text-sm font-medium text-neutral-700">
            <BaseToggle
              label={t('global.autoRenew')}
              name="autoRenew"
              checked={autoRenew}
              onChange={handleInputChange}
              disabled={!fieldConfig?.autoRenew?.enabled}
            />
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={editContractConfirmModal}
        onClose={() => setEditContractConfirmModal(false)}
        footer={
          <BaseButton theme="secondary" onClick={() => handleConfirm()}>
            {t('global.close')}
          </BaseButton>
        }
      >
        <ModalConfirmCheckmark />

        <div className="grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('global.contractIsUpdated')}
          </BaseHeading>
          <p>{t('global.contractIsUpdatedText')}</p>
        </div>
      </Modal>
    </>
  );
};

export default EditContractModal;
