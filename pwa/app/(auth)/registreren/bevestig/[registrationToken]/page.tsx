'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import AuthTitle from '../../../_components/AuthTitle';
import IconLoader from '@/app/_components/icons/IconLoader';
import IconCheckmarkSm from '@/app/_components/icons/IconCheckmarkSm';
import IconXMd from '@/app/_components/icons/IconXMd';
import BaseButton from '@/app/_components/BaseButton';
import useMountOnce from '@/app/_libs/useMountOnce';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';
import { useAuth } from '@/app/_hooks/useAuth';

export type Action = Window | (() => void);

export default function Page({
  params: { registrationToken },
}: {
  params: { registrationToken: string };
}) {
  const t = useTranslations('auth');
  const router = useRouter();
  const { googleAnalyticsEvent, handleHubspotMutation } = useEventTracker();
  const { confirmRegister, loading, error } = useAuth();

  const onError = (e: Error) => {
    console.error(e);
  };

  useMountOnce(() => {
    googleAnalyticsEvent({
      event: EventName.SIGN_UP_CONFIRM,
      category: 'Registratieflow',
    });
    handleHubspotMutation(EventName.SIGN_UP_CONFIRM);

    const executeConfirmRegister = async () => {
      try {
        await confirmRegister(registrationToken);

        googleAnalyticsEvent({
          event: EventName.SIGN_UP_CONFIRMED,
          category: 'Registratieflow',
        });
        handleHubspotMutation(EventName.SIGN_UP_CONFIRMED);
      } catch (e: any) {
        onError(e);
      }
    };

    executeConfirmRegister();
  });

  if (loading) {
    return (
      <div className="grid gap-10">
        <div className="grid gap-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16  items-center justify-center rounded-full bg-gray-50">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <div className="text-neutral-700">
                  <IconLoader className="h-12 w-12 animate-spin p-2"></IconLoader>
                </div>
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-center">
              <AuthTitle>{t('confirmLoading.title')}</AuthTitle>
            </div>
            <div className="flex justify-center">
              <p className="text-sm text-neutral-700">
                {t('confirmLoading.description')}
              </p>
            </div>
          </div>
        </div>
        <div>
          <BaseButton
            loading={true}
            wide
            type="submit"
            onClick={() =>
              window.open(
                'https://www.freelance.nl/contact',
                '_blank',
                'noopener'
              )
            }
          >
            {t('confirm.button')}
          </BaseButton>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid gap-10">
        <div className="grid gap-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16  items-center justify-center rounded-full bg-red-50">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <div className="text-error-600">
                  <IconXMd className="h-8 w-8"></IconXMd>
                </div>
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-center">
              <AuthTitle>{t('confirmationIncomplete.title')}</AuthTitle>
            </div>
            <div className="flex justify-center">
              <p className="text-sm text-neutral-700">
                {t('confirmationIncomplete.description')}
              </p>
            </div>
          </div>
        </div>
        <div>
          <BaseButton
            wide
            type="submit"
            onClick={() =>
              window.open(
                'https://www.freelance.nl/contact',
                '_blank',
                'noopener'
              )
            }
          >
            {t('confirmationIncomplete.button')}
          </BaseButton>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10">
      <div className="grid gap-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16  items-center justify-center rounded-full bg-lime-50">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-100">
              <div className="text-green-400">
                <IconCheckmarkSm className="h-12 w-12 p-2  text-green-400"></IconCheckmarkSm>
              </div>
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex justify-center">
            <AuthTitle>{t('confirm.title')}</AuthTitle>
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-neutral-700">
              {t('confirm.description')}
            </p>
          </div>
        </div>
      </div>
      <div>
        <BaseButton
          wide
          type="submit"
          onClick={() => router.push('/account-voltooien')}
        >
          {t('confirm.button')}
        </BaseButton>
      </div>
    </div>
  );
}
