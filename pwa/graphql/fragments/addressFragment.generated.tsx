import * as Types from '../types';

import { gql } from '@apollo/client';
export type AddressFragment = {
  __typename?: 'Address';
  id: string;
  name?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  postalCode: string;
  city: string;
  countryCode?: string | null;
};

export const AddressFragmentDoc = gql`
  fragment addressFragment on Address {
    id
    name
    addressLine1
    addressLine2
    postalCode
    city
    countryCode
  }
`;
