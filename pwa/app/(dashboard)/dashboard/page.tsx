import { useTranslations } from 'next-intl';
import BaseEmptyState from '@/app/_components/BaseEmptyState';

export default function Dashboard() {
  const t = useTranslations('dashboard');

  return (
    <div className="flex min-h-full items-center justify-center p-6">
      <div className="flex flex-col items-center gap-2">
        <BaseEmptyState
          imageUrl="/illustration/dashboard-illustration.svg"
          title={t('salutation')}
          description={t('paragraph')}
          withMaxWidth={false}
          large
        />
      </div>
    </div>
  );
}
