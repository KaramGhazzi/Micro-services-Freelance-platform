import React from 'react';
import { Chatbox, Inbox, Session } from '@talkjs/react';
import { ThemeOptions } from 'talkjs/all';
import { useChat } from '../_hooks/useChat';
import UnreadMessageBubble from '../(dashboard)/_components/layout/UnreadMessageBubble';
import { AssignmentStatus } from '@/graphql/types';
import { GetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';

type ChatProps = {
  type: 'chat' | 'chatAsGuests' | 'inbox' | 'unreadMessages';
  assignmentApplication?: GetAssignmentApplicationQuery['assignmentApplication'];
  asGuest?: boolean;
};

const BaseChat = ({ type, assignmentApplication, asGuest }: ChatProps) => {
  const { syncConversation, syncUser, talkJsAppId } = useChat({
    assignmentApplication,
    asGuest,
  });

  const getColorForStatus = (assignmentStatus: AssignmentStatus) => {
    switch (assignmentStatus) {
      case AssignmentStatus.Concept:
      case AssignmentStatus.Closed:
      case AssignmentStatus.Archived:
      case AssignmentStatus.Paused: {
        return '#e3e9ed'; //bg-neutral-100
      }
      case AssignmentStatus.Published: {
        return '#e4f4d3'; //bg-success-100
      }
      case AssignmentStatus.PendingReview:
      case AssignmentStatus.InReview:
      case AssignmentStatus.Publishing: {
        return '#fef3c7'; //bg-warning-100
      }
      default: {
        return '#e3e9ed'; //bg-neutral-100
      }
    }
  };

  const themeOptions: ThemeOptions = {
    custom: {
      assignmentStatusColor: String(
        getColorForStatus(
          assignmentApplication?.assignment.currentStatus
            .key as AssignmentStatus
        )
      ),
    },
  };

  const renderChat = () => {
    switch (type) {
      case 'chat': {
        return (
          <Chatbox
            syncConversation={syncConversation}
            className="flex h-full flex-grow xl:border-r-0"
            theme={themeOptions}
          />
        );
      }
      case 'chatAsGuests': {
        return (
          <Chatbox
            syncConversation={syncConversation}
            className="flex h-full flex-grow xl:border-r-0"
            theme={themeOptions}
            asGuest={asGuest}
          />
        );
      }
      case 'inbox': {
        return <Inbox className="flex h-[calc(100vh-150px)] w-full" />;
      }
      case 'unreadMessages': {
        return <UnreadMessageBubble />;
      }
    }
  };
  return (
    <>
      {talkJsAppId && (
        <Session appId={talkJsAppId} syncUser={syncUser}>
          {renderChat()}
        </Session>
      )}
    </>
  );
};

export default BaseChat;
