'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Userpilot } from 'userpilot';
import { usePathname } from 'next/navigation';
import { ProductSlug } from '@package/types/dist/class-validator';
import { useEnvContext } from 'next-runtime-env';
import classNames from 'classnames';
import { useAuth } from '../_hooks/useAuth';
import MobileMenu from './_components/layout/mobile-menu/MobileMenu';
import {
  freelancerSidebarSections,
  organisationSidebarItems,
} from './_data/sidebarSections';
import currentUserMenuItems from './_data/currentUserMenuItems';
import ChatButton from './_components/layout/ChatButton';
import NotificationsButton from './_components/layout/NotificationsButton';
import ContractContext from './_context/ContractContext';
import BaseSidebar from '@/app/_components/BaseSidebar';
import BaseUserMenu, {
  BaseUserMenuItem,
} from '@/app/_components/user-menu/BaseUserMenu';
import Logo from '@/app/_components/Logo';
import { CompanyType } from '@/graphql/types';
import { TalkJSContextProvider } from '@/app/(dashboard)/_context/TalkJSContext';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const envContext = useEnvContext();

  const userpilotToken =
    envContext['NEXT_PUBLIC_USER_PILOT_TOKEN'] ??
    process?.env?.['NEXT_PUBLIC_USER_PILOT_TOKEN'];
  Userpilot.initialize(userpilotToken ?? '');

  const pathname = usePathname();
  const scrollArea = useRef<HTMLDivElement>(null);
  const current = scrollArea.current;

  const [sidebarItems, setSidebarItems] = useState<any>();

  const [loading, setLoading] = useState<boolean>(true);

  const { currentUser, isCompany, isAdminUser, currentCompany } = useAuth();

  const { hasActiveContractSlugs, activeContractSlugs } =
    useContext(ContractContext);

  const { currentCompanyId } = useAuth();

  const [userMenuItems, setUserMenuItems] = useState<BaseUserMenuItem[]>(
    currentUserMenuItems({
      isCompany,
      isAdminUser,
      hasCompany: currentCompanyId !== undefined,
    })
  );

  useEffect(() => {
    Userpilot.identify(`${currentUser?.id}`, {
      name: `${currentUser?.firstName} ${currentUser?.lastName}`,
      email: currentUser?.email,
      created_at: currentUser?.createdAt,
      company: {
        id: currentCompany?.id,
        name: currentCompany?.name,
        type: currentCompany?.type,
      },
    });
  }, [currentUser, activeContractSlugs]);

  useEffect(() => {
    setUserMenuItems(
      currentUserMenuItems({
        isCompany,
        isAdminUser,
        hasCompany: currentCompanyId !== undefined,
      })
    );

    if (isCompany === undefined) {
      return;
    }

    setLoading(false);
  }, [isCompany, isAdminUser]);

  useEffect(() => {
    return () => {
      if (current) {
        current.scrollTo(0, 0);
      }
    };
  }, [pathname, current]);

  useEffect(() => {
    if (currentCompany?.type !== CompanyType.Freelancer) {
      setSidebarItems(organisationSidebarItems);
    } else {
      setSidebarItems(freelancerSidebarSections);
    }
  }, [currentCompany]);

  const showMenu = currentCompany || pathname != '/account-voltooien';

  return (
    <>
      <TalkJSContextProvider>
        <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
          <Logo small />

          <div className="flex gap-2 lg:gap-4">
            <div className="flex gap-1">
              {currentCompany?.type === CompanyType.Freelancer && (
                <ChatButton />
              )}
              <NotificationsButton />
            </div>
            <BaseUserMenu menuItems={userMenuItems} />
          </div>
        </header>

        <div
          className={classNames('flex pt-14 lg:h-full lg:pb-0', {
            'pb-14': showMenu,
          })}
        >
          <div className="flex w-full lg:h-[calc(100vh-56px)]">
            {showMenu && (
              <div className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-neutral-900 lg:hidden">
                <MobileMenu />
              </div>
            )}

            {showMenu && (
              <div className="hidden w-72 shrink-0 bg-neutral-900 lg:block">
                {!loading && (
                  <BaseSidebar
                    sidebarSections={sidebarItems}
                    // overflowMenuItems={overflowMenuItems}
                    showProMenuItem={
                      currentCompany?.type === CompanyType.Freelancer &&
                      !hasActiveContractSlugs([ProductSlug.FREELANCER_PRO]) &&
                      !!currentCompany?.cocNumber
                    }
                  />
                )}
              </div>
            )}
            <main
              ref={scrollArea}
              className="flex w-full grow flex-col lg:overflow-y-auto"
            >
              {children}
            </main>
          </div>
        </div>
      </TalkJSContextProvider>
    </>
  );
}
