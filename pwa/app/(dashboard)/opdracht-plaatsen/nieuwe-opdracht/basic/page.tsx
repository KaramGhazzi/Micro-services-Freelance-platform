'use client';
import React, { useContext, useEffect, useState } from 'react';
import { ProductSlug } from '@/../../packages/types/dist/class-validator/@generated/contract/enums';
import { useRouter } from 'next/navigation';
import { AssignmentFormHelpAside } from '@/app/_components/assignment/AssignmentFormHelpAside';
import AssignmentFormPage from '@/app/_components/assignment/AssignmentFormPage';
import { AssignmentType } from '@/graphql/types';
import TopBoxEmployers from '@/app/_components/TopBoxEmployers';
import ContractContext from '@/app/(dashboard)/_context/ContractContext';
import { useRemainingUsageByProductSlugQuery } from '@/graphql/queries/usage/remainingUsageByProductSlug.generated';

export default function NewAssignment() {
  const { hasActiveContractSlugs } = useContext(ContractContext);
  const router = useRouter();
  const { data: basicCreditData, loading } =
    useRemainingUsageByProductSlugQuery({
      variables: { productSlug: ProductSlug.COMPANY_BASIC },
    });

  const [hasBasicCredits, setHasBasicCredits] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (basicCreditData) {
      const hasCredits =
        basicCreditData?.remainingUsageByProductSlug?.amount > 0;
      setHasBasicCredits(!!hasCredits);
      setDataLoaded(true);
    }
  }, [basicCreditData]);

  useEffect(() => {
    if (
      (dataLoaded && !hasBasicCredits) ||
      (dataLoaded && hasActiveContractSlugs([ProductSlug.COMPANY_TOP]))
    ) {
      router.push('/opdracht-plaatsen/nieuwe-opdracht/top');
    }
  }, [dataLoaded, hasBasicCredits]);

  if (loading || !dataLoaded) {
    return <></>;
  }

  if (hasBasicCredits && !hasActiveContractSlugs([ProductSlug.COMPANY_TOP])) {
    return (
      <AssignmentFormPage
        assignmentType={AssignmentType.Basic}
        asideComponent={
          <>
            <AssignmentFormHelpAside />
            <TopBoxEmployers />
          </>
        }
        isNewAssignment
      />
    );
  }

  return <></>;
}
