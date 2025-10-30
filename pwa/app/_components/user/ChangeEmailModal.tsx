import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { updateEmailSchema } from '@package/types/dist/yup/pwa/update-email.schema';
import { ValidationError } from 'yup';
import UnknownErrorMessage from '../UnknownErrorMessage';
import Modal from '@/app/_components/BaseDialog';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseInput from '@/app/_components/BaseInput';
import BaseButton from '@/app/_components/BaseButton';
import { CurrentUser } from '@/app/(dashboard)/_context/CurrentUserContext';
import ModalConfirmCheckmark from '@/app/_components/ModalConfirmCheckmark';
import { useRequestEmailChangeAdminMutation } from '@/graphql/mutations/users/requestEmailChangeAdmin.generated';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import { FormChangeEvent } from '@/app/(auth)/email-aanpassing-bevestigen/_components/Password';

interface FormData {
  currentEmail?: string | null;
  newEmail?: string | null;
  newEmailRepeat?: string | null;
}

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: (newEmailAddress?: string | null) => void;
  user?: CurrentUser | null;
}

const ChangeEmailModal = ({ isOpen, onClose, user }: ChangeEmailModalProps) => {
  const t = useTranslations();

  const [emailFormData, setEmailFormData] = useState<FormData>({
    currentEmail: user?.email,
    newEmail: '',
    newEmailRepeat: '',
  });

  const [emailFormDataErrors, setEmailFormDataErrors] = useState(
    copyObjectWithNullValues(emailFormData) as {
      [index: string]: string | undefined;
    }
  );

  const [unknownError, setUnknownError] = useState(false);
  const [changeEmailConfirmModal, setChangeEmailConfirmModal] = useState(false);
  const validationSchema = updateEmailSchema();

  const [requestEmailChange] = useRequestEmailChangeAdminMutation();

  const handleInputChange = async (e: FormChangeEvent) => {
    const { name, value } = e.target;

    setEmailFormDataErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    setEmailFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setEmailFormData((prevFormData: any) => ({
        ...prevFormData,
        currentEmail: user.email,
      }));
    }
  }, [user]);

  const handleConfirm = async () => {
    setEmailFormDataErrors({});

    try {
      await validationSchema.validate(emailFormData, {
        abortEarly: false,
      });

      await requestEmailChange({
        variables: {
          email: emailFormData.newEmail ?? '',
          userId: Number(user?.id ?? -1),
        },
      });

      onClose(emailFormData.newEmail);
      setChangeEmailConfirmModal(true);
    } catch (e: any) {
      if (e instanceof ValidationError) {
        const errors: { [index: string]: string | undefined } = {};

        e.inner.forEach((error) => {
          if (error.path && Object.keys(emailFormData).includes(error.path)) {
            errors[error.path] = error.message;
          }
        });
        setEmailFormDataErrors(errors);
      } else if (e.graphQLErrors[0]?.message === 'error.unique') {
        setEmailFormDataErrors({
          newEmail: t('auth.errors.emailExists'),
        });
      } else {
        setUnknownError(true);
      }
    }
  };

  const onModalClose = () => {
    setEmailFormDataErrors({});
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onModalClose}
        title={`${t('global.changeEmailButtonText')}`}
        size="md"
        footer={
          <>
            <BaseButton onClick={onModalClose} theme="secondary" size="md">
              {t('global.cancel')}
            </BaseButton>

            <BaseButton
              onClick={handleConfirm}
              size="md"
              // disabled={emailFormData.newEmail === user?.email}
            >
              {t('global.changeEmailButtonText')}
            </BaseButton>
          </>
        }
      >
        <div>
          <div className="mb-4">
            <BaseInput
              label={t('account.newEmail1.label')}
              placeholder={t('account.newEmail1.placeholder')}
              name="newEmail"
              required
              type="email"
              value={emailFormData.newEmail}
              onChange={handleInputChange}
              error={emailFormDataErrors['newEmail']}
            />
          </div>

          <div className="mb-4">
            <BaseInput
              label={t('account.newEmail2.label')}
              placeholder={t('account.newEmail2.placeholder')}
              name="newEmailRepeat"
              required
              type="email"
              value={emailFormData.newEmailRepeat}
              onChange={handleInputChange}
              error={emailFormDataErrors['newEmailRepeat']}
            />
          </div>
          {unknownError && <UnknownErrorMessage />}
        </div>
      </Modal>

      <Modal
        isOpen={changeEmailConfirmModal}
        onClose={() => setChangeEmailConfirmModal(false)}
        footer={
          <BaseButton
            theme="primary"
            wide
            onClick={() => setChangeEmailConfirmModal(false)}
          >
            {t('global.close')}
          </BaseButton>
        }
      >
        <ModalConfirmCheckmark />

        <div className="grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('global.confirmationMailIsSent')}
          </BaseHeading>
          <p>{t('global.confirmationMailIsSentText')}</p>
        </div>
      </Modal>
    </>
  );
};

export default ChangeEmailModal;
