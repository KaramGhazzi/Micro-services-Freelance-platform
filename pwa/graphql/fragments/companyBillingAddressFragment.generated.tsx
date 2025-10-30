import * as Types from '../types';

import { gql } from '@apollo/client';
import { AddressFragmentDoc } from './addressFragment.generated';
export type CompanyAddressFragment = {
  __typename?: 'Company';
  address?: {
    __typename?: 'Address';
    id: string;
    name?: string | null;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode: string;
    city: string;
    countryCode?: string | null;
  } | null;
};

export type CompanyBillingAddressFragment = {
  __typename?: 'Company';
  billingAddress?: {
    __typename?: 'Address';
    id: string;
    name?: string | null;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode: string;
    city: string;
    countryCode?: string | null;
  } | null;
};

export const CompanyAddressFragmentDoc = gql`
  fragment companyAddressFragment on Company {
    address {
      ...addressFragment
    }
  }
  ${AddressFragmentDoc}
`;
export const CompanyBillingAddressFragmentDoc = gql`
  fragment companyBillingAddressFragment on Company {
    billingAddress {
      ...addressFragment
    }
  }
  ${AddressFragmentDoc}
`;
