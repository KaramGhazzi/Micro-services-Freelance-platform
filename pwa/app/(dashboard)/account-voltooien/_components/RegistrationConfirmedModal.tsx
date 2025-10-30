import { useTranslations } from 'next-intl';
import ConfirmationModal from './ConfirmationModal';

interface RegistrationConfirmedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationConfirmedModal = ({
  isOpen,
  onClose,
}: RegistrationConfirmedModalProps) => {
  const t = useTranslations('complete');

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('companyRegistered')}
      description={t('companyRegisteredDescripton')}
    />
  );
};

export default RegistrationConfirmedModal;
