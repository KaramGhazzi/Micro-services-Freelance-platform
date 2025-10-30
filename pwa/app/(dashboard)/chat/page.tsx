'use client';
import { useTranslations } from 'next-intl';
import BaseEmptyState from '@/app/_components/BaseEmptyState';

export default function Page() {
  const t = useTranslations();

  return (
    <div>
      <BaseEmptyState
        imageUrl="/illustration/chat-illustration.svg"
        title={t(`chat.noChatSelected`)}
      />
    </div>
  );
}
