'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import BaseStatus from './BaseStatus';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';

const BasePlanCard: React.FC<{
  title: string;
  description: string;
  price?: string | number | null;
  priceAddon?: string;
  items: string[];
  children?: any;
  badge?: string;
  active?: boolean;
}> = ({
  title,
  description,
  price,
  priceAddon,
  items,
  children,
  badge,
  active,
}) => {
  const t = useTranslations('');

  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-white ${
        badge ? 'mt-5 md:mt-0' : ''
      }`}
    >
      {badge && (
        <span className="absolute bottom-full left-8 right-8 flex h-6 items-center justify-center rounded-t-lg bg-gradient-to-r from-[#EE7056] via-[#ED6655] to-[#FBAA58] text-xs font-semibold text-white">
          {badge}
        </span>
      )}
      <header className="relative border-b border-neutral-100">
        <i className="from-primary-500 via-primary-300 to-primary-50 absolute inset-0 rounded-t-2xl bg-gradient-to-t from-10% via-30% to-90% opacity-[0.03]"></i>
        <div className="relative p-8 pb-5">
          <div className="mb-2 flex items-center gap-2">
            <h1 className="font-heading text-lg font-bold tracking-tight text-neutral-900">
              {title}
            </h1>
            {active && (
              <BaseStatus theme={'ACCEPTED'}>{t('global.active')}</BaseStatus>
            )}
          </div>
          <p className="text-sm text-neutral-500">{description}</p>
          <div className="mt-8">
            <div className="text-xs text-neutral-500">
              <span className="font-heading text-xl font-bold tracking-tight text-neutral-900">
                {price}
              </span>
              {priceAddon && <span className="ml-2">{priceAddon}</span>}
            </div>
          </div>
        </div>
      </header>
      <footer className="flex grow flex-col gap-6 p-8">
        <ul className="grid grow content-start gap-4 text-sm font-medium text-neutral-700">
          {items.map((item: string, index: number) => {
            return (
              <li key={`plan-card-item-${index}`} className="flex gap-4">
                <span className="shrink-0">
                  <IconCheckmarkMd className="text-secondary-500" />
                </span>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
        {children}
      </footer>
    </div>
  );
};

export default BasePlanCard;
