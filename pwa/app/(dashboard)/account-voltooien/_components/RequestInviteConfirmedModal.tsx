import { useTranslations } from 'next-intl';
import ConfirmationModal from './ConfirmationModal';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  success: boolean;
}

const RequestInviteConfirmedModal = ({ isOpen, onClose, success }: Props) => {
  const t = useTranslations('complete');
  const title = t('requestInvite');
  const description = t('requestInviteDescription');

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      success={success}
    />
  );
};

export default RequestInviteConfirmedModal;
