'use client';

import { loginSchema } from '@package/types/dist/yup/auth/login.schema';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { ValidationError } from 'yup';
import AuthTitle from '../_components/AuthTitle';
import FeatureFlagContext from '@/app/(dashboard)/_context/FeatureFlagContext';
import BaseAlert from '@/app/_components/BaseAlert';
import BaseButton from '@/app/_components/BaseButton';
import BaseInput from '@/app/_components/BaseInput';
import PickCompanyModal from '@/app/_components/user/PickCompanyModal';
import { useAuth } from '@/app/_hooks/useAuth';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import { UserRole } from '@/graphql/types';

interface FormData {
  email: string;
  password: string;
}

export default function Page() {
  const t = useTranslations();
  const validationSchema = loginSchema();
  const { loginEnabled } = useContext(FeatureFlagContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pickCompanyModelActive, setPickCompanyModelActive] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const { loginWithPassword, switchCompany, loading, currentUser } = useAuth();

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData) as {
      [index: string]: string | undefined;
    }
  );

  const redirect = async () => {
    const redirect = searchParams.get('redirect');

    if (redirect?.startsWith('/') && !redirect?.startsWith('//')) {
      router.push(redirect);
    } else if (currentUser?.role === UserRole.Admin) {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.userCompanies || !currentUser.userCompanies.length) {
        router.push('/account-voltooien');
      } else {
        if (currentUser.userCompanies?.length > 1) {
          setPickCompanyModelActive(true);
        } else {
          switchCompany(currentUser.userCompanies[0].company.id);

          redirect();
        }
      }
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loading) {
      setFormErrors({});

      try {
        await validationSchema.validate(formData, { abortEarly: false });
        await loginWithPassword(formData.email, formData.password);
      } catch (e: any) {
        if (e instanceof ValidationError) {
          const errors: { [index: string]: string | undefined } = {};
          e.inner.forEach((error) => {
            if (error.path && Object.keys(formData).includes(error.path)) {
              errors[error.path] = error.message;
            }
          });
          setFormErrors(errors);
        } else {
          setFormErrors({ password: t('auth.errors.' + e.message) });
        }
      }
    }
  };

  return (
    <>
      <form className="grid gap-6" onSubmit={handleFormSubmit}>
        <BaseAlert
          title={t('global.loginNotAvailableTitle')}
          text={t('global.loginNotAvailableText')}
          theme="warning"
          alertDisabled={loginEnabled}
        />
        <AuthTitle>{t('auth.login')}</AuthTitle>
        <BaseInput
          label={t('auth.email.label')}
          placeholder={t('auth.email.placeholder')}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          error={formErrors['email']}
        />
        <BaseInput
          label={t('auth.password.label')}
          placeholder={t('auth.password.placeholder')}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          error={formErrors['password']}
        />
        <div>
          <Link
            href="/wachtwoord-vergeten"
            className="text-primary-600 text-sm font-medium hover:underline"
          >
            {t('auth.forgotPassword')}
          </Link>
        </div>
        <div>
          <BaseButton wide loading={loading} type="submit">
            {t('auth.login')}
          </BaseButton>
        </div>
        <div>
          <p className="text-center text-sm text-neutral-700">
            {t('auth.noAccount')}&nbsp;
            <Link
              href="/registreren"
              className="text-primary-600 text-sm font-medium hover:underline"
            >
              {t('auth.createNewAccount')}
            </Link>
          </p>
        </div>
        <PickCompanyModal
          redirect={false}
          isOpen={pickCompanyModelActive}
          onClose={async () => {
            await redirect();
          }}
        />
      </form>
    </>
  );
}
