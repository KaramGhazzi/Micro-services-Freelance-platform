'use client';
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { TalkJSContextProvider } from '../(dashboard)/_context/TalkJSContext';
import MobileMenu from '../(dashboard)/_components/layout/mobile-menu/MobileMenu';
import { useAuth } from '../_hooks/useAuth';
import sidebarSections from './_data/sidebarSections';

import currentUserMenuItems from './_data/currentUserMenuItems';
import Logo from '@/app/_components/Logo';
import BaseSidebar from '@/app/_components/BaseSidebar';
import BaseUserMenu from '@/app/_components/user-menu/BaseUserMenu';
import BaseStatus from '@/app/_components/BaseStatus';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const scrollArea = useRef<HTMLDivElement>(null);
  const current = scrollArea.current;
  const { currentUser } = useAuth();

  useEffect(() => {
    return () => {
      if (current) {
        current.scrollTo(0, 0);
      }
    };
  }, [pathname, current]);

  return (
    <>
      <TalkJSContextProvider>
        <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-4">
            <Logo small />

            <BaseStatus theme="FREELANCE">admin</BaseStatus>
          </div>

          <div className="flex gap-2 lg:gap-4">
            <BaseUserMenu menuItems={currentUserMenuItems({ currentUser })} />
          </div>
        </header>

        <div className="flex pb-14 pt-14 lg:h-full lg:pb-0">
          <div className="flex w-full lg:h-[calc(100vh-56px)]">
            <div className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-neutral-900 lg:hidden">
              <MobileMenu isAdmin={true} />
            </div>
            <div className="hidden w-72 shrink-0 lg:block">
              <BaseSidebar
                sidebarSections={sidebarSections}
                showProMenuItem={false}
              />
            </div>
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
