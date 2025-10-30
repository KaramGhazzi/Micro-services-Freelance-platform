import { ProductSlug, UsageType } from '@freelance/contract/client';

export type Contract = {
  slug: ProductSlug;
  type: UsageType;
};

export const contracts: Contract[] = [
  {
    slug: ProductSlug.FREELANCER_BASIC,
    type: UsageType.ASSIGNMENT_APPLICATION,
  },
  { slug: ProductSlug.FREELANCER_PRO, type: UsageType.ASSIGNMENT_APPLICATION },
  { slug: ProductSlug.COMPANY_BASIC, type: UsageType.ASSIGNMENT },
  { slug: ProductSlug.COMPANY_TOP, type: UsageType.ASSIGNMENT },
  {
    slug: ProductSlug.COMPANY_PREMIUM_PROFILE,
    type: UsageType.COMPANY_PREMIUM_PROFILE,
  },
  {
    slug: ProductSlug.MARKETMONITOR_BASIC_APPLICATION,
    type: UsageType.ASSIGNMENT_APPLICATION,
  },
  {
    slug: ProductSlug.MARKETMONITOR_BASIC_VIEW,
    type: UsageType.ASSIGNMENT_VIEW,
  },
  {
    slug: ProductSlug.MARKETMONITOR_PREMIUM_APPLICATION,
    type: UsageType.ASSIGNMENT_APPLICATION,
  },
  {
    slug: ProductSlug.MARKETMONITOR_PREMIUM_VIEW,
    type: UsageType.ASSIGNMENT_VIEW,
  },
  {
    slug: ProductSlug.TOP_BOX,
    type: UsageType.TOP_BOX,
  },
];

export const getContract = (slug: ProductSlug) =>
  contracts.find((contract) => contract.slug === slug) as Contract;
