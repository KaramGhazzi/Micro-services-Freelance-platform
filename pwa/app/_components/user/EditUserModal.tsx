import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { UserCompanyRole } from '@package/types/dist/class-validator/@generated/enums';
import Modal from '@/app/_components/BaseDialog';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseInput from '@/app/_components/BaseInput';
import BaseSelect from '@/app/_components/BaseSelect';
import { InviteMutationVariables } from '@/graphql/mutations/auth/invite.generated';
import BaseButton from '@/app/_components/BaseButton';
import CompanyRoleDescriptionText from '@/app/_components/user/CompanyRoleDescriptionText';
import { useUserCompanyUpdateMutation } from '@/graphql/mutations/users-companies/userCompanyUpdate.generated';
import { UsersCompanies, User } from '@/graphql/types';
import ModalConfirmCheckmark from '@/app/_components/ModalConfirmCheckmark';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: ((success?: boolean) => void) | undefined;
  user?: User | null;
  userCompany?: UsersCompanies | null;
  refetch: () => any;
  companyHasOneUser?: boolean; // If the company has only one user, you can only set the user's role to owner.
}

const EditUserModal = ({
  isOpen,
  onClose,
  user,
  userCompany,
  refetch,
  companyHasOneUser = false,
}: EditUserModalProps) => {
  const t = useTranslations();
  const [updateUserCompany] = useUserCompanyUpdateMutation();
  const [editUserConfirmModal, setEditUserConfirmModal] = useState(false);
  const [formData, setFormData] = useState<InviteMutationVariables>({
    email: '[EMAIL]',
    userCompanyRole: UserCompanyRole.COLLABORATOR,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      email: user?.email ?? '',
      userCompanyRole: userCompany?.userCompanyRoles?.[0]?.role ?? '',
      message: '',
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    // First clear roles from user
    await updateUserCompany({
      variables: {
        data: {
          userCompanyRole: {
            role: formData.userCompanyRole as any,
          },
        },
        where: {
          id: Number(userCompany?.id),
        },
      },
    });

    // Refetch data
    refetch();

    if (onClose) {
      onClose(false);
    }
    setEditUserConfirmModal(true);
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`${t('global.open')}: ${user?.email}`}
        size="md"
        footer={
          <>
            <BaseButton onClick={onClose} theme="secondary" size="md">
              {t('global.cancel')}
            </BaseButton>

            <BaseButton onClick={handleConfirm} loading={isLoading} size="md">
              {t('global.saveChanges')}
            </BaseButton>
          </>
        }
      >
        <form>
          <div className="mb-4 text-sm font-medium text-neutral-700">
            <BaseInput
              label={t('global.usersEmailAdress')}
              placeholder={t('global.usersEmailAdressPlaceholder')}
              name="email"
              required
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
            />
          </div>

          <div className="mb-4 text-sm font-medium text-neutral-700">
            <BaseSelect
              label={t('global.pickRole')}
              name="userCompanyRole"
              value={formData.userCompanyRole}
              onChange={handleInputChange}
              className="mb-2"
            >
              <option disabled value="">
                {t(`global.selectRole`)}
              </option>
              <option value="OWNER">
                {t(`account.users.userCompanyRole.OWNER`)}
              </option>
              <option disabled={companyHasOneUser} value="SUPERVISOR">
                {t(`account.users.userCompanyRole.SUPERVISOR`)}
              </option>
              <option disabled={companyHasOneUser} value="COLLABORATOR">
                {t(`account.users.userCompanyRole.COLLABORATOR`)}
              </option>
            </BaseSelect>

            <CompanyRoleDescriptionText
              userCompanyRole={formData.userCompanyRole as UserCompanyRole}
            />
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={editUserConfirmModal}
        onClose={() => setEditUserConfirmModal(false)}
        onTransitionEnd={() => resetForm()}
        footer={
          <BaseButton
            theme="primary"
            wide
            onClick={() => setEditUserConfirmModal(false)}
          >
            {t('global.backToUsersOverview')}
          </BaseButton>
        }
      >
        <ModalConfirmCheckmark />

        <div className="grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('global.changesSaved')}
          </BaseHeading>
          <p>{t('global.changesSavedText')}</p>
        </div>
      </Modal>
    </>
  );
};

export default EditUserModal;
