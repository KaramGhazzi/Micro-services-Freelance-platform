'use client';
import { ApolloError } from '@apollo/client';
import { confirmPasswordSchema } from '@package/types/dist/yup/auth/confirm-password.schema';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ValidationError } from 'yup';
import Password, { FormChangeEvent, FormData } from '../_components/Password';
import { useCheckEmailChangeQuery } from '@/graphql/mutations/users/checkEmailChange.generated';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import { useAuth } from '@/app/_hooks/useAuth';
import RedirectMessage from '@/app/(auth)/_components/RedirectMessage';

interface State {
  success: boolean;
  invalid: boolean;
  error: boolean;
  loading: boolean;
}

export default function EditEmailPage({
  params: { token },
}: Readonly<{ params: { token: string } }>) {
  const t = useTranslations();
  const validationSchema = confirmPasswordSchema();
  const router = useRouter();
  const { changeEmail, loading } = useAuth();

  const [status, setStatus] = useState<State>({
    success: false,
    invalid: false,
    error: false,
    loading: false,
  });

  const [success, setSuccess] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    password: '',
  });

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData)
  );
  const [validToken, setValidToken] = useState(true);
  const [confirmed, setConfirmed] = useState<boolean | null>();

  const { refetch: checkEmailChangeQuery, data: checkInviteData } =
    useCheckEmailChangeQuery({ skip: true });

  useEffect(() => {
    if (!token) {
      return;
    }

    // Check if token is still valid
    checkEmailChangeQuery({ token }).then((checkEmailChangeQuery) => {
      const checkEmailChange = checkEmailChangeQuery?.data?.checkEmailChange;
      setValidToken(checkEmailChange?.success);
      setConfirmed(false);
      setStatus({
        ...status,
        loading: false,
      });
    });
  }, [token, checkInviteData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loading) setFormErrors({});

    setStatus({ success: false, invalid: false, error: false, loading: true });

    try {
      await validationSchema.validate(formData, {
        abortEarly: false,
      });

      await changeEmail(token, formData.password);

      setStatus((status) => ({ ...status, success: true }));
    } catch (error: any) {
      setStatus((status) => ({ ...status, success: false }));

      if (error instanceof ValidationError) {
        const errors: { [index: string]: string | undefined } = {};
        error.inner.forEach((error) => {
          if (error.path && Object.keys(formData).includes(error.path)) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
        setStatus((status) => ({ ...status, invalid: true }));
      } else if (error instanceof ApolloError) {
        setFormErrors({ password: t(`auth.errors.${error.message}`) });
        setStatus((status) => ({ ...status, error: true }));
      } else {
        setFormErrors({ password: t('auth.errors.unknownError') });
        setUnknownError(true);
        setStatus((status) => ({ ...status, error: true }));
      }
    } finally {
      setStatus((status) => ({ ...status, loading: false }));
    }
  };

  const handleInputChange = async (e: FormChangeEvent) => {
    const { name, value } = e.target;

    setSuccess(false);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const redirect = () => {
    router.push('/dashboard');
  };

  if (status?.loading) {
    return (
      <RedirectMessage
        title={t('global.invitationChecking')}
        redirect={redirect}
        loading={true}
        success={false}
      />
    );
  }

  if (!status?.success && validToken && !confirmed) {
    return (
      <Password
        loading={loading}
        passwordFormData={formData}
        passwordFormDataErrors={formErrors}
        success={success}
        unknownError={unknownError}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    );
  } else if (confirmed) {
    return (
      <RedirectMessage
        title={t('global.emailChangeConfirmed')}
        redirect={redirect}
        loading={status?.loading}
        success={true}
      />
    );
  } else if (!validToken) {
    return (
      <RedirectMessage
        title={t('global.invalidEmailChangeToken')}
        redirect={redirect}
        loading={status?.loading}
        success={false}
      />
    );
  } else {
    return (
      <RedirectMessage
        title={t('global.emailChangedSuccess')}
        redirect={redirect}
        loading={status?.loading}
        success={true}
      />
    );
  }
}
