import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import BaseButton from '../BaseButton';
import IconCheckmarkSm from '../icons/IconCheckmarkSm';
import { User } from '@/graphql/types';
import { useSendPasswordResetEmailMutation } from '@/graphql/mutations/auth/sendPasswordResetEmail.generated';

type Props = {
  user: User | undefined;
};

const ResetPassword: React.FC<Props> = ({ user }) => {
  const t = useTranslations();
  const [success, setSuccess] = useState(false);
  const [passwordResetMutation] = useSendPasswordResetEmailMutation();

  const send = async () => {
    const response = await passwordResetMutation({
      variables: {
        email: user?.email ?? '',
      },
    });

    setSuccess(!!response.data?.sendPasswordResetEmail?.success);
  };

  return (
    <section className="p-10">
      <div className="grid max-w-4xl gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
        <div className="col-span-1 grid h-fit gap-1">
          <div>
            <h1 className="font-semibold text-neutral-900">
              {t('reset-password.title')}
            </h1>
          </div>
        </div>
        <div className="col-span-2 grid gap-6 lg:grid lg:grid-cols-1 lg:gap-6">
          <p className="text-sm text-neutral-700">
            {t('reset-password.description')}
          </p>
          <div className="flex">
            <BaseButton size="md" onClick={() => send()}>
              {t('reset-password.button')}
            </BaseButton>
            {success && (
              <div className="text-success-400 flex flex-nowrap items-center px-4 text-sm">
                <IconCheckmarkSm />
                <p className="text-xs">{t('reset-password.success')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
