'use client';
import { IntlError, IntlErrorCode, NextIntlClientProvider } from 'next-intl';
import messages from '@package/translation/messages/nl.json';

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

const onError = (error: IntlError) => {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected and should only log an error
    console.error(error);
  } else {
    // Other errors indicate a bug in the app and should be reported
    console.error(`Error code: ${error.code}`, error.originalMessage);
  }
};

const getMessageFallback = ({
  namespace,
  key,
  error,
}: {
  namespace: string;
  key: string;
  error: IntlError;
}) => {
  const path = [namespace, key].filter((part) => part != null).join('.');

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return path + ' is not yet translated';
  } else {
    return 'Dear developer, please fix this message: ' + path;
  }
};

const IntlClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider
      locale="nl"
      messages={messages}
      onError={onError}
      getMessageFallback={getMessageFallback}
      timeZone={timeZone}
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlClientProvider;
