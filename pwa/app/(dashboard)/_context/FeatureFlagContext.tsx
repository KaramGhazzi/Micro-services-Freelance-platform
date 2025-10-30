'use client';
import { createContext, useEffect, useMemo, useState } from 'react';
import * as LDClient from 'launchdarkly-js-client-sdk';
import { useEnvContext } from 'next-runtime-env';

const FeatureFlagContext = createContext<{
  loginEnabled: boolean;
  textkernelEnabled: boolean;
  talkjsEnabled: boolean;
  stripeEnabled: boolean;
  cocEnabled: boolean;
}>({
  loginEnabled: true,
  textkernelEnabled: true,
  talkjsEnabled: true,
  stripeEnabled: true,
  cocEnabled: true,
});

interface FeatureFlagContextProps {
  children?: React.ReactNode;
}

export const FeatureFlagProvider = ({ children }: FeatureFlagContextProps) => {
  const envContext = useEnvContext();
  let initialized = false;

  const [loginEnabled, setLoginEnabled] = useState<boolean>(true);
  const [textkernelEnabled, setTextkernelEnabled] = useState<boolean>(false);
  const [talkjsEnabled, setTalkjsEnabled] = useState<boolean>(false);
  const [stripeEnabled, setStripeEnabled] = useState<boolean>(false);
  const [cocEnabled, setCocEnabled] = useState<boolean>(false);

  const initializeFeatureflag = (
    client: LDClient.LDClient,
    featureFlag: string,
    callback: (value: boolean) => void
  ) => {
    const value = client.variation(featureFlag, true) as boolean;
    callback(value);
    client.on('change:' + featureFlag, (value) => {
      callback(value);
    });
  };

  const initializeLDClient = async (availableFeatureFlags: any) => {
    const context: LDClient.LDContext = {
      kind: 'user',
      anonymous: true,
      key: 'anon-user-key-123abc',
    };

    const clientKey =
      envContext['NEXT_PUBLIC_LAUNCH_DARKLY_ID'] ??
      process?.env?.['NEXT_PUBLIC_LAUNCH_DARKLY_ID'];

    if (undefined === clientKey) {
      throw new Error('Launch darkly client id not set.');
    }

    // The client key determines the environment (prod, test) that is used.
    const client = LDClient.initialize(clientKey, context, { streaming: true });
    await client.waitUntilReady();

    Object.keys(availableFeatureFlags).forEach((key) => {
      initializeFeatureflag(client, key, availableFeatureFlags[key]);
    });
  };

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      initializeLDClient({
        login_enabled: setLoginEnabled,
        textkernel_enabled: setTextkernelEnabled,
        talkjs_enabled: setTalkjsEnabled,
        stripe_enabled: setStripeEnabled,
        coc_enabled: setCocEnabled,
      });
    }
  }, []);

  const featureFlags = useMemo(
    () => ({
      loginEnabled,
      textkernelEnabled,
      talkjsEnabled,
      stripeEnabled,
      cocEnabled,
    }),
    [loginEnabled, textkernelEnabled, talkjsEnabled, stripeEnabled, cocEnabled]
  );

  return (
    <FeatureFlagContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export default FeatureFlagContext;
