'use client';

import { useContext } from 'react';
import FeatureFlagContext from '@/app/(dashboard)/_context/FeatureFlagContext';
import BackgroundInformation from '@/app/_components/application/BaseApplicationBackgroundInformation';
import Details from '@/app/_components/application/BaseApplicationDetails';
import Expertise from '@/app/_components/application/BaseApplicationExpertise';
import General from '@/app/_components/application/BaseApplicationGeneral';
import PersonalQualities from '@/app/_components/application/BaseApplicationPersonalQualities';
import BaseChat from '@/app/_components/BaseChat';
import BaseChatInactiveAlert from '@/app/_components/BaseChatInactiveAlert';
import BaseSectionDivider from '@/app/_components/BaseSectionDivider';
import { useAuth } from '@/app/_hooks/useAuth';
import { useGetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';
import { AssignmentStatus } from '@/graphql/types';

export default function Page({
  params,
}: Readonly<{
  params: { opdrachtId: number; reactieId: number };
}>) {
  const { currentUser } = useAuth();
  const { talkjsEnabled } = useContext(FeatureFlagContext);
  const { data: { assignmentApplication } = {}, loading } =
    useGetAssignmentApplicationQuery({
      variables: {
        where: { id: { equals: Number(params.reactieId) } },
      },
    });

  return (
    <>
      {!loading && (
        <div className="flex-grow xl:flex">
          <BaseSectionDivider>
            <Details assignmentApplication={assignmentApplication} />
            <General assignmentApplication={assignmentApplication} />
            <Expertise assignmentApplication={assignmentApplication} />
            <PersonalQualities assignmentApplication={assignmentApplication} />
            <BackgroundInformation
              assignmentApplication={assignmentApplication}
            />
          </BaseSectionDivider>
          <aside className="top-[140px] h-[440px] w-full border-t-4 border-neutral-50 lg:h-[calc(100vh-196px)] xl:sticky xl:max-w-sm xl:border-0 2xl:max-w-md">
            {!talkjsEnabled && <BaseChatInactiveAlert />}
            {currentUser &&
              talkjsEnabled &&
              assignmentApplication?.assignment.status !==
                AssignmentStatus.Archived && (
                <BaseChat
                  type="chat"
                  assignmentApplication={assignmentApplication}
                />
              )}
          </aside>
        </div>
      )}
    </>
  );
}
