import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AuthTitle from './AuthTitle';
import BaseButton from '@/app/_components/BaseButton';
import BaseInput from '@/app/_components/BaseInput';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import Modal from '@/app/_components/BaseDialog';
import BasePrivacyToggleList from '@/app/_components/user/BasePrivacyToggleList';

export interface FormData {
  password: string;
  passwordRepeat: string;
  acceptTerms?: boolean;
  acceptPrivacy?: boolean;
  privacySettings?: {
    informEmployersAnonymouslyWhenMatched: boolean;
    provideEmployersWithCvWhenMatched: boolean;
    informAboutProductsAndServices: boolean;
    shareWithMotherAndSisterCompanies: boolean;
    sendNewsletter: boolean;
    askForFeedback: boolean;
    sendContent: boolean;
  };
}

interface Props {
  invalid: boolean;
  error: boolean;
  loading: boolean;
  formData: FormData;
  privacyAndTerms?: boolean; // optional boolean to show privacy and terms checkboxes
  formErrors: { [key: string]: string | undefined };
  handleSubmit: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePrivacyListChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const PasswordReset = ({
  invalid,
  error,
  loading,
  formData,
  privacyAndTerms,
  formErrors,
  handleSubmit,
  handleInputChange,
  handlePrivacyListChange,
}: Props) => {
  const t = useTranslations('auth');
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openPrivacySettingsModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <AuthTitle>{t('passwordReset.header')}</AuthTitle>
        {(invalid || error) && (
          <p className="text-sm text-neutral-700">
            {invalid && t('passwordReset.messages.invalid.description')}
            {error && t('passwordReset.messages.error.description')}
          </p>
        )}
      </div>
      {!invalid && !error && (
        <>
          <BaseInput
            label={t('passwordReset.password.label')}
            placeholder={t('passwordReset.password.placeholder')}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            helper={t('passwordReset.password.helper')}
            required
            error={formErrors['password']}
          />
          <BaseInput
            label={t('passwordReset.passwordRepeat.label')}
            placeholder={t('passwordReset.passwordRepeat.placeholder')}
            name="passwordRepeat"
            value={formData.passwordRepeat}
            onChange={handleInputChange}
            type="password"
            required
            error={formErrors['passwordRepeat']}
          />
          {privacyAndTerms && (
            <>
              <div className="grid gap-3">
                <div>
                  <BaseCheckbox
                    label={t('privacy.label')}
                    name="acceptPrivacy"
                    checked={formData.acceptPrivacy ?? false}
                    onChange={handleInputChange}
                  />
                  <div
                    className="text-primary-600 ml-7 cursor-pointer text-sm font-medium hover:underline"
                    onClick={openPrivacySettingsModal}
                  >
                    {t('extendedSettings')}
                  </div>
                  <Modal
                    title={t('extendedSettings')}
                    isOpen={isOpen}
                    onClose={closeModal}
                    footer={
                      <div className="w-full sm:w-auto">
                        <BaseButton onClick={() => closeModal()} wide>
                          {t('saveSettings')}
                        </BaseButton>
                      </div>
                    }
                  >
                    <BasePrivacyToggleList
                      gap={2}
                      formData={formData.privacySettings}
                      onChange={handlePrivacyListChange}
                    />
                  </Modal>
                </div>
                <BaseCheckbox
                  label={t('terms.label')}
                  link={{
                    text: t('terms.link'),
                    url: 'https://www.freelance.nl/algemene-voorwaarden',
                    target: '_blank',
                  }}
                  name="acceptTerms"
                  checked={formData.acceptTerms ?? false}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-red-600">
                  {formErrors['acceptTerms']}
                </p>
              </div>
            </>
          )}
          <div>
            <BaseButton
              onClick={handleSubmit}
              wide
              type="submit"
              loading={loading}
            >
              {t('passwordReset.button')}
            </BaseButton>
          </div>
        </>
      )}

      {(invalid || error) && (
        <div>
          <BaseButton wide onClick={() => router.push('/wachtwoord-vergeten')}>
            {invalid && t('passwordReset.messages.invalid.button')}
            {error && t('passwordReset.messages.error.button')}
          </BaseButton>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
