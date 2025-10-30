'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import BaseStatus from '@/app/_components/BaseStatus';

interface ProductCardProps {
  title: string;
  description: string;
  isActive?: boolean;
  disabled?: boolean;
  children: any;
}

const ProductCard = ({
  title,
  description,
  isActive = false,
  disabled = false,
  children,
}: ProductCardProps) => {
  const t = useTranslations();

  return (
    <div
      className={`relative flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm 
      ${disabled ? 'opacity-50' : ''}`}
    >
      <header className="relative border-b border-neutral-100">
        <i className="from-primary-500 via-primary-300 to-primary-50 absolute inset-0 rounded-t-2xl bg-gradient-to-t from-10% via-30% to-90% opacity-[0.03]" />
        <div className="relative px-8 py-6">
          <div className="mb-2 flex items-center">
            <h1 className="font-heading mr-2 text-lg font-bold tracking-tight text-neutral-900">
              {title}
            </h1>
            {isActive && (
              <BaseStatus theme={'ACCEPTED'}>{t('global.active')}</BaseStatus>
            )}
          </div>
          <p className="text-sm font-medium text-neutral-500">{description}</p>
        </div>
      </header>
      <footer className="flex grow flex-col gap-6 px-8 py-6">{children}</footer>
    </div>
  );
};

export default ProductCard;
