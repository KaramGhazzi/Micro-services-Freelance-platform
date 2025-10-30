'use client';
import React, { useContext } from 'react';
import BaseApplicationPage from '@/app/_components/application/BaseApplicationPage';
import {
  GetAssignmentApplicationQuery,
  useGetAssignmentApplicationQuery,
} from '@/graphql/queries/assignments/getAssignmentApplication.generated';
import BaseChatInactiveAlert from '@/app/_components/BaseChatInactiveAlert';
import FeatureFlagContext from '@/app/(dashboard)/_context/FeatureFlagContext';
import BaseChat from '@/app/_components/BaseChat';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Page({
  params,
}: {
  params: { opdrachtId: number; reactieId: number };
}) {
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
      {!loading && assignmentApplication && (
        <div className="flex-grow xl:flex">
          <BaseApplicationPage
            assignmentApplication={
              assignmentApplication as GetAssignmentApplicationQuery['assignmentApplication']
            }
          />
          <aside className="top-[140px] h-[440px] w-full border-t-4 border-neutral-50 lg:h-[calc(100vh-196px)] xl:sticky xl:max-w-sm xl:border-0 2xl:max-w-md">
            {!talkjsEnabled && <BaseChatInactiveAlert />}
            {assignmentApplication && currentUser && talkjsEnabled && (
              <BaseChat
                type="chat"
                assignmentApplication={
                  assignmentApplication as GetAssignmentApplicationQuery['assignmentApplication']
                }
              />
            )}
          </aside>
        </div>
      )}
    </>
  );
}
