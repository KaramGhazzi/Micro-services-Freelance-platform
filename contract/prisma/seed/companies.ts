import { ProductSlug } from '@freelance/contract/client';
import { Contract, getContract } from './contracts';

export type Company = {
  name: string;
  contracts?: Contract[];
};

const postfix = 'Inc.';
// Each company will automatically get a COMPANY_BASIC contract
export const companies: Company[] = [
  { name: `Lunchroom De Koe B.V.`, contracts: [] },
  {
    name: `Free Lancer ${postfix}`,
    contracts: [getContract(ProductSlug.FREELANCER_BASIC)],
  },
  {
    name: `Deta Cheerder ${postfix}`,
    contracts: [getContract(ProductSlug.COMPANY_TOP)],
  },
  { name: `Inter Mediair ${postfix}` },
  {
    name: `Free Lancer Pro ${postfix}`,
    contracts: [
      getContract(ProductSlug.FREELANCER_BASIC),
      getContract(ProductSlug.FREELANCER_PRO),
      getContract(ProductSlug.COMPANY_TOP),
    ],
  },
  {
    name: `Be Heerder ${postfix}`,
    contracts: [
      getContract(ProductSlug.COMPANY_TOP),
      getContract(ProductSlug.FREELANCER_PRO),
    ],
  },
  {
    name: `Eind Gebruiker ${postfix}`,
    contracts: [getContract(ProductSlug.FREELANCER_BASIC)],
  },
  {
    name: `Premium Bedrijfsprofiel ${postfix}`,
    contracts: [getContract(ProductSlug.COMPANY_PREMIUM_PROFILE)],
  },
  {
    name: `Markt Monitor ${postfix}`,
    contracts: [
      getContract(ProductSlug.MARKETMONITOR_BASIC_APPLICATION),
      getContract(ProductSlug.MARKETMONITOR_BASIC_VIEW),
    ],
  },
  {
    name: `Premium Markt Monitor ${postfix}`,
    contracts: [
      getContract(ProductSlug.MARKETMONITOR_PREMIUM_APPLICATION),
      getContract(ProductSlug.MARKETMONITOR_PREMIUM_VIEW),
    ],
  },
  {
    name: `TOP-box ${postfix}`,
    contracts: [getContract(ProductSlug.TOP_BOX)],
  },
];
