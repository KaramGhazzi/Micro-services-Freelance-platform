'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Logo from '../_components/Logo';
import { EmailContextProvider } from './_components/EmailContextProvider';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentRoute = usePathname();

  return (
    // Providers need to be one folder higher than the page using them, otherwise the values are not passed on.
    <EmailContextProvider>
      <AnimatePresence mode="wait">
        <main className="flex min-h-[100dvh] justify-center bg-white px-5 py-16 lg:items-center lg:bg-transparent lg:px-0 lg:py-20">
          <div className="flex w-full flex-col gap-6 lg:max-w-lg">
            <motion.div layout transition={{ duration: 0.2 }}>
              <div className="flex justify-center">
                <Logo />
              </div>
            </motion.div>

            <motion.div
              layout
              className="w-full lg:rounded-2xl lg:bg-white lg:p-10 lg:shadow-sm"
              transition={{ duration: 0.2 }}
            >
              <motion.div
                layout
                key={currentRoute}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        </main>
      </AnimatePresence>
    </EmailContextProvider>
  );
}
