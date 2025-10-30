'use client';
import React, { useState, createContext, useMemo } from 'react';

type EmailContextType = {
  email: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const EmailContext = createContext<EmailContextType>({
  email: undefined,
  setEmail: () => {},
});

export const EmailContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [email, setEmail] = useState<string>();

  const emailObject = useMemo(
    () => ({
      email,
      setEmail,
    }),
    [email, setEmail]
  );

  return (
    <EmailContext.Provider value={emailObject}>
      {children}
    </EmailContext.Provider>
  );
};

export default EmailContext;
