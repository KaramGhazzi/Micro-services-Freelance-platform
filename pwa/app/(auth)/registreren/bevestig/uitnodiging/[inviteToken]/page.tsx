'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerInvitationSchema } from '@package/types/dist/yup/auth/register-invitation.schema';
import { ValidationError } from 'yup';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import { useCheckInviteQuery } from '@/graphql/mutations/auth/checkInvite.generated';
import RedirectMessage from '@/app/(auth)/_components/RedirectMessage';
import RegistrationForm, {
  FormData,
} from '@/app/(auth)/_components/RegistrationForm';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Page({
  params: { inviteToken },
}: Readonly<{
  params: { inviteToken: string };
}>) {
  const t = useTranslations();
  const router = useRouter();
  const validationSchema = registerInvitationSchema();

  const {
    data: inviteData,
    loading: loadingInvite,
    error: inviteError,
  } = useCheckInviteQuery({
    variables: { inviteToken },
  });
  const {
    confirmInvitation,
    loading: loadingAuth,
    error: authError,
  } = useAuth();

  const confirmed = !!inviteData?.checkInvite.confirmed;
  const loading = loadingInvite || loadingAuth;
  const validToken =
    authError?.message !== 'Token invalid' &&
    inviteData?.checkInvite.success === 'true';
  const error = !!(inviteError || authError) && validToken;

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    passwordRepeat: '',
    acceptTerms: false,
    acceptPrivacy: false,
    informEmployersAnonymouslyWhenMatched: false,
    provideEmployersWithCvWhenMatched: false,
    informAboutProductsAndServices: false,
    shareWithMotherAndSisterCompanies: false,
    sendNewsletter: false,
    askForFeedback: false,
    sendContent: false,
  });

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    let formData = {
      [name]: inputValue,
    };

    if (name === 'acceptPrivacy') {
      formData = {
        ...formData,
        informEmployersAnonymouslyWhenMatched: inputValue,
        provideEmployersWithCvWhenMatched: inputValue,
        informAboutProductsAndServices: inputValue,
        shareWithMotherAndSisterCompanies: inputValue,
        sendNewsletter: inputValue,
        askForFeedback: inputValue,
        sendContent: inputValue,
      };
    }

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...formData,
    }));
  };

  const redirect = () => {
    router.push('/inloggen');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loadingAuth) setFormErrors({});

    try {
      await validationSchema.validate(formData, {
        abortEarly: false,
      });

      await confirmInvitation(inviteToken, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        privacySettings: {
          informEmployersAnonymouslyWhenMatched:
            formData.informEmployersAnonymouslyWhenMatched,
          provideEmployersWithCvWhenMatched:
            formData.provideEmployersWithCvWhenMatched,
          informAboutProductsAndServices:
            formData.informAboutProductsAndServices,
          shareWithMotherAndSisterCompanies:
            formData.shareWithMotherAndSisterCompanies,
          sendNewsletter: formData.sendNewsletter,
          askForFeedback: formData.askForFeedback,
          sendContent: formData.sendContent,
        },
      });

      setSuccess(true);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        const errors: { [index: string]: string | undefined } = {};
        error.inner.forEach((error) => {
          if (error.path && Object.keys(formData).includes(error.path)) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else if (error.message === 'Token invalid') {
      } else {
        setFormErrors({ passwordRepeat: t('auth.errors.unknownError') });
      }
    }
  };

  if (success || confirmed) {
    return (
      <RedirectMessage
        title={t('global.invitationConfirmed')}
        redirect={redirect}
        loading={loading}
        success={true}
      ></RedirectMessage>
    );
  }

  if (loadingInvite) {
    return (
      <RedirectMessage
        title={t('global.invitationChecking')}
        redirect={redirect}
        loading={true}
        success={false}
      ></RedirectMessage>
    );
  }

  if (!validToken) {
    return (
      <RedirectMessage
        title={t('global.invalidInviteToken')}
        redirect={redirect}
        loading={false}
        success={false}
      ></RedirectMessage>
    );
  }

  return (
    <RegistrationForm
      invalid={!validToken}
      error={error}
      loading={loading}
      formData={formData}
      formErrors={formErrors}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      invitation={true}
    ></RegistrationForm>
  );
}
