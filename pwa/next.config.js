/** @type {import('next').NextConfig} */
const { loadEnvConfig } = require('@next/env');
const createNextIntlPlugin = require('next-intl/plugin');

const projectDir = process.cwd();
loadEnvConfig(projectDir);
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // This is necessary to support Next <Image /> with remote URLs
        hostname: 'picsum.photos',
      },
    ],
  },
  env: {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    NEXT_PUBLIC_HUBSPOT_PORTAL_ID: process?.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    NEXT_PUBLIC_HUBSPOT_FORM_GUID: process?.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID,
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    NEXT_PUBLIC_HUBSPOT_FORM_SUBMIT_API_URL:
      process?.env.NEXT_PUBLIC_HUBSPOT_FORM_SUBMIT_API_URL,
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    NEXT_PUBLIC_HUBSPOT_API_TOKEN: process?.env.NEXT_PUBLIC_HUBSPOT_API_TOKEN,
  },
};

module.exports = withNextIntl(nextConfig);
