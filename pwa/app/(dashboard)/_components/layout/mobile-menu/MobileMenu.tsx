'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ProductSlug } from '@package/types/dist/class-validator';
import classNames from 'classnames';
import ContractContext from '../../../_context/ContractContext';
import {
  mobileMenuItemsOrganisation,
  mobileMenuItemsFreelancer,
} from '../../../_data/mobileMenuItems';
import mobileMenuItemsAdmin from '../../../_data/mobileMenuItemsAdmin';
import { CompanyType } from '@/graphql/types';
import { useAuth } from '@/app/_hooks/useAuth';

type MobileMenuItem = {
  type?: string;
  title?: string;
  href?: string;
  icon?: React.ElementType;
  hrefOverwrite?: string;
  items?: MobileMenuItem[] | { type: 'seperator' }[];
};

interface MobileMenuProps {
  isAdmin?: boolean;
}

export default function MobileMenu({ isAdmin }: MobileMenuProps) {
  const t = useTranslations('navigation');
  const { hasActiveContractSlugs } = useContext(ContractContext);
  const [mobileMenuItems, setMobileMenuItems] = useState<any[]>([]);

  const { currentCompany } = useAuth();

  const items: MobileMenuItem[] = isAdmin
    ? mobileMenuItemsAdmin
    : mobileMenuItems;

  const currentRoute = usePathname();
  const [clickedItem, setClickedItem] = useState<MobileMenuItem | null>(null);

  useEffect(() => {
    if (!currentCompany?.cocNumber) {
      setMobileMenuItems([]);
    } else if (currentCompany?.type !== CompanyType.Freelancer) {
      setMobileMenuItems(mobileMenuItemsOrganisation);
    } else {
      setMobileMenuItems(mobileMenuItemsFreelancer);
    }
  }, [currentCompany]);

  useEffect(() => {
    setClickedItem(null);
  }, [currentRoute]);

  function isActive(item: MobileMenuItem) {
    if (clickedItem?.title === item.title) {
      return true;
    }
    if (item.href && !clickedItem) {
      return currentRoute.includes(item.href) ? true : false;
    }
  }

  function subItemIsActive(item: MobileMenuItem) {
    if (item.href) {
      return currentRoute.includes(item.href) ? true : false;
    }
  }

  function handleClick(item: MobileMenuItem) {
    if (clickedItem === item) {
      setClickedItem(null);
      return;
    }
    setClickedItem(item);
  }

  return (
    <>
      <ul className="flex h-full justify-between">
        {items.map((item) => {
          return (
            <li
              key={item.title}
              className={classNames({
                'h-full flex-1': true,
                hidden:
                  item.title === 'pro' &&
                  hasActiveContractSlugs([ProductSlug.FREELANCER_PRO]),
              })}
            >
              <Link
                href={item.hrefOverwrite ?? item.href ?? '/'}
                className={classNames({
                  'flex h-full flex-col items-center justify-center gap-1 bg-neutral-900':
                    true,
                  'bg-neutral-950': isActive(item),
                })}
                onClick={() => handleClick(item)}
              >
                {item?.icon && (
                  <item.icon
                    active={isActive(item)}
                    className="h-5 w-5"
                    id={item.title}
                  />
                )}
                <span className="truncate text-[11px] font-medium text-neutral-400">
                  {t(item.title)}
                </span>
              </Link>
              <AnimatePresence>
                {clickedItem?.items && clickedItem.title === item.title && (
                  <motion.ul
                    className=" pb-18 fixed bottom-0 left-0 right-0 -z-10 flex flex-col gap-0 rounded-t-3xl bg-neutral-950 pt-4"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: '0%' }}
                    exit={{ translateY: '100%' }}
                    transition={{
                      type: 'spring',

                      duration: 0.5,
                    }}
                  >
                    {item?.items?.map((subItem: any) => {
                      return (
                        <li key={subItem.title}>
                          {subItem.type === 'seperator' && (
                            <div className="my-3 h-px w-full bg-neutral-900"></div>
                          )}
                          {subItem.type !== 'seperator' && (
                            <Link
                              href={subItem.href}
                              className={classNames({
                                'flex h-10 items-center gap-3 rounded-lg  px-5 text-sm font-medium tracking-wide text-neutral-400 transition-all':
                                  true,
                                'bg-neutral-950 text-white':
                                  subItemIsActive(subItem),
                              })}
                            >
                              {subItem?.icon && (
                                <subItem.icon
                                  active={subItemIsActive(subItem)}
                                />
                              )}
                              {t(subItem.title)}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </>
  );
}
