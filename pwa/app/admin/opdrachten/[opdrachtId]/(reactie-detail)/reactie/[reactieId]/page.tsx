'use client';
import React, { useContext } from 'react';

import BaseApplicationPage from '@/app/_components/application/BaseApplicationPage';
import FeatureFlagContext from '@/app/(dashboard)/_context/FeatureFlagContext';
import BaseChatInactiveAlert from '@/app/_components/BaseChatInactiveAlert';
import { useGetAssignmentApplicationAdminQuery } from '@/graphql/queries/assignments/getAssignmentApplicationAdmin.generated';
import { GetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';
import BaseChat from '@/app/_components/BaseChat';
import { AssignmentStatus } from '@/graphql/types';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Page({
  params,
}: {
  params: { opdrachtId: number; reactieId: number };
}) {
  const { currentUser } = useAuth();
  const { talkjsEnabled } = useContext(FeatureFlagContext);

  const { data: { assignmentApplicationAdmin } = {}, loading } =
    useGetAssignmentApplicationAdminQuery({
      variables: {
        where: { id: { equals: Number(params.reactieId) } },
      },
    });

  const canViewChat =
    assignmentApplicationAdmin?.assignment.status ===
      AssignmentStatus.Published ||
    assignmentApplicationAdmin?.assignment.status === AssignmentStatus.Paused ||
    assignmentApplicationAdmin?.assignment.status === AssignmentStatus.Closed;

  return (
    <>
      {!loading && assignmentApplicationAdmin && (
        <div className="flex-grow xl:flex">
          <BaseApplicationPage
            assignmentApplication={
              assignmentApplicationAdmin as GetAssignmentApplicationQuery['assignmentApplication']
            }
          />
          <aside className="top-[140px] h-[440px] w-full border-t-4 border-neutral-50 lg:h-[calc(100vh-196px)] xl:sticky xl:max-w-sm xl:border-0 2xl:max-w-md">
            {!talkjsEnabled && <BaseChatInactiveAlert />}
            {assignmentApplicationAdmin &&
              currentUser &&
              talkjsEnabled &&
              canViewChat && (
                <BaseChat
                  type="chatAsGuests"
                  assignmentApplication={
                    assignmentApplicationAdmin as GetAssignmentApplicationQuery['assignmentApplication']
                  }
                  asGuest
                />
              )}
          </aside>
        </div>
      )}
    </>
  );
}
