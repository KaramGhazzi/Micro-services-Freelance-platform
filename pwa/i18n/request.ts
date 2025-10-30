import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = 'nl';

  return {
    locale,
    messages: (await import(`@package/translation/messages/${locale}.json`))
      .default,
  };
});
