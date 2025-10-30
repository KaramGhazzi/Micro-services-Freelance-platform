import React, { useContext } from 'react';
import { useTranslations } from 'next-intl';
import ContractContext from '../_context/ContractContext';
import Modal from '@/app/_components/BaseDialog';
import IconRocket from '@/app/_components/icons/IconRocket';
import BaseButton from '@/app/_components/BaseButton';

interface OutOfCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  referToAssignments?: boolean;
}

const OutOfCreditsModal: React.FC<OutOfCreditsModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  referToAssignments = false,
}) => {
  const t = useTranslations();
  const { hasFreelancerBasicContract } = useContext(ContractContext);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title ?? t('payments.pro.outOfCredits')}
      footer={
        <>
          <BaseButton onClick={onClose} theme="secondary" size="lg">
            {t('global.back')}
          </BaseButton>
          {(referToAssignments || hasFreelancerBasicContract) && (
            <BaseButton
              theme="primary"
              size="lg"
              href={
                referToAssignments
                  ? '/opdracht-plaatsen/nieuwe-opdracht'
                  : '/pro'
              }
            >
              <IconRocket />
              <span>{t('global.purchaseTopAssignments')}</span>
            </BaseButton>
          )}
        </>
      }
    >
      {children}
    </Modal>
  );
};

export default OutOfCreditsModal;
