'use client';

import React from 'react';
import BackgroundInformation from '@/app/_components/application/BaseApplicationBackgroundInformation';
import Details from '@/app/_components/application/BaseApplicationDetails';
import Expertise from '@/app/_components/application/BaseApplicationExpertise';
import General from '@/app/_components/application/BaseApplicationGeneral';
import PersonalQualities from '@/app/_components/application/BaseApplicationPersonalQualities';
import BaseSectionDivider from '@/app/_components/BaseSectionDivider';
import { GetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';

export default function BaseApplicationPage({
  assignmentApplication,
}: {
  assignmentApplication: GetAssignmentApplicationQuery['assignmentApplication'];
}) {
  return (
    <>
      <BaseSectionDivider>
        <Details assignmentApplication={assignmentApplication} />
        <General assignmentApplication={assignmentApplication} />
        <Expertise assignmentApplication={assignmentApplication} />
        <PersonalQualities assignmentApplication={assignmentApplication} />
        <BackgroundInformation assignmentApplication={assignmentApplication} />
      </BaseSectionDivider>
    </>
  );
}
