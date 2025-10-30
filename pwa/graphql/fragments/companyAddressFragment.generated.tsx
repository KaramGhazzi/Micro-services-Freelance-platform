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

export const CompanyAddressFragmentDoc = gql`
  fragment companyAddressFragment on Company {
    address {
      ...addressFragment
    }
  }
  ${AddressFragmentDoc}
`;
