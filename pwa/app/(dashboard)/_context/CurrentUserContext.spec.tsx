import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import {
  CurrentUserContextProvider,
  CurrentUserContext,
} from './CurrentUserContext';
import { useMeQuery } from '@/graphql/queries/user/me.generated';

// Mock the useMeQuery hook
jest.mock('@/graphql/queries/user/me.generated', () => ({
  useMeQuery: jest.fn().mockReturnValue({ data: {}, refetch: jest.fn() }),
}));
jest.mock('@/graphql/mutations/auth/refreshSession.generated', () => ({
  useRefreshSessionMutation: jest.fn().mockReturnValue([jest.fn()]),
}));

// jest.mock('@package/fbjwt');
// jest.mock('@/app/_libs/authCookies');

jest.mock('@package/fbjwt', () => ({
  checkTokenValidity: jest.fn(),
}));

jest.mock('@/app/_libs/authCookies', () => ({
  authenticationTokenCookie: {
    update: jest.fn(),
    delete: jest.fn(),
    value: jest.fn().mockReturnValue(null),
  },
  refreshTokenCookie: {
    update: jest.fn(),
    delete: jest.fn(),
    value: jest.fn().mockReturnValue(null),
  },
  companyIdCookie: {
    update: jest.fn(),
    delete: jest.fn(),
    value: jest.fn().mockReturnValue(null),
  },
}));

const mockMeQueryResult = {
  data: {
    me: {
      id: 'user-1',
      firstName: 'John',
      email: 'john.doe@example.com',
      role: 'USER',
      userCompanies: [
        {
          id: 'company-1',
          company: {
            id: 'company-1',
            name: 'Company 1',
            type: 'BUSINESS',
          },
          userCompanyRoles: [{ role: 'ADMIN' }],
        },
      ],
    },
  },
};

describe('CurrentUserContextProvider', () => {
  it('provides initial context values', () => {
    (useMeQuery as jest.Mock).mockReturnValue({ data: null });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CurrentUserContextProvider>
          <CurrentUserContext.Consumer>
            {(value) => (
              <>
                <span>{`currentUser: ${value.currentUser}`}</span>
                <span>{`currentCompanyId: ${value.currentCompanyId}`}</span>
              </>
            )}
          </CurrentUserContext.Consumer>
        </CurrentUserContextProvider>
      </MockedProvider>
    );

    expect(screen.getByText(/^currentUser:/).textContent).toBe(
      'currentUser: undefined'
    );
    expect(screen.getByText(/^currentCompanyId:/).textContent).toBe(
      'currentCompanyId: undefined'
    );
  });

  it('updates context values when user data is fetched', async () => {
    (useMeQuery as jest.Mock).mockReturnValue(mockMeQueryResult);

    await act(async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <CurrentUserContextProvider>
            <CurrentUserContext.Consumer>
              {(value) => (
                <>
                  <span>{`currentUser: ${value.currentUser?.firstName}`}</span>
                  <span>{`currentCompanyId: ${value.currentCompanyId}`}</span>
                </>
              )}
            </CurrentUserContext.Consumer>
          </CurrentUserContextProvider>
        </MockedProvider>
      );
    });

    expect(screen.getByText(/^currentUser:/).textContent).toBe(
      'currentUser: John'
    );
    expect(screen.getByText(/^currentCompanyId:/).textContent).toBe(
      'currentCompanyId: undefined'
    );
  });
});
