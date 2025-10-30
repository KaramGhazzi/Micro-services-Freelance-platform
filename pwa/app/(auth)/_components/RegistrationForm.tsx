'use client';
import React, { useContext, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FeatureFlagContext from '../../(dashboard)/_context/FeatureFlagContext';
import AuthTitle from './AuthTitle';
import { UserRole } from '@/graphql/types';
import BaseInput from '@/app/_components/BaseInput';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import BaseAlert from '@/app/_components/BaseAlert';
import BasePrivacyToggleList from '@/app/_components/user/BasePrivacyToggleList';
import BaseButton from '@/app/_components/BaseButton';
import Modal from '@/app/_components/BaseDialog';

export interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  password: string;
  passwordRepeat: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  informEmployersAnonymouslyWhenMatched: boolean;
  provideEmployersWithCvWhenMatched: boolean;
  informAboutProductsAndServices: boolean;
  shareWithMotherAndSisterCompanies: boolean;
  sendNewsletter: boolean;
  askForFeedback: boolean;
  sendContent: boolean;
  role?: UserRole;
}

interface Props {
  invalid?: boolean;
  error?: boolean;
  loading?: boolean;
  formData: FormData;
  formErrors: { [key: string]: string | undefined };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  invitation?: boolean;
}

const RegistrationForm = ({
  invalid,
  error,
  loading,
  formData,
  formErrors,
  handleSubmit,
  handleInputChange,
  invitation,
}: Props) => {
  const t = useTranslations('');
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { loginEnabled } = useContext(FeatureFlagContext);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openPrivacySettingsModal = () => {
    setIsOpen(true);
  };

  const isSomePrivacySettingsToggled = () => {
    const {
      informEmployersAnonymouslyWhenMatched,
      provideEmployersWithCvWhenMatched,
      informAboutProductsAndServices,
      shareWithMotherAndSisterCompanies,
      sendNewsletter,
      askForFeedback,
      sendContent,
    } = formData;

    const toggledSettings = [
      informEmployersAnonymouslyWhenMatched,
      provideEmployersWithCvWhenMatched,
      informAboutProductsAndServices,
      shareWithMotherAndSisterCompanies,
      sendNewsletter,
      askForFeedback,
      sendContent,
    ];

    const toggledCount = toggledSettings.filter(Boolean).length;
    return toggledCount > 0 && toggledCount < toggledSettings.length;
  };

  return (
    <>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <BaseAlert
          title={t('global.registerNotAvailableTitle')}
          text={t('global.registerNotAvailableText')}
          theme="warning"
          alertDisabled={loginEnabled}
        />

        {!invitation ? (
          <AuthTitle>{t('auth.accountRegister')}</AuthTitle>
        ) : (
          <AuthTitle>{t('auth.confirmInvitation.header')}</AuthTitle>
        )}
        {(invalid || error) && (
          <p className="text-sm text-neutral-700">
            {invalid && t('auth.passwordReset.messages.invalid.description')}
            {error && t('auth.passwordReset.messages.error.description')}
          </p>
        )}

        {!invalid && !error && (
          <>
            {formErrors['general'] && (
              <BaseAlert
                title={t('account.errorMessage')}
                text={formErrors['general']}
                theme="error"
              />
            )}
            <div className="grid grid-cols-2 items-start gap-6">
              <BaseInput
                label={t('auth.firstName.label')}
                placeholder={t('auth.firstName.placeholder')}
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                type="firstName"
                autoFocus
                required
                error={formErrors['firstName']}
              />
              <BaseInput
                label={t('auth.lastName.label')}
                placeholder={t('auth.lastName.placeholder')}
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                type="lastName"
                required
                error={formErrors['lastName']}
              />
            </div>
            {!invitation && (
              <BaseInput
                label={t('auth.email.label')}
                placeholder={t('auth.email.placeholder')}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                required
                error={formErrors['email']}
              />
            )}
            <BaseInput
              label={t('auth.phoneNumber.label')}
              placeholder={t('auth.phoneNumber.placeholder')}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              type="phoneNumber"
              required
              error={formErrors['phoneNumber']}
            />
            {/*  */}
            <BaseInput
              label={t('auth.passwordNew.label')}
              placeholder={t('auth.passwordNew.placeholder')}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              required
              error={formErrors['password']}
              helper={t('auth.passwordNew.helper')}
            />
            <BaseInput
              label={t('auth.passwordRepeat.label')}
              placeholder={t('auth.passwordRepeat.placeholder')}
              name="passwordRepeat"
              value={formData.passwordRepeat}
              onChange={handleInputChange}
              type="password"
              required
              error={formErrors['passwordRepeat']}
            />

            <div className="grid gap-3">
              <div>
                <div className="relative">
                  <BaseCheckbox
                    label={t('auth.privacy.label')}
                    name="acceptPrivacy"
                    checked={formData.acceptPrivacy}
                    onChange={handleInputChange}
                  />
                  {isSomePrivacySettingsToggled() && (
                    <div className="bg-primary-500 ring-primary-500/20 pointer-events-none absolute left-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded border border-transparent shadow-sm ring-2 transition-all">
                      <span className="h-0.5 w-2 rounded bg-white bg-white"></span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="text-primary-600 ml-7 cursor-pointer text-sm font-medium hover:underline"
                  onClick={openPrivacySettingsModal}
                >
                  {t('auth.extendedSettings')}
                </button>

                <Modal
                  title={t('auth.extendedSettings')}
                  isOpen={isOpen}
                  onClose={closeModal}
                  footer={
                    <div className="w-full sm:w-auto">
                      <BaseButton onClick={() => closeModal()} wide>
                        {t('auth.saveSettings')}
                      </BaseButton>
                    </div>
                  }
                >
                  <BasePrivacyToggleList
                    gap={2}
                    formData={formData}
                    onChange={handleInputChange}
                  />
                </Modal>
              </div>
              <BaseCheckbox
                label={t('auth.terms.label')}
                link={{
                  text: t('auth.terms.link'),
                  url: 'https://www.freelance.nl/algemene-voorwaarden',
                  target: '_blank',
                }}
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-red-600">
                {formErrors['acceptPrivacy']}
              </p>
              <p className="text-xs font-semibold text-red-600">
                {formErrors['acceptTerms']}
              </p>
            </div>
            <div>
              <BaseButton loading={loading} type="submit" wide>
                {!invitation
                  ? t('auth.register.label')
                  : t('auth.confirmInvitation.button')}
              </BaseButton>
            </div>
            <div>
              <p className="text-center text-sm text-neutral-700">
                {t('auth.alreadyAccount')}&nbsp;
                <Link
                  href="/inloggen"
                  className="text-primary-600 text-sm font-medium hover:underline"
                >
                  {t('auth.login')}
                </Link>
              </p>
            </div>
          </>
        )}
        {(invalid || error) && (
          <div>
            <BaseButton
              wide
              onClick={() => router.push('/wachtwoord-vergeten')}
            >
              {invalid && t('auth.passwordReset.messages.invalid.button')}
              {error && t('auth.passwordReset.messages.error.button')}
            </BaseButton>
          </div>
        )}
      </form>
    </>
  );
};

export default RegistrationForm;
