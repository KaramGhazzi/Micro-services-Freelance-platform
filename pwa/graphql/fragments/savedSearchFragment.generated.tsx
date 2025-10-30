import * as Types from '../types';

import { gql } from '@apollo/client';
export type SavedSearchFragment = {
  __typename?: 'SavedSearch';
  id: string;
  description: string;
  batchAlert: boolean;
  instantAlert: boolean;
  lastViewedAt: any;
  updatedAt: any;
  newMatchesCount: number;
  searchTags?: string | null;
  expertises?: string | null;
  locations?: string | null;
  onLocation: boolean;
  noMatchingIntermediaries: boolean;
  minHoursPerWeek?: number | null;
  maxHoursPerWeek?: number | null;
};

export const SavedSearchFragmentDoc = gql`
  fragment savedSearchFragment on SavedSearch {
    id
    description
    batchAlert
    instantAlert
    lastViewedAt
    updatedAt
    newMatchesCount
    searchTags
    expertises
    locations
    onLocation
    noMatchingIntermediaries
    minHoursPerWeek
    maxHoursPerWeek
  }
`;
