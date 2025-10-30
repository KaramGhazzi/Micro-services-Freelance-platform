import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import BaseUserAvatar from '../BaseUserAvatar';
import { getImageUrl } from '../../(dashboard)/_utils/getImageUrl';
import Modal from '@/app/_components/BaseDialog';
import { Company, UsersCompanies } from '@/graphql/types';
import { useAuth } from '@/app/_hooks/useAuth';

interface PickCompanyModalModalProps {
  isOpen: boolean;
  onClose?: () => void;
  redirect?: boolean;
}

const PickCompanyModal: React.FC<PickCompanyModalModalProps> = ({
  isOpen,
  onClose,
  redirect = true,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { switchCompany, currentUser } = useAuth();

  const handleUpdateCurrentCompany = (id: string) => {
    switchCompany(id);

    if (redirect) {
      router.push(searchParams.get('redirect') ?? '/dashboard');
    }

    if (onClose) return onClose();
  };

  const renderCompanyItem = (companyType: {
    __typename?: 'UsersCompanies';
    company: Company;
  }) => {
    if (!companyType) {
      return;
    }

    const { name, id, address } = companyType.company;

    const companyImageUrl =
      companyType?.company?.logoImageFile &&
      getImageUrl(
        companyType?.company?.logoImageFile.container,
        companyType?.company?.logoImageFile.blobName
      );

    return (
      <div
        key={id}
        className="align mb-2 flex cursor-pointer items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4 transition-all last-of-type:mb-0 hover:bg-neutral-50"
        onClick={() => handleUpdateCurrentCompany(id)}
      >
        <BaseUserAvatar size="md" url={companyImageUrl} contain />

        <div>
          <div className="mb-1 font-bold text-neutral-900">{name}</div>
          <span>
            {address?.city}, {address?.countryCode}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title={t('company.pickCompanyLogin')}
    >
      <p className="mb-4">{t('company.pickCompanyLoginText')}</p>

      {currentUser?.userCompanies?.map((company) => {
        return renderCompanyItem(company as UsersCompanies);
      })}
    </Modal>
  );
};

export default PickCompanyModal;
