import React from 'react';
import { useTranslations } from 'next-intl';
import Modal from '@/app/_components/BaseDialog';
import BaseButton from '@/app/_components/BaseButton';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';
import BaseHeading from '@/app/_components/BaseHeading';
import IconXMd from '@/app/_components/icons/IconXMd';

export interface ConfirmedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  success?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  description,
  success = true,
}: ConfirmedModalProps) => {
  const t = useTranslations('complete');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <BaseButton onClick={onClose} wide={true}>
          {t('closeWindow')}
        </BaseButton>
      }
    >
      <div className="flex justify-center">
        <i
          className={`${
            success ? 'bg-success-50' : 'bg-error-50'
          } mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full`}
        >
          <span
            className={`${
              success ? 'bg-success-100' : 'bg-error-100'
            } flex h-14 w-14 items-center justify-center rounded-full`}
          >
            {success ? (
              <IconCheckmarkMd className="text-success-500 h-10 w-10" />
            ) : (
              <IconXMd className="text-error-500 h-10 w-10" />
            )}
          </span>
        </i>
      </div>
      <div className="mb-8 grid gap-1 text-center">
        <BaseHeading type="h2" size="base">
          {title}
        </BaseHeading>
      </div>
      <div className="grid">
        <p className="text-center font-medium text-neutral-700">
          {description}
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
