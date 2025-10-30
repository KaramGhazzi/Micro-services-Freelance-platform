import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import BaseButton from '@/app/_components/BaseButton';
import Modal from '@/app/_components/BaseDialog';
import IconXCircleFill from '@/app/_components/icons/IconXCircleFill';
import IconPencilAlt from '@/app/_components/icons/IconPencilAlt';

interface DeclineReasonBannerProps {
  assignmentTitle?: string | null;
  assignmentId: string;
  currentStatus?: {
    __typename?: 'Status';
    key: string;
    description?: string | null;
  } | null;
  canEdit?: boolean;
}

const DeclineReasonBanner = ({
  assignmentTitle,
  assignmentId,
  currentStatus,
  canEdit,
}: DeclineReasonBannerProps) => {
  const t = useTranslations('assignment');
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className=" grid gap-10 bg-red-500 px-5 lg:px-10">
        <div className=" flex h-14 items-center gap-4 text-white">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <IconXCircleFill className=" fill-white" />
            <p>{t('assignmentDeclined')}</p>
          </div>
          <div className=" font-semibold">
            <BaseButton
              onClick={() => {
                setIsOpen(true);
              }}
              size="sm"
              theme="secondary"
            >
              {t('readWhy')}
            </BaseButton>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        title={t('declineReasonHeader')}
        onClose={closeModal}
        footer={
          <>
            {canEdit && (
              <BaseButton
                theme="secondary"
                href={`/opdracht-plaatsen/nieuwe-opdracht/bewerken/${assignmentId}`}
              >
                <IconPencilAlt className="hidden sm:flex" />
                <span>{t('toolbar.edit')}</span>
              </BaseButton>
            )}
            <BaseButton onClick={() => closeModal()} theme="secondary">
              {t('close')}
            </BaseButton>
          </>
        }
      >
        <div>
          <p className="mb-4">
            {t('yourAssignment')}
            <span className=" font-bold"> {assignmentTitle} </span>
            {t('declinedBecause')}
          </p>
          <div>{currentStatus?.description}</div>
        </div>
      </Modal>
    </>
  );
};

export default DeclineReasonBanner;
