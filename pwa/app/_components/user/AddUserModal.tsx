'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { ValidationError } from 'yup';
import { UserCompanyRole } from '@package/types/dist/class-validator/@generated/enums';
import { userRoleSchema } from '@package/types/dist/yup/pwa/user-role.schema';
import Modal from '@/app/_components/BaseDialog';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseInput from '@/app/_components/BaseInput';
import BaseSelect from '@/app/_components/BaseSelect';
import BaseTextarea from '@/app/_components/BaseTextarea';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import {
  InviteMutationVariables,
  useInviteMutation,
} from '@/graphql/mutations/auth/invite.generated';
import BaseButton from '@/app/_components/BaseButton';
import CompanyRoleDescriptionText from '@/app/_components/user/CompanyRoleDescriptionText';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: ((success?: boolean) => void) | undefined;
  inviteAdminMutation?: (settingsData: any) => any;
  companyId?: number;
  email?: string;
  firstUser?: boolean;
}

const AddUserModal = ({
  isOpen,
  onClose,
  email = '',
  inviteAdminMutation,
  companyId,
  firstUser = false,
}: AddUserModalProps) => {
  const t = useTranslations();
  const [addUserConfirmModal, setAddUserConfirmModal] = useState(false);
  const [formData, setFormData] = useState<InviteMutationVariables>({
    email,
    userCompanyRole: UserCompanyRole.COLLABORATOR,
    message: '',
  });
  const validationSchema = userRoleSchema();
  const [inviteMutation] = useInviteMutation();

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData) as {
      [index: string]: string | undefined;
    }
  );

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        email,
      };
    });
  }, [email]);

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        userCompanyRole: firstUser ? 'OWNER' : 'COLLABORATOR',
      };
    });
  }, [firstUser]);

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
    try {
      await validationSchema.validate(formData, {
        abortEarly: false,
      });

      let invitedResponse;
      if (inviteAdminMutation) {
        invitedResponse = await inviteAdminMutation({
          variables: {
            ...formData,
            companyId,
          },
        });
      } else {
        invitedResponse = await inviteMutation({
          variables: formData,
        });
      }
      if (invitedResponse?.data?.invite?.success === 'true') {
        if (onClose) {
          onClose(invitedResponse?.data?.invite?.success);
        }
        setFormErrors({});
        setAddUserConfirmModal(true);
      }
    } catch (error: any) {
      if (error instanceof ValidationError) {
        const errors: { [index: string]: string | undefined } = {};
        error.inner.forEach((error) => {
          if (error.path && Object.keys(formData).includes(error.path)) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setFormErrors({ role: t('errors.unknownError') });
      }
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleConfirm(); // Call your confirm function to handle the form submission
  };

  const resetForm = () => {
    setFormData({
      email: '',
      userCompanyRole: UserCompanyRole.COLLABORATOR,
      message: '',
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t('global.addNewUser')}
        size="md"
        footer={
          <>
            <BaseButton onClick={onClose} theme="secondary" size="md">
              {t('global.cancel')}
            </BaseButton>

            <BaseButton onClick={handleConfirm} size="md">
              {t('global.sendInvitation')}
            </BaseButton>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4 text-sm font-medium text-neutral-700">
            <BaseInput
              label={t('global.usersEmailAdress')}
              placeholder={t('global.usersEmailAdressPlaceholder')}
              name="email"
              required
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={formErrors['email']}
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
              {firstUser ? (
                <option disabled value="OWNER">
                  {t(`account.users.userCompanyRole.OWNER`)}
                </option>
              ) : (
                <>
                  <option disabled value="">
                    {t(`global.selectRole`)}
                  </option>
                  <option value="OWNER">
                    {t(`account.users.userCompanyRole.OWNER`)}
                  </option>
                  <option value="SUPERVISOR">
                    {t(`account.users.userCompanyRole.SUPERVISOR`)}
                  </option>
                  <option value="COLLABORATOR">
                    {t(`account.users.userCompanyRole.COLLABORATOR`)}
                  </option>
                </>
              )}
            </BaseSelect>

            <CompanyRoleDescriptionText
              userCompanyRole={
                firstUser
                  ? UserCompanyRole.OWNER
                  : (formData.userCompanyRole as UserCompanyRole)
              }
            />
          </div>

          <div className="text-sm font-medium text-neutral-700">
            <BaseTextarea
              label={t('global.message')}
              placeholder={t('global.messagePlaceholder')}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              size="sm"
              error={formErrors['message']}
            />
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={addUserConfirmModal}
        onClose={() => setAddUserConfirmModal(false)}
        onTransitionEnd={() => resetForm()}
        footer={
          <BaseButton
            theme="secondary"
            onClick={() => setAddUserConfirmModal(false)}
          >
            {t('global.close')}
          </BaseButton>
        }
      >
        <div className="flex justify-center">
          <i className="bg-success-50 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="bg-success-100 flex h-14 w-14 items-center justify-center rounded-full">
              <IconCheckmarkMd className="text-success-500 h-10 w-10" />
            </span>
          </i>
        </div>
        <div className="grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('global.invitationSent')}
          </BaseHeading>
          <p>{t('global.invitationSentText', { email: formData.email })}</p>
        </div>
      </Modal>
    </>
  );
};

export default AddUserModal;
