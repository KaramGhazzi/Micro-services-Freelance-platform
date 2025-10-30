'use client';
import { useTranslations } from 'next-intl';
import React, { useState, useContext, useEffect } from 'react';
import { Countries, FirstDisplayedCountries } from '@package/types';
import FeatureFlagContext from '@/app/(dashboard)/_context/FeatureFlagContext';
import BaseSelect from '@/app/_components/BaseSelect';
import BaseInput from '@/app/_components/BaseInput';
import BaseButton from '@/app/_components/BaseButton';

import BaseAlert from '@/app/_components/BaseAlert';
import { useUpdateCompanyMutation } from '@/graphql/mutations/companies/updateCompany.generated';
import { useAuth } from '@/app/_hooks/useAuth';

interface FormData {
  country?: string | null;
  addressLine1?: string | null;
  postalCode?: string | null;
  city?: string | null;
  email?: string | null;
}

interface BillingFormProps {
  handleSubmitSuccess: (
    e: React.FormEvent<HTMLFormElement>,
    formData: FormData
  ) => void;
  backHref: string;
}

const BillingForm: React.FC<BillingFormProps> = ({
  handleSubmitSuccess,
  backHref,
}) => {
  const t = useTranslations();
  const countryNames = useTranslations('countries');
  const { currentCompany } = useAuth();
  const { stripeEnabled } = useContext(FeatureFlagContext);

  const [formIsValid, setFormIsValid] = useState(false);
  const [updateCompany] = useUpdateCompanyMutation();
  const [postalCodeError, setPostalCodeError] = useState('');

  const validatePostalCode = (value: string) => {
    const postalCodePattern = /\d{4}\s?[A-Z]{2}/;

    if (!postalCodePattern.test(value)) {
      setPostalCodeError('Geen geldige postcode');
    } else {
      setPostalCodeError('');
    }
  };

  const [formData, setFormData] = useState<FormData>({
    country: null,
    addressLine1: '',
    postalCode: '',
    city: '',
    email: '',
  });

  useEffect(() => {
    if (currentCompany) {
      setFormData({
        country:
          currentCompany.billingAddress?.countryCode ||
          currentCompany.address?.countryCode,
        addressLine1:
          currentCompany.billingAddress?.addressLine1 ||
          currentCompany.address?.addressLine1,
        postalCode:
          currentCompany.billingAddress?.postalCode ||
          currentCompany.address?.postalCode,
        city:
          currentCompany.billingAddress?.city || currentCompany.address?.city,
        email: currentCompany.billingEmail || currentCompany.email,
      });
    }
  }, [currentCompany]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    updateFormData(name, value);

    if (name === 'postalCode' && postalCodeError.length > 0) {
      validatePostalCode(value);
    }
  };

  const updateFormData = (key: string, value: unknown) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const isValid =
      Object.values(formData).every((value) => value !== '') &&
      formData.email !== null;
    setFormIsValid(isValid);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      updateCompany({
        variables: {
          where: { id: Number(currentCompany?.id) },
          data: {
            billingEmail: formData.email,
            billingAddress: {
              update: {
                data: {
                  addressLine1: formData?.addressLine1 ?? '',
                  postalCode: formData?.postalCode ?? '',
                  city: formData?.city ?? '',
                  countryCode: formData.country,
                },
              },
            },
          },
        },
        onCompleted: () => {
          handleSubmitSuccess(e, formData);
        },
      });
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="flex-grow xl:flex">
        <div className="flex-grow border-neutral-100 bg-white p-5 lg:p-10 xl:border-r">
          {!stripeEnabled && (
            <div className="pb-6">
              <BaseAlert
                title={t('global.paymentNotPossibleTitle')}
                text={t('global.providerUnavailableText')}
                theme="warning"
                alertDisabled={stripeEnabled}
              />
            </div>
          )}

          <form className="grid max-w-4xl gap-10" onSubmit={handleSubmit}>
            <header className="grid gap-1">
              <h2 className="font-heading font-semibold tracking-tight">
                {t('upgrade.billing')}
              </h2>
              <p className="text-sm text-neutral-700">
                {t('upgrade.billingDescription')}
              </p>
            </header>
            <section>
              <div className="grid gap-x-3 gap-y-6 lg:grid-cols-2">
                <div>
                  <BaseInput
                    label={t('upgrade.email')}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('upgrade.emailPlaceholder')}
                    type="email"
                    required
                  />
                </div>
                <div className="hidden lg:block"></div>
                <div>
                  <BaseInput
                    label={t('upgrade.address')}
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder={t('upgrade.addressPlaceholder')}
                    type="text"
                    required
                  />
                </div>
                <div>
                  <BaseSelect
                    label={t('upgrade.country')}
                    placeholder={t('upgrade.countryPlaceholder')}
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    {Object.keys(FirstDisplayedCountries).map((country) => (
                      <option key={country} value={country}>
                        {countryNames(country)}
                      </option>
                    ))}
                    {Object.keys(Countries).map((country) => (
                      <option value={country} key={country}>
                        {countryNames(country)}
                      </option>
                    ))}
                  </BaseSelect>
                </div>
                <div className="grid gap-6 lg:col-span-2 lg:grid-cols-3 lg:gap-x-3">
                  <div className="lg:col-span-1">
                    <BaseInput
                      label={t('upgrade.postalCode')}
                      placeholder={t('upgrade.postalCodePlaceholder')}
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      onBlur={() => {
                        if (formData.postalCode) {
                          validatePostalCode(formData.postalCode);
                        }
                      }}
                      type="text"
                      error={postalCodeError}
                      required
                      pattern="\d{4}\s?[A-Z]{2}"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <BaseInput
                      label={t('upgrade.city')}
                      placeholder={t('upgrade.cityPlaceholder')}
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      type="text"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>
            <footer className="flex justify-between gap-6">
              <BaseButton href={backHref} size={'lg'} theme="secondary">
                {t('upgrade.back')}
              </BaseButton>
              <BaseButton
                type="submit"
                size={'lg'}
                onClick={() => handleSubmit}
                disabled={!formIsValid}
              >
                {t('upgrade.choosePaymentMethod')}
              </BaseButton>
            </footer>
          </form>
        </div>
        <aside className="w-full max-w-sm 2xl:max-w-md" />
      </div>
    </>
  );
};

export default BillingForm;
