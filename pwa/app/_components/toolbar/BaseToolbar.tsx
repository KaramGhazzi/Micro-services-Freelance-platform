import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import BaseButton from '../BaseButton';
import IconArrowLeft from '../icons/IconArrowLeft';
import WithPermissions from '../WithPermissions';

interface Props {
  title: string;
  titleImage?: string;
  overtitle?: string;
  subtitle?: string;
  backHref?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  tabs?: Array<any>;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const BaseToolbarSub: React.FC<Props> = ({
  title,
  titleImage,
  overtitle,
  subtitle,
  backHref,
  onClick,
  children,
  tabs,
}) => {
  const router = useRouter();
  const currentRoute = usePathname();

  function goBack() {
    if (tabs && tabs.length > 0 && backHref) {
      router.push(backHref);
    } else if (window.history.length > 2) {
      window.history.back();
    } else if (backHref) {
      router.push(backHref);
    }
  }

  return (
    <nav
      className={classNames(
        children ? 'sticky' : '',
        '-top-4 z-30 max-w-[100vw] border-b border-neutral-100 bg-white/90 px-5 backdrop-blur-sm lg:sticky lg:top-0 lg:px-10'
      )}
    >
      <div className="flex w-full flex-col justify-between gap-5 py-5 lg:flex-row lg:py-6">
        <div className="flex min-w-0 gap-4">
          {backHref && (
            <div className="shrink-0">
              <BaseButton
                square
                theme="secondary"
                onClick={() => {
                  goBack();
                }}
              >
                <IconArrowLeft />
              </BaseButton>
            </div>
          )}
          {!backHref && onClick && (
            <div className="shrink-0">
              <BaseButton square theme="secondary" onClick={onClick}>
                <IconArrowLeft />
              </BaseButton>
            </div>
          )}
          <div className="flex flex-col gap-1 overflow-hidden">
            {overtitle && (
              <div className="truncate text-sm font-medium text-neutral-500">
                {overtitle}
              </div>
            )}
            <div className="flex items-center gap-2">
              {titleImage && (
                <img src={titleImage} alt="" className="h-6 w-6 rounded-full" />
              )}

              <h1 className="font-heading truncate font-bold leading-6 tracking-tight">
                {title}
              </h1>
            </div>
            {subtitle && (
              <div className="truncate text-sm font-medium text-neutral-500">
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {children && <div className="flex gap-3">{children}</div>}
      </div>

      <div>
        <nav
          className="-mx-5 -mb-px flex gap-5 overflow-x-auto lg:mx-0 lg:gap-8"
          aria-label="Tabs"
        >
          <i className="shrink-0 lg:hidden"></i>
          {tabs?.length &&
            tabs.map((tab, index) => (
              <WithPermissions
                key={tab?.id ?? `item-${index}`}
                permissions={tab?.permissions?.length ? tab.permissions : []}
              >
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    currentRoute === tab.href
                      ? 'text-secondary-600'
                      : 'hover:text-secondary-600 text-neutral-700',
                    'relative whitespace-nowrap py-3 text-sm font-medium'
                  )}
                  aria-current={currentRoute === tab.href ? 'page' : undefined}
                >
                  {tab.name}
                  {currentRoute === tab.href && (
                    <motion.div
                      className="bg-secondary-500 absolute bottom-0 left-0 z-10 h-[2px] w-full"
                      layoutId="underline"
                      transition={{
                        type: 'spring',

                        duration: 0.3,
                      }}
                    />
                  )}
                </Link>
              </WithPermissions>
            ))}
          <i className="shrink-0 lg:hidden"></i>
        </nav>
      </div>
    </nav>
  );
};

export default BaseToolbarSub;
