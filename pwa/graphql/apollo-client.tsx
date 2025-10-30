'use client';

import {
  ApolloClient as ApolloBaseClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { useEnvContext } from 'next-runtime-env';
import { ProcessEnv } from 'next-runtime-env/build/typings/process-env';
import {
  authenticationTokenCookie,
  companyIdCookie,
} from '@/app/_libs/authCookies';

if (process.env['NODE_ENV'] === 'development') {
  loadDevMessages();
  loadErrorMessages();
}

const authLink = new ApolloLink((operation, forward) => {
  const token = authenticationTokenCookie.value();
  const companyId = companyIdCookie.value();

  const extraHeaders: Record<string, string | undefined> = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};

  if (companyId) {
    extraHeaders['x-company-id'] = companyId;
  }

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...extraHeaders,
    },
  }));

  return forward(operation);
});

function MakeClient(environmentContext: ProcessEnv) {
  const environmentKeyGraphQLUrl = 'NEXT_PUBLIC_GRAPHQL_URL';

  const httpLink = new HttpLink({
    uri:
      environmentContext?.[environmentKeyGraphQLUrl] ??
      process?.env?.[environmentKeyGraphQLUrl] ??
      'http://localhost:2000',
    fetchOptions: { cache: 'no-store' },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors?.some((e) => e?.extensions?.code === 'UNAUTHENTICATED')) {
      // TODO: logout?
    }

    if (process.env['NODE_ENV'] === 'production') {
      return;
    }

    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Path: ${path}`,
          locations
        )
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  return new ApolloBaseClient({
    cache: new InMemoryCache(),
    link: authLink.concat(errorLink.concat(httpLink)),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

export const ApolloClient = MakeClient;

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const environmentContext = useEnvContext(); // This needs to be in a React component

  return (
    <ApolloProvider client={ApolloClient(environmentContext)}>
      {children}
    </ApolloProvider>
  );
}
