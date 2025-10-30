import { Company, Contract, ProductSlug } from '@/graphql/types';

export const renderContracts = (
  company: Company,
  t: (key: string) => string
) => {
  const basicProductSlugs = [
    ProductSlug.FreelancerBasic,
    ProductSlug.CompanyBasic,
    ProductSlug.MarketmonitorBasicView,
    ProductSlug.MarketmonitorBasicApplication,
  ];

  const paidContracts = company.contracts
    .filter(
      (contract: Contract) =>
        (!contract.endDate || new Date(contract.endDate) > new Date()) &&
        !basicProductSlugs.includes(contract.plan.product.slug)
    )
    .map((contract: Contract) => t(`products.${contract.plan.product.slug}`))
    .join(', ');

  return paidContracts || '-';
};
