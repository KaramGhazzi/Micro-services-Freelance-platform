'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import productsToolbarTabs from '../../_data/productsToolbarTabs';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';

export default function MyProductsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const t = useTranslations();

  return (
    <>
      <BaseToolbarSub
        title={t('account.my-products.title')}
        subtitle={t('account.my-products.subTitle')}
        tabs={productsToolbarTabs}
      />

      {children}
    </>
  );
}
