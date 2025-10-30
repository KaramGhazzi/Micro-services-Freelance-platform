'use client';
import { registerSchema } from '@package/types/dist/yup/auth/register.schema';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { ValidationError } from 'yup';
import EmailContext from '../_components/EmailContextProvider';
import RegistrationForm from '../_components/RegistrationForm';
import { UserRole } from '@/graphql/types';
import useMountOnce from '@/app/_libs/useMountOnce';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import { useAuth } from '@/app/_hooks/useAuth';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
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
  role: UserRole;
}

export default function Page() {
  const t = useTranslations();
  const validationSchema = registerSchema();
  const router = useRouter();
  const { setEmail } = useContext(EmailContext);
  const { googleAnalyticsEvent, handleHubspotMutation } = useEventTracker();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
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
    role: UserRole.User,
  });

  useMountOnce(() => {
    googleAnalyticsEvent({
      event: EventName.SIGN_UP_ACCOUNTINFO,
      category: 'Registratieflow',
    });
    handleHubspotMutation(EventName.SIGN_UP_ACCOUNTINFO);
  });

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData) as {
      [index: string]: string | undefined;
    }
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

    if (name === 'email') {
      setEmail(inputValue as string);
    }

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...formData,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!loading) {
      setFormErrors({});
      try {
        await validationSchema.validate(formData, {
          abortEarly: false,
        });

        register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
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
          role: formData.role,
        });

        router.push(`/registreren/voltooid`);
      } catch (e: any) {
        if (e instanceof ValidationError) {
          const errors: { [index: string]: string | undefined } = {};
          e.inner.forEach((error) => {
            if (error.path && Object.keys(formData).includes(error.path)) {
              errors[error.path] = error.message;
            }
          });
          setFormErrors(errors);
        } else if (e.message === 'Email already exists') {
          setFormErrors({ general: t('auth.register.error.emailExists') });
        } else {
          setFormErrors({ passwordRepeat: t('auth.errors.unknownError') });
        }
      }
    }
  }

  return (
    <>
      <RegistrationForm
        formData={formData}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      ></RegistrationForm>
    </>
  );
}
