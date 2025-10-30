'use client';

import { useEnvContext } from 'next-runtime-env';
import React, { useContext } from 'react';
import { useTranslations } from 'next-intl';
import FeatureFlagContext from '@/app/(dashboard)/_context/FeatureFlagContext';
import BaseChatInactiveAlert from '@/app/_components/BaseChatInactiveAlert';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import BaseChat from '@/app/_components/BaseChat';
import { useAuth } from '@/app/_hooks/useAuth';

export default function DashboardLayout() {
  const envContext = useEnvContext();
  const t = useTranslations();
  const { talkjsEnabled } = useContext(FeatureFlagContext);
  const talkJsAppId =
    envContext['NEXT_PUBLIC_TALKJS_APP_ID'] ??
    process?.env?.['NEXT_PUBLIC_TALKJS_APP_ID'];
  const { currentUser } = useAuth();

  return (
    <>
      <BaseToolbarSub
        title={t('chat.title')}
        subtitle={t('chat.subtitle')}
      ></BaseToolbarSub>
      {!talkjsEnabled && <BaseChatInactiveAlert />}
      {talkjsEnabled && currentUser && talkJsAppId && (
        <section className="flex-grow xl:flex">
          <BaseChat type="inbox" />
        </section>
      )}
    </>
  );
}
