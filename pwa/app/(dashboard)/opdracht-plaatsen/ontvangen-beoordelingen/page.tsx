'use client';
import { useTranslations } from 'next-intl';
import BaseReviewsPage, {
  BaseReviewsPageType,
} from '@/app/_components/BaseReviewsPage';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Page() {
  const t = useTranslations();
  const { currentUser, currentCompany } = useAuth();

  if (!currentUser || !currentCompany) {
    return null;
  }

  return (
    <BaseReviewsPage
      title={t('assignment.toolbar.receivedReviews')}
      type={BaseReviewsPageType.RECEIVED}
      companyId={Number(currentCompany?.id)}
      receivedByUserId={Number(currentUser?.id)}
      hasToolbar={true}
    />
  );
}
