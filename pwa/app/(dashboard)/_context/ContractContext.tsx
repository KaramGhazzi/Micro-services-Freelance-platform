'use client';
import { createContext, useEffect, useMemo, useState } from 'react';
import { ProductSlug } from '@package/types/dist/class-validator';
import {
  ActiveContractSlugsQuery,
  useActiveContractSlugsQuery,
} from '@/graphql/queries/contracts/activeContractSlugs.generated';
import { useAuth } from '@/app/_hooks/useAuth';

const ContractContext = createContext<{
  activeContractSlugs: string[] | undefined;
  hasActiveContractSlugs: (productSlugs: ProductSlug[]) => boolean;
  hasFreelancerProContract: boolean;
  hasFreelancerBasicContract: boolean;
  refetchActiveContractSlugs: () => void;
}>({
  activeContractSlugs: [],
  hasActiveContractSlugs: () => false,
  hasFreelancerProContract: false,
  hasFreelancerBasicContract: false,
  refetchActiveContractSlugs: () => {},
});

interface CurrentUserContextProps {
  children?: React.ReactNode;
}

export type CurrentActiveContractSlugs =
  ActiveContractSlugsQuery['activeContractSlugs'];

export const ContractContextProvider = ({
  children,
}: CurrentUserContextProps) => {
  const { data: activeContractSlugsData, refetch: refetchActiveContractSlugs } =
    useActiveContractSlugsQuery();

  const [activeContractSlugs, setActiveContractSlugs] = useState<string[]>();

  const { currentCompanyId } = useAuth();

  const hasActiveContractSlugs = (productSlugs: ProductSlug[]) => {
    if (activeContractSlugs && activeContractSlugs.length > 0) {
      return productSlugs.some((productSlug) =>
        activeContractSlugs.includes(productSlug)
      );
    } else {
      return false;
    }
  };

  useEffect(() => {
    setActiveContractSlugs(activeContractSlugsData?.activeContractSlugs ?? []);
  }, [activeContractSlugsData]);

  useEffect(() => {
    refetchActiveContractSlugs();
  }, [currentCompanyId]);

  const hasFreelancerBasicContract = hasActiveContractSlugs([
    ProductSlug.FREELANCER_BASIC,
  ]);
  const hasFreelancerProContract = hasActiveContractSlugs([
    ProductSlug.FREELANCER_PRO,
  ]);

  const contractObject = useMemo(
    () => ({
      hasActiveContractSlugs,
      refetchActiveContractSlugs,
      hasFreelancerBasicContract,
      hasFreelancerProContract,
      activeContractSlugs,
    }),
    [activeContractSlugs]
  );

  return (
    <ContractContext.Provider value={contractObject}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
