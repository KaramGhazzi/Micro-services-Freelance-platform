import './globals.css';
import localFont from 'next/font/local';
import React from 'react';
import Script from 'next/script';
import { PublicEnvProvider } from 'next-runtime-env';
import { ApolloWrapper } from '../graphql/apollo-client';
import { CurrentUserContextProvider } from './(dashboard)/_context/CurrentUserContext';
import { ContractContextProvider } from './(dashboard)/_context/ContractContext';
import { FeatureFlagProvider } from './(dashboard)/_context/FeatureFlagContext';
import IntlClientProvider from './IntlClientProvider';

const montserrat = localFont({
  variable: '--font-montserrat',
  fallback: ['Arial', 'sans-serif'],
  src: [
    {
      path: './fonts/Montserrat-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Montserrat-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

const inter = localFont({
  variable: '--font-inter',
  fallback: ['Arial', 'sans-serif'],
  src: [
    {
      path: './fonts/Inter-Tight-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Inter-Tight-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Inter-Tight-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Inter-Tight-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Inter-Tight-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Inter-Tight-500-italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Inter-Tight-600-italic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/Inter-Tight-700-italic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
});

export const metadata = {
  title: 'Freelance Platform',
  description: 'This is the Freelance Platform',
  viewport: 'width=device-width, initial-scale=1, user-scalable=no',
  icons: {
    icon: '/favicon.png',
    type: 'image/x-icon',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleTagManagerId = process?.env?.['GOOGLE_TAG_MANAGER_ID'];

  return (
    <html lang="nl">
      <PublicEnvProvider>
        {googleTagManagerId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${googleTagManagerId}');
          `}
          </Script>
        )}
        <Script
          id="hs-script-loader"
          src="//js-eu1.hs-scripts.com/25361852.js"
        />

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-5XB81XRBT6&debug_mode=true" />

        <body
          className={`bg-neutral-50 font-sans text-neutral-900 antialiased ${montserrat.variable} ${inter.variable}`}
        >
          <ApolloWrapper>
            <IntlClientProvider>
              <CurrentUserContextProvider>
                <ContractContextProvider>
                  <FeatureFlagProvider>{children}</FeatureFlagProvider>
                </ContractContextProvider>
              </CurrentUserContextProvider>
            </IntlClientProvider>
          </ApolloWrapper>
          {googleTagManagerId && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
              }}
            />
          )}
        </body>
      </PublicEnvProvider>
    </html>
  );
}

// This is needed to make the public env provider work.
export const dynamic = 'force-dynamic';
