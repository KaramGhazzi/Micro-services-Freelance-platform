'use client';
import React, { useState } from 'react';
import { ValidationError } from 'yup';
import { offerFormSchema } from '@package/types/dist/yup/pwa/offer-form.schema';
import { useTranslations } from 'next-intl';
import { useEnvContext } from 'next-runtime-env';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import BaseInput from '@/app/_components/BaseInput';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import BaseTextarea from '@/app/_components/BaseTextarea';
import BaseButton from '@/app/_components/BaseButton';
import Modal from '@/app/_components/BaseDialog';
import BaseConfirmationIcon from '@/app/_components/BaseConfirmationIcon';
import BaseHeading from '@/app/_components/BaseHeading';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import useMountOnce from '@/app/_libs/useMountOnce';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';
import { useAuth } from '@/app/_hooks/useAuth';

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  services: string[];
  contactPreferences: string[];
  question: string;
}

const OfferPage = () => {
  const t = useTranslations();
  const { googleAnalyticsEvent } = useEventTracker();
  const { currentCompany, currentUser } = useAuth();
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const validationSchema = offerFormSchema();
  const [formData, setFormData] = useState<FormData>({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    companyName: currentCompany?.name || '',
    email: currentUser?.email || '',
    phoneNumber: currentUser?.phoneNumber || '',
    services: [],
    contactPreferences: [],
    question: '',
  });

  const envContext = useEnvContext();
  const token =
    envContext['NEXT_PUBLIC_HUBSPOT_API_TOKEN'] ??
    process?.env?.['NEXT_PUBLIC_HUBSPOT_API_TOKEN'];
  const portalId =
    envContext['NEXT_PUBLIC_HUBSPOT_PORTAL_ID'] ??
    process?.env?.['NEXT_PUBLIC_HUBSPOT_PORTAL_ID'];
  const formGuid =
    envContext['NEXT_PUBLIC_HUBSPOT_FORM_GUID'] ??
    process?.env?.['NEXT_PUBLIC_HUBSPOT_FORM_GUID'];
  const apiUrl =
    envContext['NEXT_PUBLIC_HUBSPOT_FORM_SUBMIT_API_URL'] ??
    process?.env?.['NEXT_PUBLIC_HUBSPOT_FORM_SUBMIT_API_URL'];

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData) as {
      [index: string]: string | undefined;
    }
  );

  const resetForm = () => {
    setFormErrors({});
    setFormData({
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      services: [],
      contactPreferences: [],
      question: '',
    });
  };

  const handleInputChange = (
    fieldName: keyof FormData,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let value: string | string[];

    if (fieldName === 'services' || fieldName === 'contactPreferences') {
      const isChecked = (event.target as HTMLInputElement).checked;
      const option = (event.target as HTMLInputElement).name;
      value = isChecked
        ? [...formData[fieldName], option]
        : formData[fieldName].filter((p) => p !== option);
    } else {
      value = event.target.value;
    }

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const serviceOptions = ['Marktmonitor', 'TOP opdrachten', 'Bedrijfsprofiel'];
  const contactOptions = [
    'Bellen',
    'Video bellen',
    'Informatie via e-mail aanvragen',
  ];

  const submitForm = async () => {
    googleAnalyticsEvent({ event: EventName.QUOTE_SUBMIT });

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await fetch(`${apiUrl}/${portalId}/${formGuid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fields: [
            {
              name: 'email',
              value: formData.email,
            },
            {
              name: 'firstname',
              value: formData.firstName,
            },
            {
              name: 'lastname',
              value: formData.lastName,
            },
            {
              name: 'phone',
              value: formData.phoneNumber,
            },
            {
              name: 'name',
              value: formData.companyName,
            },
            {
              name: 'offerteaanvraag_bericht',
              value: formData.question,
            },
            {
              name: 'productinformatie',
              value: `${formData.services}`,
            },
            {
              name: 'contactvoorkeur',
              value: `${formData.contactPreferences}`,
            },
          ],
        }),
      });

      if (response.status === 200) {
        setSuccessModalIsOpen(true);
        resetForm();
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        const errors: { [index: string]: string | undefined } = {};
        e.inner.forEach((error) => {
          if (error.path && Object.keys(formData).includes(error.path)) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      }
    }
  };

  useMountOnce(() => {
    googleAnalyticsEvent({ ecommerce: null });
    googleAnalyticsEvent({
      event: EventName.VIEW_QUOTE,
    });
  });

  return (
    <div className="h-[calc(100dvh-56px)] overflow-y-auto bg-white">
      <BaseToolbarSub
        title={t('global.offerInquiryTitle')}
        subtitle={t('global.offerInquiryText')}
      />

      <form className="max-w-4xl p-5 lg:p-10">
        <div className="grid gap-6 xl:grid-cols-2">
          <div>
            <BaseInput
              label={t('account.firstName.label')}
              placeholder={t('account.firstName.placeholder')}
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e)}
              type="text"
            />
          </div>
          <div>
            <BaseInput
              label={t('account.lastName.label')}
              placeholder={t('account.lastName.placeholder')}
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e)}
              type="text"
            />
          </div>
          <div>
            <BaseInput
              label={t('account.companyName.label')}
              placeholder={t('account.companyName.placeholder')}
              name="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e)}
              type="text"
            />
          </div>
          <div>
            <BaseInput
              label={`${t('account.email.label')}*`}
              placeholder={t('account.email.placeholder')}
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e)}
              type="email"
              error={formErrors['email']}
            />
          </div>
          <div>
            <BaseInput
              label={t('account.phone.label')}
              placeholder={t('account.phone.placeholder')}
              name="phone"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e)}
              type="tel"
            />
          </div>
          <div />
          <div>
            <div className="mb-2 block text-sm font-medium text-neutral-700">
              {t('global.selectServices')}
            </div>
            <div className="flex flex-col flex-wrap gap-1">
              {serviceOptions.map((service) => (
                <div key={service}>
                  <BaseCheckbox
                    label={service}
                    value={service}
                    name={service}
                    checked={formData.services.includes(service)}
                    onChange={(e) => handleInputChange('services', e)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 block text-sm font-medium text-neutral-700">
              {t('global.contactPreferences')}
            </div>
            <div className="flex flex-col flex-wrap gap-1">
              {contactOptions.map((contact) => (
                <div key={contact}>
                  <BaseCheckbox
                    label={contact}
                    value={contact}
                    name={contact}
                    checked={formData.contactPreferences.includes(contact)}
                    onChange={(e) => handleInputChange('contactPreferences', e)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="xl:col-span-2">
            <BaseTextarea
              label={t('global.howCanWeHelp')}
              placeholder={t('global.howCanWeHelpPlaceholder')}
              name="question"
              value={formData.question}
              onChange={(e) => handleInputChange('question', e)}
            />
          </div>
          <div className="flex justify-between gap-6 xl:col-span-2 ">
            <BaseButton
              onClick={submitForm}
              size="lg"
              theme="secondary"
              href="/opdracht-plaatsen/nieuwe-opdracht"
            >
              {t('global.cancel')}
            </BaseButton>
            <BaseButton onClick={submitForm} size="lg">
              {t('global.send')}
            </BaseButton>
          </div>
        </div>
      </form>
      <Modal
        isOpen={successModalIsOpen}
        onClose={() => setSuccessModalIsOpen(false)}
        size="md"
      >
        <BaseConfirmationIcon />
        <div className="mb-8 grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('assignment.modal.formSubmitted')}
          </BaseHeading>
          <p className="text-neutral-500">
            {t('assignment.modal.formSubmittedDescription')}
          </p>
        </div>
        <div className="grid gap-4">
          <BaseButton href="/opdracht-plaatsen/nieuwe-opdracht" wide size="lg">
            {t('assignment.modal.backToOverview')}
          </BaseButton>
        </div>
      </Modal>
    </div>
  );
};

export default OfferPage;
