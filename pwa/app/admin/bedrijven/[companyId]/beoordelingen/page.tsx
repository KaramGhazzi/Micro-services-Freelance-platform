'use client';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React from 'react';
import BaseReviewsPage, {
  BaseReviewsPageType,
} from '@/app/_components/BaseReviewsPage';

export default function Page() {
  const t = useTranslations();
  const { companyId } = useParams<{ companyId: string }>();

  return (
    <BaseReviewsPage
      title={t('assignment.toolbar.receivedReviews')}
      type={BaseReviewsPageType.RECEIVED}
      companyId={Number(companyId)}
      hasToolbar={false}
    />
  );
}
