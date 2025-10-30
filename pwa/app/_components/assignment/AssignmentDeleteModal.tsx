import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Modal from '@/app/_components/BaseDialog';
import BaseButton from '@/app/_components/BaseButton';
import { useDeleteAssignmentMutation } from '@/graphql/mutations/assignments/deleteAssignment.generated';

const AssignmentDeleteModal = ({
  isOpen,
  onClose,
  assignmentId,
}: {
  isOpen: boolean;
  onClose: () => void;
  assignmentId: number;
}) => {
  const t = useTranslations('assignment');

  const router = useRouter();

  const [deleteAssignment] = useDeleteAssignmentMutation();

  const removeAssignment = () => {
    deleteAssignment({
      variables: { assignmentId: Number(assignmentId) },
    }).then(() => {
      router.push('/opdracht-plaatsen/mijn-opdrachten');
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title={t('modal.removeAssignment')}
      footer={
        <>
          <BaseButton onClick={onClose} theme="secondary" size="md">
            {t('modal.cancel')}
          </BaseButton>

          <BaseButton onClick={removeAssignment} size="md">
            {t('modal.removeAssignment')}
          </BaseButton>
        </>
      }
    >
      <p className="text-neutral-500">
        {t('modal.removeAssignmentDescription')}
      </p>
    </Modal>
  );
};

export default AssignmentDeleteModal;
