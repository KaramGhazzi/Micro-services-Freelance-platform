'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import BaseReviewsPage, {
  BaseReviewsPageType,
} from '@/app/_components/BaseReviewsPage';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Page() {
  const t = useTranslations();
  const { currentUser } = useAuth();

  return (
    <BaseReviewsPage
      title={t('assignment.toolbar.givenReviews')}
      type={BaseReviewsPageType.CREATED}
      createdByUserId={Number(currentUser?.id)}
      hasToolbar={true}
    />
  );
}
