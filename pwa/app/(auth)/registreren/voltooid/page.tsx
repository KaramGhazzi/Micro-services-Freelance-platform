'use client';
import React, { useContext } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import AuthTitle from '../../_components/AuthTitle';
import EmailContext from '../../_components/EmailContextProvider';
import BaseButton from '@/app/_components/BaseButton';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';
import useMountOnce from '@/app/_libs/useMountOnce';

export default function Page() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { googleAnalyticsEvent, handleHubspotMutation } = useEventTracker();

  useMountOnce(() => {
    googleAnalyticsEvent({
      event: EventName.SIGN_UP,
      category: 'Registratieflow',
    });
    handleHubspotMutation(EventName.SIGN_UP);
  });

  const { email } = useContext(EmailContext);

  const emailElement = () => {
    return <span className="font-semibold text-neutral-900">{email}</span>;
  };

  return (
    <div>
      <div className="grid gap-2">
        <AuthTitle>{t('register.complete.title')}</AuthTitle>
        <div>
          <p className="text-sm text-neutral-700">
            {t.rich('register.complete.description', {
              span: emailElement,
            })}
          </p>
        </div>
      </div>
      <div className="grid gap-6 pt-10">
        <div>
          <BaseButton
            onClick={() => router.replace('https://www.freelance.nl/contact')}
            wide
            type="submit"
          >
            {t('noEmailReceived')}
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
