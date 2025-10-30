'use client';

import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PermissionArray } from '@package/permission';
import { ProductSlug } from '@package/types/dist/class-validator';
import IconProBadge from '../icons/IconProBadge';
import BaseUserAvatar from '../BaseUserAvatar';
import PickCompanyModal from '../user/PickCompanyModal';
import WithPermissions from '../WithPermissions';
import { getImageUrl } from '../../(dashboard)/_utils/getImageUrl';
import IconArrowRightOut from '@/app/_components/icons/IconArrowRightOut';
import IconChevronDown from '@/app/_components/icons/IconChevronDown';
import ContractContext from '@/app/(dashboard)/_context/ContractContext';
import { useAuth } from '@/app/_hooks/useAuth';
export interface BaseUserMenuItem {
  type: 'link' | 'seperator' | 'button';
  title?: string;
  href?: string;
  target?: string | null;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ElementType;
  id?: string;
  role?: string;
  action?: string;
  permissions?: PermissionArray;
}

interface BaseUserMenuProps {
  menuItems: BaseUserMenuItem[];
  onShowPickCompanyModal?: () => void;
}

const BaseUserMenu = ({ menuItems }: BaseUserMenuProps) => {
  const { hasActiveContractSlugs } = useContext(ContractContext);

  const { logout, currentUser, currentCompany } = useAuth();
  const [pickCompanyModelActive, setPickCompanyModelActive] = useState(false);
  const [newMenuItems, setNewMenuItems] = useState(menuItems);
  const [isOpen, setIsOpen] = useState(false);
  const [profilePhotoImageFileUrl, setProfilePhotoImageFileUrl] = useState<
    string | undefined
  >();
  const t = useTranslations('navigation');

  useEffect(() => {
    setNewMenuItems([
      ...menuItems,
      {
        type: 'button',
        title: 'logout',
        icon: IconArrowRightOut,
        onClick: (e) => {
          e.preventDefault();

          logout();
        },
        id: 'logout',
      },
    ]);
  }, [menuItems]);

  useEffect(() => {
    const profilePhoto = currentUser?.profilePhoto;

    if (profilePhoto) {
      const profilePhotoImageFile = getImageUrl(
        profilePhoto?.container,
        profilePhoto?.blobName
      );
      if (profilePhotoImageFile) {
        setProfilePhotoImageFileUrl(profilePhotoImageFile);
      }
    }
  }, [currentUser]);

  const handleAction = (action: string) => {
    switch (action) {
      case 'switchCompany':
        setPickCompanyModelActive(true);
        break;
      default:
        break;
    }

    return () => {};
  };

  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button
          className="group flex cursor-pointer items-center focus:outline-none sm:gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative">
            <BaseUserAvatar url={profilePhotoImageFileUrl} size="sm" />

            {hasActiveContractSlugs([ProductSlug.FREELANCER_PRO]) && (
              <div className="absolute -right-1 -top-1 w-4 rounded bg-white">
                <figure className="absolute">
                  <IconProBadge />
                </figure>
              </div>
            )}
          </div>
          <i className="group-hover-touch:text-neutral-900 group-hover-touch:translate-y-0.5 hidden text-neutral-300 transition-all sm:block">
            <IconChevronDown />
          </i>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 mt-1 w-56 origin-top-right rounded-md border border-neutral-100 bg-white py-1 shadow-md focus:outline-none"
          static
        >
          {currentUser && (
            <>
              <Menu.Item key="user">
                <div className="flex flex-col gap-1 px-4 py-2 text-sm font-medium text-neutral-700">
                  <div className="font-semibold text-neutral-900">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </div>
                  <div className="truncate">{currentUser?.email}</div>
                  {currentCompany && (
                    <em className="truncate">{currentCompany?.name}</em>
                  )}
                </div>
              </Menu.Item>
              <div className="my-1 h-px w-full bg-neutral-100" />
            </>
          )}
          {newMenuItems.map((item, index) => {
            const IconComponent: React.ElementType | undefined = item.icon;

            return (
              <WithPermissions
                key={item?.id ?? `item-${index}`}
                permissions={item?.permissions?.length ? item.permissions : []}
              >
                <div>
                  {item.type === 'seperator' && (
                    <div className="my-1 h-px w-full bg-neutral-100" />
                  )}
                  {item.type === 'link' && IconComponent && item?.href && (
                    <Menu.Item>
                      <Link
                        href={item.href}
                        target={item.target ? '_blank' : '_self'}
                        className="group flex h-9 items-center gap-2 px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <i className="group-hover-touch:text-neutral-500 text-neutral-300 transition-all">
                          <IconComponent />
                        </i>
                        <span className="truncate">{t(item.title)}</span>
                      </Link>
                    </Menu.Item>
                  )}
                  {item.type === 'button' &&
                    IconComponent &&
                    (item?.onClick || item?.action) && (
                      <Menu.Item>
                        <button
                          className="group flex h-9 w-full appearance-none items-center gap-2 px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                          onClick={
                            item.onClick
                              ? item.onClick
                              : item?.action
                              ? () => item.action && handleAction(item.action)
                              : () => {}
                          }
                        >
                          <i className="group-hover-touch:text-neutral-500 text-neutral-300 transition-all">
                            <IconComponent />
                          </i>
                          <span className="truncate">{t(item.title)}</span>
                        </button>
                      </Menu.Item>
                    )}
                </div>
              </WithPermissions>
            );
          })}
        </Menu.Items>
      </Transition>
      <PickCompanyModal
        isOpen={pickCompanyModelActive}
        onClose={() => setPickCompanyModelActive(false)}
      />
    </Menu>
  );
};

export default BaseUserMenu;
