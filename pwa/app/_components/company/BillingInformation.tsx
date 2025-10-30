'use client';
import { useTranslations } from 'next-intl';
import { ValidationError } from 'yup';
import React, { useEffect, useState } from 'react';
import { billingSettingsSchema } from '@package/types/dist/yup/pwa/billing-settings.schema';
import { Countries, FirstDisplayedCountries } from '@package/types';
import BaseInput from '@/app/_components/BaseInput';
import BaseSelect from '@/app/_components/BaseSelect';
import BaseButton from '@/app/_components/BaseButton';
import IconCheckmarkSm from '@/app/_components/icons/IconCheckmarkSm';
import { useUpdateCompanyMutation } from '@/graphql/mutations/companies/updateCompany.generated';
import { Address, Company } from '@/graphql/types';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import usePermissions from '@/app/_libs/usePermissions';
import { useAuth } from '@/app/_hooks/useAuth';

interface FormData {
  billingEmail?: string | null;
  billingAddress?: Address | null;
}

type FormChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

interface Props {
  companyOverride?: Company;
}

const BillingInformation = ({ companyOverride }: Props) => {
  const t = useTranslations();
  const countryNames = useTranslations('countries');

  const { hasPermissions } = usePermissions();
  const { currentCompany } = useAuth();

  const [billingFormData, setBillingFormData] = useState<FormData>({
    billingEmail: '',
    billingAddress: {
      addressLine1: '',
      city: '',
      countryCode: Countries.NL,
      postalCode: '',
    } as Address,
  });

  const [billingFormErrors, setBillingFormErrors] = useState(
    copyObjectWithNullValues(billingFormData) as {
      [index: string]: string | any | undefined;
    }
  );

  const validationSchema = billingSettingsSchema();
  const [update, { loading }] = useUpdateCompanyMutation();

  const company = companyOverride ?? currentCompany;

  const [changed, setChanged] = useState(false);
  const [success, setSuccess] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (company) {
      const { billingEmail } = company;
      const billingAddress = company.billingAddress as Address;

      setBillingFormData({
        billingEmail,
        billingAddress,
      });
      setDisabled(!hasPermissions(['company:update']));
    }
  }, [company]);

  const handleBillingInformationChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;

    setSuccess(false);
    setChanged(billingFormData[name as keyof FormData] !== value);

    setBillingFormData((prevFormData: any) => {
      if (name.startsWith('billingAddress.')) {
        const fieldName = name.replace('billingAddress.', '');
        return {
          ...prevFormData,
          billingAddress: {
            ...prevFormData.billingAddress,
            [fieldName]: value,
          },
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBillingFormData((prevFormData) => ({
      ...prevFormData,
      billingAddress: {
        ...prevFormData.billingAddress,
        countryCode: event.target.value,
      } as Address,
    }));

    setChanged(true);
  };

  const getError = (error: ValidationError, oldErrors: any) => {
    let object: any;
    let key: any;

    let errors: { [index: string]: any | undefined } = {};
    if (error.path?.includes('.')) {
      [object, key] = error.path.split('.');
      if (
        billingFormData[object as keyof FormData] ||
        billingFormData[object as keyof FormData]?.[key as keyof object]
      ) {
        if (oldErrors[object]) {
          errors[object] = {
            ...oldErrors[object],
            [key]: error.message,
          };
        } else {
          errors[object] = {};
          errors[object][key] = error.message;
        }
      }
    }
    if (error.path && Object.keys(billingFormData).includes(error.path)) {
      errors[error.path] = error.message;
    }
    return errors;
  };

  async function handleBillingFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!loading) {
      setBillingFormErrors({});
      setUnknownError(false);

      try {
        await validationSchema.validate(billingFormData, { abortEarly: false });

        update({
          variables: {
            where: { id: Number(company?.id) },
            data: {
              billingEmail: billingFormData.billingEmail,
              billingAddress: {
                connectOrCreate: {
                  where: {
                    id: Number(billingFormData?.billingAddress?.id ?? -1),
                  },
                  create: {
                    addressLine1:
                      billingFormData?.billingAddress?.addressLine1 ?? '',
                    postalCode:
                      billingFormData?.billingAddress?.postalCode ?? '',
                    city: billingFormData?.billingAddress?.city ?? '',
                    countryCode:
                      billingFormData?.billingAddress?.countryCode ??
                      Countries.NL,
                  },
                },
                update: {
                  data: {
                    addressLine1:
                      billingFormData?.billingAddress?.addressLine1 ?? '',
                    postalCode:
                      billingFormData?.billingAddress?.postalCode ?? '',
                    city: billingFormData?.billingAddress?.city ?? '',
                    countryCode:
                      billingFormData?.billingAddress?.countryCode ??
                      Countries.NL,
                  },
                },
              },
            },
          },
          onCompleted: () => {
            setChanged(false);
            setSuccess(true);
          },
        });
      } catch (e: any) {
        if (e instanceof ValidationError) {
          let errors: { [index: string]: string | undefined } = {};
          e.inner.forEach((error) => {
            const newErrors = getError(error, errors);
            errors = { ...errors, ...newErrors };
          });
          setBillingFormErrors(errors);
        } else {
          setUnknownError(true);
        }
      }
    }
  }

  return (
    <form onSubmit={handleBillingFormSubmit}>
      <div className="divide-y divide-gray-200 px-5 py-8 lg:p-10">
        <fieldset disabled={disabled}>
          <div className="grid max-w-4xl grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-10">
            <div className="grid h-fit gap-1 lg:col-span-1">
              <h1 className="font-semibold text-neutral-900">
                {t('account.billingInformation')}
              </h1>
            </div>
            <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
              <div className="text-sm font-medium text-neutral-700">
                <BaseInput
                  label={t('account.email.label')}
                  placeholder={t('account.email.placeholder')}
                  name="billingEmail"
                  type="text"
                  required
                  value={billingFormData.billingEmail}
                  onChange={handleBillingInformationChange}
                  error={billingFormErrors['billingEmail']}
                />
              </div>
              <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('account.address.label')}
                    placeholder={t('account.address.placeholder')}
                    name="billingAddress.addressLine1"
                    type="text"
                    required
                    value={billingFormData.billingAddress?.addressLine1}
                    onChange={handleBillingInformationChange}
                    error={
                      billingFormErrors.billingAddress?.addressLine1 as string
                    }
                  />
                </div>
                <div className="text-sm font-medium text-neutral-700 lg:w-1/2">
                  <BaseInput
                    label={t('account.zipcode.label')}
                    placeholder={t('account.zipcode.placeholder', {
                      country: billingFormData.billingAddress?.countryCode,
                    })}
                    name="billingAddress.postalCode"
                    type="text"
                    required
                    value={billingFormData?.billingAddress?.postalCode}
                    onChange={handleBillingInformationChange}
                    error={
                      billingFormErrors.billingAddress?.postalCode as string
                    }
                  />
                </div>
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('account.city.label')}
                    placeholder={t('account.city.placeholder')}
                    name="billingAddress.city"
                    type="text"
                    required
                    value={billingFormData?.billingAddress?.city}
                    onChange={handleBillingInformationChange}
                    error={billingFormErrors.billingAddress?.city as string}
                  />
                </div>
                <div className="text-sm font-medium text-neutral-700">
                  <BaseSelect
                    label={t('account.country')}
                    name="billingAddress.country"
                    value={billingFormData?.billingAddress?.countryCode}
                    onChange={handleCountryChange}
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
              </div>
              <div className="flex items-center pt-4 lg:col-span-2">
                <div className="flex justify-center text-sm font-medium text-neutral-700 lg:block">
                  <BaseButton
                    disabled={!changed}
                    loading={loading}
                    type="submit"
                    size="md"
                  >
                    {t('account.saveChanges')}
                  </BaseButton>
                </div>
                {success && (
                  <div className="text-success-400 flex flex-nowrap items-center px-4 text-sm">
                    <IconCheckmarkSm />
                    <p className="text-xs">{t('account.successMessage')}</p>
                  </div>
                )}
                {unknownError && (
                  <div className="flex flex-nowrap items-center px-4 text-sm text-red-500">
                    <p className="text-error-600 text-xs font-medium">
                      {t('errorMessage')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </form>
  );
};
export default BillingInformation;
