'use client';
import React from 'react';
import CompanyProfile from '@/app/(dashboard)/opdracht-vinden/opdracht/[opdrachtId]/_components/CompanyProfile';
import { CurrentCompany } from '@/app/(dashboard)/_context/CurrentUserContext';
import { GetAssignmentQuery } from '@/graphql/queries/assignments/getAssignment.generated';
import { CompanyType } from '@/graphql/types';

type AssignmentCompanyAsideProps = {
  assignment: GetAssignmentQuery['assignment'];
  onClick?: () => void;
};

export const AssignmentCompanyAside = ({
  assignment,
  onClick,
}: AssignmentCompanyAsideProps) => {
  return (
    <>
      {assignment?.company &&
        assignment.company.type !== CompanyType.Freelancer && (
          <>
            <CompanyProfile
              onClick={onClick}
              company={assignment?.company as CurrentCompany}
              isVisible={assignment?.descriptionIsVisible}
              isNotVisibleReason={
                assignment?.notVisibleReason
                  ? assignment?.notVisibleReason
                  : undefined
              }
            />
          </>
        )}
    </>
  );
};
