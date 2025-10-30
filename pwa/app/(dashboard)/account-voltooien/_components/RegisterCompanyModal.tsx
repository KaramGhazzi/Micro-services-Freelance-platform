import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Countries, FirstDisplayedCountries } from '@package/types';
import { companyRegistrationNumberSchema } from '@package/types/dist/yup/pwa/company-registration-number.schema';
import { ValidationError } from 'yup';
import { CurrentUser } from '@/app/(dashboard)/_context/CurrentUserContext';
import Modal from '@/app/_components/BaseDialog';
import BaseButton from '@/app/_components/BaseButton';
import BaseInput from '@/app/_components/BaseInput';
import BaseSelect from '@/app/_components/BaseSelect';
import IconCheckmarkCircleFill from '@/app/_components/icons/IconCheckmarkCircleFill';
import IconRefreshArrows from '@/app/_components/icons/IconRefreshArrows';
import { useCompanyCreateMutation } from '@/graphql/mutations/companies/createCompany.generated';
import IconXSm from '@/app/_components/icons/IconXSm';
import { useRequestInvitationMutation } from '@/graphql/mutations/users/requestInvitation.generated';
import CocNumberSearchNL from '@/app/(dashboard)/account-voltooien/_components/CocNumberSearchNL';
import { useCompanyCheckQuery } from '@/graphql/queries/companies/companyCheck.generated';
import { VerificationCountryCodes, CompanyType } from '@/graphql/types';
import { useVerificationGetCompanyQuery } from '@/graphql/queries/verification/getCompany.generated';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import { useAuth } from '@/app/_hooks/useAuth';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';
interface RegisterCompanyModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  onRequestInvite: (success: boolean) => void;
  user?: CurrentUser;
  type: CompanyType;
}

interface RegisterFormData {
  cocNumber?: string | null;
  billingEmail?: string | null;
  name?: string | null;
  addressLine1: string;
  postalCode: string;
  city: string;
  countryCode: string;
  type: CompanyType;
}

const RegisterCompanyModal: React.FC<RegisterCompanyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onRequestInvite,
  user,
  type,
}) => {
  const t = useTranslations('');
  const { googleAnalyticsEvent, handleHubspotMutation } = useEventTracker();
  const countryNames = useTranslations('countries');
  const validationSchema = companyRegistrationNumberSchema();
  const { switchCompany, refetchMe } = useAuth();

  const [registerCompanyFormData, setRegisterCompanyFormData] =
    useState<RegisterFormData>({
      cocNumber: '',
      billingEmail: user?.email,
      name: '',
      addressLine1: '',
      postalCode: '',
      city: '',
      countryCode: 'NL',
      type: CompanyType.Unknown,
    });
  const [selectedSearchResult, setSelectedSearchResult] = useState<any>([]);
  const [selectedFullResult, setSelectedFullResult] = useState<any>([]);
  const [existingAccount, setExistingAccount] = useState(false);
  const [existingAccountWithUsers, setExistingAccountWithUsers] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [createCompany] = useCompanyCreateMutation();
  const [requestInvitation] = useRequestInvitationMutation();
  const { refetch: refetchCheckCompany } = useCompanyCheckQuery({ skip: true });
  const { refetch: refetchGetCompany } = useVerificationGetCompanyQuery({
    skip: true,
  });

  useEffect(() => {
    if (user) {
      setRegisterCompanyFormData({
        ...registerCompanyFormData,
        billingEmail: user.email,
      });
    }

    if (type) {
      setRegisterCompanyFormData({
        ...registerCompanyFormData,
        type,
      });
    }
  }, [user, type]);

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(registerCompanyFormData) as {
      [index: string]: string | undefined;
    }
  );

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    reset(event.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleforeignCompanyInputChange = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const companyExists = await refetchCheckCompany({
      cocNumber: e.target.value,
      cocCountry: registerCompanyFormData.countryCode,
    });

    if (companyExists?.data?.companyCheck?.cocNumber) {
      setSelectedFullResult(companyExists.data?.companyCheck);
      setSelectedSearchResult({
        ...companyExists.data?.companyCheck,
        identificationNumber: companyExists.data?.companyCheck?.cocNumber,
        address: companyExists.data?.companyCheck?.address?.addressLine1,
        city: companyExists.data?.companyCheck?.address?.city,
      });

      setExistingAccount(true);
      setExistingAccountWithUsers(true);
    }
  };

  const updateFormData = (key: string, value: unknown) => {
    setRegisterCompanyFormData(
      (prevRegisterCompanyFormData: RegisterFormData) => ({
        ...prevRegisterCompanyFormData,
        [key]: value,
      })
    );
  };

  const reset = (countryCode?: string) => {
    setFormErrors({});
    setExistingAccount(false);
    setExistingAccountWithUsers(false);
    setSelectedFullResult('');
    setRegisterCompanyFormData({
      cocNumber: '',
      billingEmail: user?.email,
      name: '',
      addressLine1: '',
      postalCode: '',
      city: '',
      countryCode: countryCode ?? 'NL',
      type,
    });
  };

  const close = () => {
    reset();
    onClose();
  };

  const linkAccount = async () => {
    const result = await requestInvitation({
      variables: { cocNumber: selectedFullResult.identificationNumber },
    });
    close();
    onRequestInvite(!!result?.data?.requestInvitation?.success);
  };

  const confirm = async () => {
    setLoading(true);
    setFormErrors({});

    try {
      const validatedData = await validationSchema.validate(
        registerCompanyFormData,
        {
          abortEarly: false,
        }
      );

      const response = await createCompany({
        variables: {
          data: {
            type: validatedData.type,
            cocNumber: validatedData.cocNumber,
            cocCountry: validatedData.countryCode,
            name: validatedData.name,
            billingEmail: user?.email,
            address: {
              create: {
                name: validatedData.name,
                addressLine1: validatedData.addressLine1,
                postalCode: validatedData.postalCode,
                city: validatedData.city,
                countryCode: validatedData.countryCode,
              },
            },
            billingAddress: {
              create: {
                name: validatedData.name,
                addressLine1: validatedData.addressLine1,
                postalCode: validatedData.postalCode,
                city: validatedData.city,
                countryCode: validatedData.countryCode,
              },
            },
          },
        },
      });
      if (response && response.data) {
        const me = await refetchMe();

        switchCompany(response.data?.companyCreate.id, me.data.me);
      }

      handleHubspotMutation(EventName.SIGN_UP_FINALIZED);
      googleAnalyticsEvent({
        event: EventName.SIGN_UP_FINALIZED,
        category: 'Registratieflow',
        email: user?.email,
        companyType: validatedData.type,
      });

      onConfirm();
    } catch (e: any) {
      if (e instanceof ValidationError) {
        const errors: { [index: string]: string | undefined } = {};
        e.inner.forEach((error) => {
          if (
            error.path &&
            Object.keys(registerCompanyFormData).includes(error.path)
          ) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const setSelectedCompany = async (selectedCompany: any) => {
    const companyExists = await refetchCheckCompany({
      cocNumber: selectedCompany.identificationNumber,
      cocCountry: registerCompanyFormData.countryCode,
    });

    if (companyExists?.data?.companyCheck?.cocNumber) {
      setExistingAccount(true);
      if (companyExists?.data?.companyCheck?.hasActiveUsers) {
        setExistingAccountWithUsers(true);
      } else {
        setExistingAccountWithUsers(false);
      }
    }

    const { data } = await refetchGetCompany({
      countryCode:
        registerCompanyFormData.countryCode as VerificationCountryCodes,
      identificationNumber: selectedCompany.identificationNumber,
    });

    setSelectedSearchResult(selectedCompany);
    setSelectedFullResult(data?.verificationGetCompany);

    let addressLine = '';

    if (
      data?.verificationGetCompany?.street &&
      data?.verificationGetCompany?.houseNumber
    ) {
      addressLine = `${data.verificationGetCompany.street} ${data.verificationGetCompany.houseNumber}`;
    } else {
      addressLine = data?.verificationGetCompany?.fullAddress || '';
    }

    setRegisterCompanyFormData({
      cocNumber: data?.verificationGetCompany?.identificationNumber,
      name: data?.verificationGetCompany?.name,
      billingEmail: user?.email,
      addressLine1: addressLine,
      postalCode: data?.verificationGetCompany?.postalCode ?? '',
      city: data?.verificationGetCompany?.city ?? '',
      countryCode: registerCompanyFormData.countryCode,
      type: registerCompanyFormData.type,
    });
  };

  const linkTranslation = (chunks: React.ReactNode) => (
    // TODO: Change to correct link
    <Link href="" onClick={linkAccount} className="underline">
      {chunks}
    </Link>
  );

  const renderCompanyRegisterForm = (isNL: boolean) => {
    return (
      <AnimatePresence>
        {(selectedFullResult.name || !isNL) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid gap-6">
              {selectedFullResult.name && (
                <div
                  className={`${
                    existingAccount ? 'bg-error-50' : 'bg-success-50'
                  } flex gap-4 rounded-xl p-4 text-sm`}
                >
                  <div>
                    {existingAccount ? (
                      <IconXSm className="text-error-400" />
                    ) : (
                      <IconCheckmarkCircleFill className="text-success-600" />
                    )}
                  </div>
                  <div className="grow">
                    <h3 className="font-medium text-neutral-900">
                      {selectedSearchResult.name}
                    </h3>
                    <p className="text-neutral-700">
                      {selectedSearchResult.identificationNumber}
                    </p>
                    <p className="text-neutral-700">{`${selectedSearchResult.address}, ${selectedSearchResult.city}`}</p>
                  </div>
                  <div>
                    <button
                      className="text-success-900 flex cursor-pointer items-center gap-1 font-semibold"
                      onClick={() => reset()}
                    >
                      <IconRefreshArrows className="text-success-400" />
                      <span>{t('complete.reset')}</span>
                    </button>
                  </div>
                </div>
              )}

              {selectedFullResult.name &&
                existingAccount &&
                existingAccountWithUsers && (
                  <div className="text-warning-700">
                    {t.rich('complete.existingCompanyMessage', {
                      link: linkTranslation,
                    })}
                  </div>
                )}

              {selectedFullResult.name &&
                existingAccount &&
                !existingAccountWithUsers && (
                  <div className="text-warning-700">
                    {t.rich('complete.existingCompanyMessageWithoutUsers', {
                      link: linkTranslation,
                    })}
                  </div>
                )}
              {isNL && (
                <BaseSelect
                  label={t('complete.labelCountry')}
                  name="country"
                  value={registerCompanyFormData.countryCode}
                  onChange={handleCountryChange}
                  disabled
                  required
                >
                  <option value="NL">{t('countries.NL')}</option>
                </BaseSelect>
              )}

              {!isNL && (
                <>
                  <BaseInput
                    label={t('global.registrationNumber')}
                    placeholder={t('global.registrationNumber')}
                    name="cocNumber"
                    value={registerCompanyFormData.cocNumber}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    onBlur={handleforeignCompanyInputChange}
                    type="text"
                    required
                    error={formErrors['cocNumber']}
                  />

                  <BaseInput
                    label={t('global.company')}
                    placeholder={t('global.company')}
                    name="name"
                    value={registerCompanyFormData.name}
                    onChange={(e) => handleInputChange(e)}
                    required
                    type="text"
                    error={formErrors['name']}
                  />
                </>
              )}

              <BaseInput
                label={t('complete.labelAddress')}
                placeholder={t('complete.labelAddress')}
                name="addressLine1"
                value={registerCompanyFormData?.addressLine1}
                onChange={(e) => handleInputChange(e)}
                type="text"
                required
                disabled={isNL}
                error={formErrors['addressLine1']}
              />

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <BaseInput
                    label={t('complete.labelZipCode')}
                    placeholder={t('complete.labelZipCode')}
                    name="postalCode"
                    value={registerCompanyFormData?.postalCode}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    required
                    disabled={isNL}
                    error={formErrors['postalCode']}
                  />
                </div>
                <div className="col-span-2">
                  <BaseInput
                    label={t('complete.labelCity')}
                    placeholder={t('complete.labelCity')}
                    name="city"
                    value={registerCompanyFormData?.city}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    disabled={isNL}
                    error={formErrors['city']}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderCocNumberForm = (countryCode: string) => {
    if (countryCode === 'NL') {
      return (
        <>
          {!selectedFullResult.name && (
            <CocNumberSearchNL onSelect={setSelectedCompany} />
          )}
          {renderCompanyRegisterForm(true)}
        </>
      );
    } else {
      return <>{renderCompanyRegisterForm(false)}</>;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title={t('complete.registerCompany')}
      footer={
        <>
          <BaseButton onClick={close} theme="secondary" size="md">
            {t('global.cancel')}
          </BaseButton>
          <BaseButton
            onClick={confirm}
            size="md"
            disabled={!registerCompanyFormData.cocNumber || existingAccount}
            loading={loading}
          >
            {t('complete.registerCompany')}
          </BaseButton>
        </>
      }
    >
      {!selectedFullResult.name && (
        <div className="mb-6 grid gap-6">
          <BaseSelect
            label={t('complete.labelCountry')}
            name="country"
            value={registerCompanyFormData.countryCode}
            onChange={handleCountryChange}
            required
          >
            {Object.keys(FirstDisplayedCountries).map((country) => (
              <option key={country} value={country}>
                {countryNames(country)}
              </option>
            ))}
            {Object.keys(Countries).map((country) => (
              <option key={country} value={country}>
                {countryNames(country)}
              </option>
            ))}
          </BaseSelect>
        </div>
      )}

      {renderCocNumberForm(registerCompanyFormData.countryCode)}
    </Modal>
  );
};
export default RegisterCompanyModal;
