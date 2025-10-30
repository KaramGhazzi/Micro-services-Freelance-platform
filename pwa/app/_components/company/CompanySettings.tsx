'use client';
import { useTranslations } from 'next-intl';
import { ValidationError } from 'yup';
import { companySettingsSchema } from '@package/types/dist/yup/pwa/company-settings.schema';
import { Countries, FirstDisplayedCountries } from '@package/types';
import React, { useContext, useEffect, useState } from 'react';
import Modal from '../BaseDialog';
import BaseHeading from '../BaseHeading';
import IconCheckmarkMd from '../icons/IconCheckmarkMd';
import BaseInput from '@/app/_components/BaseInput';
import BaseButton from '@/app/_components/BaseButton';
import IconCheckmarkSm from '@/app/_components/icons/IconCheckmarkSm';
import { useUpdateCompanyMutation } from '@/graphql/mutations/companies/updateCompany.generated';
import { useUpdateCompanyTypeMutation } from '@/graphql/mutations/companies/updateCompanyType.generated';
import { useEndProContractMutation } from '@/graphql/mutations/contract/endProContract.generated';
import BaseSelect from '@/app/_components/BaseSelect';
import { Address, Company, CompanyType } from '@/graphql/types';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import usePermissions from '@/app/_libs/usePermissions';
import { SelectedCompanyLayoutContext } from '@/app/admin/bedrijven/[companyId]/layout';
import { useAuth } from '@/app/_hooks/useAuth';

interface FormData {
  [x: string]: any;

  cocNumber?: string | null;
  vatNumber?: string | null;
  name?: string | null;
  address?: Address | null;
  type?: CompanyType;
  websiteUrl?: string | null;
}

interface ContractFormData {
  endDate: string;
  companyStartDate: string;
}

type FormChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

interface Props {
  companyOverride?: Company;
  isAdmin?: boolean;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getNextDay = (date: Date) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay;
};

const CompanySettings = ({ companyOverride, isAdmin }: Props) => {
  const { hasPermissions } = usePermissions();
  const t = useTranslations();
  const countryNames = useTranslations('countries');
  const { currentCompany } = useAuth();
  const { selectedCompany, hasValidContracts } = useContext(
    SelectedCompanyLayoutContext
  );
  const [companyFormData, setCompanyFormData] = useState<FormData>({
    cocNumber: '',
    vatNumber: '',
    name: '',
    address: {
      addressLine1: '',
      city: '',
      countryCode: Countries.NL,
      postalCode: '',
    } as Address,
    type: undefined,
    websiteUrl: '',
  });

  const [contractFormData, setContractFormData] = useState<ContractFormData>({
    endDate: formatDate(new Date()),
    companyStartDate: formatDate(getNextDay(new Date())),
  });

  const [companyFormErrors, setCompanyFormErrors] = useState(
    copyObjectWithNullValues(companyFormData) as {
      [index: string]: string | any | undefined;
    }
  );

  const validationSchema = companySettingsSchema();
  const [update, { loading }] = useUpdateCompanyMutation();
  const [updateType] = useUpdateCompanyTypeMutation();
  const [endContract] = useEndProContractMutation();
  const company = companyOverride ?? currentCompany;
  const [changed, setChanged] = useState(false);
  const [success, setSuccess] = useState(false);

  const [defaultType, setDefaultType] = useState(CompanyType.Unknown);
  const [chosenType, setChosenType] = useState(CompanyType.Unknown);
  const [unknownError, setUnknownError] = useState(false);
  const [changeable, setChangeable] = useState(false);
  const [endFreelancerModal, setEndFreelancerModal] = useState(false);
  const singleUserOptions = [
    CompanyType.Client,
    CompanyType.Intermediar,
    CompanyType.Seconder,
  ];
  const [addUserConfirmModal, setAddUserConfirmModal] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const freelancerCocNumberChangeLink =
    'https://helpcenter.freelance.nl/freelancer/hoe-kan-ik-mijn-kvk-nummer-wijzigen';
  const companyCocNumberChangeLink =
    'https://helpcenter.freelance.nl/organisatie/hoe-kan-ik-mijn-kvk-nummer-aanpassen';

  useEffect(() => {
    if (company) {
      const { cocNumber, vatNumber, name, type, websiteUrl } = company;
      const address = company.address as Address;

      setCompanyFormData({
        cocNumber,
        vatNumber,
        name,
        address,
        type,
        websiteUrl,
      });

      setDefaultType(type as CompanyType);
      setChangeable(checkType(type));
      setDisabled(!hasPermissions(['company:update']));
    }
  }, [company]);

  const handleCompanyInformationChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;

    setSuccess(false);
    setChanged(companyFormData[name as keyof FormData] !== value);

    setCompanyFormData((prevFormData: FormData) => {
      if (name.startsWith('address.')) {
        const fieldName = name.replace('address.', '');
        return {
          ...prevFormData,
          address: {
            ...prevFormData.address,
            [fieldName]: value,
          },
        };
      } else if (name === 'type') {
        const isFreelancerTypeChange =
          defaultType === CompanyType.Freelancer &&
          singleUserOptions.includes(value as CompanyType) &&
          hasValidContracts;

        if (isFreelancerTypeChange) {
          setChosenType(value as CompanyType);
          setEndFreelancerModal(true);
          return prevFormData; // No change to formData, only side effects
        }
      }

      // General case for other fields
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const endContractSubmit = async () => {
    if (!selectedCompany?.id) {
      console.error('Selected company ID is undefined.');
      setUnknownError(true);
      return;
    }

    try {
      const res = await endContract({
        variables: {
          companyId: Number(selectedCompany.id),
          proEndDate: contractFormData.endDate,
          basicCompanyStartDate: contractFormData.companyStartDate,
        },
      });

      if (res.data?.endProContract?.isSuccessful) {
        setCompanyFormData((prevFormData) => ({
          ...prevFormData,
          type: chosenType,
        }));

        await updateCompanyType(chosenType);

        setEndFreelancerModal(false);
        setAddUserConfirmModal(true);
      } else {
        console.error('Failed to end contract: ', res.errors);
        setUnknownError(true);
      }
    } catch (error) {
      console.error('Error ending contract: ', error);
      setUnknownError(true);
    }
  };

  const hasMultipleUsers = (company: Company | undefined): boolean => {
    return !!(
      company?.companyUsers?.length && company?.companyUsers?.length > 1
    );
  };

  const checkType = (type: CompanyType) => {
    return (
      singleUserOptions.includes(type) && hasMultipleUsers(selectedCompany)
    );
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSuccess(false);
    setCompanyFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
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
        companyFormData[object as keyof FormData] ||
        companyFormData[object as keyof FormData]?.[key as keyof object]
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

    if (error.path && Object.keys(companyFormData).includes(error.path)) {
      errors[error.path] = error.message;
    }
    return errors;
  };

  const updateCompanyType = async (type: CompanyType) => {
    if (type !== CompanyType.Unknown && type !== defaultType) {
      const newType = await updateType({
        variables: {
          companyId: Number(company?.id),
          type: type,
        },
      });

      if (newType) {
        setDefaultType(newType.data?.companyTypeUpdate as CompanyType);
        setChanged(false);
      } else {
        setUnknownError(true);
      }
    }
  };

  const handleCompanyFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!loading) {
      setCompanyFormErrors({});
      setUnknownError(false);

      try {
        const validatedData = await validationSchema.validate(companyFormData, {
          abortEarly: false,
        });

        if (validatedData.websiteUrl != companyFormData.websiteUrl) {
          setCompanyFormData((prevFormData) => ({
            ...prevFormData,
            websiteUrl: validatedData.websiteUrl,
          }));
        }

        const updatedCompany = await update({
          variables: {
            where: { id: Number(company?.id) },
            data: {
              vatNumber: validatedData?.vatNumber?.toUpperCase(),
              name: validatedData?.name,
              websiteUrl: validatedData?.websiteUrl,
              address: {
                update: {
                  data: {
                    addressLine1: validatedData?.address?.addressLine1,
                    postalCode: validatedData?.address?.postalCode,
                    city: validatedData?.address?.city,
                    countryCode: validatedData?.address?.countryCode,
                  },
                },
              },
            },
          },
        });

        if (updatedCompany) {
          await updateCompanyType(companyFormData.type as CompanyType);
        }

        setSuccess(true);
      } catch (e: any) {
        if (e instanceof ValidationError) {
          let errors: { [index: string]: string | undefined } = {};
          e.inner.forEach((error) => {
            const newErrors = getError(error, errors);
            errors = { ...errors, ...newErrors };
          });
          setCompanyFormErrors(errors);
        } else {
          setUnknownError(true);
        }
      }
    }
  };

  const handleEndContractFormChange = (e: FormChangeEvent) => {
    setContractFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
        ['companyStartDate']: formatDate(getNextDay(new Date(e.target.value))),
      };
    });
  };

  return (
    <>
      <Modal
        isOpen={addUserConfirmModal}
        onClose={() => setAddUserConfirmModal(false)}
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
            {t('global.proContractEnded')}
          </BaseHeading>
          <p>{t('global.proContractEndedText')}</p>
        </div>
      </Modal>

      <Modal
        isOpen={endFreelancerModal}
        onClose={() => setEndFreelancerModal(false)}
        title="End Freelancer PRO"
        footer={
          <>
            <BaseButton
              theme="secondary"
              onClick={() => setEndFreelancerModal(false)}
            >
              {t('global.close')}
            </BaseButton>
            <BaseButton
              theme="primary"
              onClick={() => {
                endContractSubmit();
              }}
            >
              {t('company-settings.endFreelancer.endFreelancerButton')}
            </BaseButton>
          </>
        }
      >
        <div className="grid gap-6 ">
          {t('company-settings.endFreelancer.endFreelancerText')}

          <div className="grid gap-3">
            <BaseInput
              label={t('company-settings.endFreelancer.endDate')}
              name="endDate"
              value={contractFormData.endDate}
              onChange={handleEndContractFormChange}
              type="date"
            />
            <BaseInput
              label={t('company-settings.endFreelancer.companyStartDate')}
              name="startDate"
              value={contractFormData.companyStartDate}
              onChange={handleEndContractFormChange}
              type="date"
              disabled
            />
          </div>
        </div>
      </Modal>
      <form onSubmit={handleCompanyFormSubmit}>
        <div className="divide-y divide-gray-200 px-5 py-8 lg:p-10">
          <fieldset disabled={disabled}>
            <div className="grid max-w-4xl grid-cols-1 gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
              <div className="col-span-1 grid h-fit gap-1">
                <div>
                  <h1 className="font-semibold text-neutral-900">
                    {t('company-settings.company-registration')}
                  </h1>
                </div>
                <div>
                  <p className="text-xs leading-5 text-neutral-500">
                    {t('company-settings.company-registration-description')}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('company-settings.kvk.label')}
                    placeholder={t('company-settings.kvk.placeholder')}
                    name="cocNumber"
                    required
                    type="text"
                    value={companyFormData?.cocNumber}
                    onChange={handleCompanyInformationChange}
                    disabled={true}
                  />
                </div>
                {isAdmin ? (
                  <div className="text-sm font-medium text-neutral-700">
                    <BaseSelect
                      label={t('company-settings.type.label')}
                      name="type"
                      helper={(() => {
                        if (
                          selectedCompany?.type === CompanyType.Freelancer &&
                          hasValidContracts
                        ) {
                          return t('company-settings.type.freelancer-helper');
                        } else if (
                          singleUserOptions.includes(
                            selectedCompany?.type as CompanyType
                          ) &&
                          selectedCompany?.companyUsers &&
                          selectedCompany.companyUsers.length > 1
                        ) {
                          return t('company-settings.type.helper');
                        } else {
                          return '';
                        }
                      })()}
                      value={companyFormData.type}
                      onChange={handleCompanyInformationChange}
                      disabled={changeable}
                    >
                      <option value={`${CompanyType.Client}`}>
                        {t(`company.type.${CompanyType.Client}`)}
                      </option>
                      <option value={`${CompanyType.Freelancer}`}>
                        {t(`company.type.${CompanyType.Freelancer}`)}
                      </option>
                      <option value={`${CompanyType.Intermediar}`}>
                        {t(`company.type.${CompanyType.Intermediar}`)}
                      </option>
                      <option value={`${CompanyType.Seconder}`}>
                        {t(`company.type.${CompanyType.Seconder}`)}
                      </option>
                    </BaseSelect>
                  </div>
                ) : (
                  <div className="grid content-center gap-1 lg:pt-6">
                    <p className="text-xs font-semibold  text-neutral-900">
                      {t('company-settings.change-kvk.title')} <br />
                    </p>
                    <p className="text-xs font-normal text-neutral-700">
                      <a
                        className="text-primary-600"
                        href={`${
                          company?.type === CompanyType.Freelancer
                            ? freelancerCocNumberChangeLink
                            : companyCocNumberChangeLink
                        }`}
                      >
                        {t('company-settings.change-kvk.contact-link')}
                      </a>{' '}
                      {t('company-settings.change-kvk.contact-text')}
                    </p>
                  </div>
                )}
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('company-settings.company-name.label')}
                    placeholder={t('company-settings.company-name.placeholder')}
                    name="name"
                    required
                    type="text"
                    value={companyFormData.name}
                    onChange={handleCompanyInformationChange}
                    error={companyFormErrors['name']}
                  />
                </div>
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('company-settings.vat.label', {
                      country: companyFormData?.address?.countryCode,
                    })}
                    placeholder={t('company-settings.vat.placeholder', {
                      country: companyFormData.address?.countryCode,
                    })}
                    name="vatNumber"
                    type="text"
                    value={companyFormData.vatNumber}
                    onChange={handleCompanyInformationChange}
                    error={companyFormErrors['vatNumber']}
                  />
                </div>
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('company-settings.address.label')}
                    placeholder={t('company-settings.address.placeholder')}
                    name="address.addressLine1"
                    required
                    type="text"
                    value={companyFormData?.address?.addressLine1}
                    onChange={handleCompanyInformationChange}
                    error={companyFormErrors.address?.addressLine1 as string}
                  />
                </div>
                <div className="text-sm font-medium text-neutral-700 lg:w-1/2">
                  <BaseInput
                    label={t('company-settings.zip-code.label')}
                    placeholder={t('company-settings.zip-code.placeholder', {
                      country: companyFormData?.address?.countryCode,
                    })}
                    name="address.postalCode"
                    type="text"
                    required
                    value={companyFormData?.address?.postalCode}
                    onChange={handleCompanyInformationChange}
                    error={companyFormErrors?.address?.postalCode as string}
                  />
                </div>
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('company-settings.city.label')}
                    name="address.city"
                    type="text"
                    placeholder={t('company-settings.city.placeholder')}
                    required
                    value={companyFormData?.address?.city}
                    onChange={handleCompanyInformationChange}
                    error={companyFormErrors?.address?.city as string}
                  />
                </div>
                <div className="text-sm font-medium text-neutral-700">
                  <BaseSelect
                    label={t('company-settings.country.label')}
                    name="country"
                    value={companyFormData?.address?.countryCode}
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
                <div className="text-sm font-medium text-neutral-700">
                  <BaseInput
                    label={t('company-settings.website.label')}
                    name="websiteUrl"
                    type="text"
                    placeholder={t('company-settings.website.placeholder')}
                    value={companyFormData?.websiteUrl}
                    onChange={handleCompanyInformationChange}
                    error={companyFormErrors?.websiteUrl}
                  />
                </div>
                <div className="flex items-center pt-4 lg:col-span-2">
                  <div className="flex justify-center text-sm font-medium text-neutral-700 lg:block">
                    <BaseButton disabled={!changed} type="submit" size="md">
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
                        {t('account.errorMessage')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </>
  );
};
export default CompanySettings;
