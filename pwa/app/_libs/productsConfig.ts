import { Interval, RenewalInterval, ProductSlug } from '@/graphql/types';

export interface FieldOptions {
  enabled: boolean;
  options?: any[];
}

export interface FieldConfig {
  company: FieldOptions;
  productType: FieldOptions;
  amountOfCredits: FieldOptions;
  usageInterval: FieldOptions;
  startDate: FieldOptions;
  renewalInterval: FieldOptions;
  autoRenew: FieldOptions;
}

// Common field configurations
const BASIC_CONFIG: FieldConfig = {
  company: { enabled: false },
  productType: { enabled: false },
  amountOfCredits: { enabled: true, options: ['>=0'] },
  usageInterval: { enabled: false },
  startDate: { enabled: false },
  renewalInterval: { enabled: false },
  autoRenew: { enabled: false },
};

const BASIC_WITH_INTERVAL_CONFIG: FieldConfig = {
  ...BASIC_CONFIG,
  usageInterval: {
    enabled: true,
    options: [
      Interval.Week,
      Interval.Month,
      Interval.Quarter,
      Interval.HalfYear,
      Interval.Year,
    ],
  },
};

// New configuration specific to Marketmonitor Premium products
const PREMIUM_CONFIG: FieldConfig = {
  ...BASIC_WITH_INTERVAL_CONFIG,
  startDate: { enabled: true, options: [] },
  renewalInterval: {
    enabled: true,
    options: [
      RenewalInterval.Month,
      RenewalInterval.Quarter,
      RenewalInterval.HalfYear,
      RenewalInterval.Year,
    ],
  },
  autoRenew: { enabled: true, options: ['Ja', 'Nee'] },
};

// Main field configuration map
export const FieldConfig: Record<ProductSlug, FieldConfig> = {
  [ProductSlug.CompanyBasic]: BASIC_CONFIG,
  [ProductSlug.CompanyTop]: BASIC_CONFIG,
  [ProductSlug.TopBox]: BASIC_CONFIG,

  [ProductSlug.MarketmonitorBasicView]: BASIC_WITH_INTERVAL_CONFIG,
  [ProductSlug.MarketmonitorBasicApplication]: BASIC_WITH_INTERVAL_CONFIG,
  [ProductSlug.FreelancerBasic]: BASIC_WITH_INTERVAL_CONFIG,
  [ProductSlug.FreelancerPro]: BASIC_WITH_INTERVAL_CONFIG,

  [ProductSlug.CompanyPremiumProfile]: PREMIUM_CONFIG,
  [ProductSlug.CompanyPremiumAssignment]: PREMIUM_CONFIG,
  [ProductSlug.MarketmonitorPremiumView]: PREMIUM_CONFIG,
  [ProductSlug.MarketmonitorPremiumApplication]: PREMIUM_CONFIG,
};
