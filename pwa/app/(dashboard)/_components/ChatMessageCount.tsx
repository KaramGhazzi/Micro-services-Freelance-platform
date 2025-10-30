import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useUnreads } from '@talkjs/react';
import { UnreadConversation } from 'talkjs/all';
import { Assignment } from '@/graphql/types';

type ChatMessageCountProps = {
  children?: React.ReactNode;
  onUnreadMessages: (unreadMessages: UnreadConversation[] | undefined) => void;
};

const ChatMessageCount = forwardRef((props: ChatMessageCountProps, ref) => {
  const { children, onUnreadMessages } = { ...props };
  const unreadMessages: UnreadConversation[] | undefined = useUnreads();

  useEffect(() => {
    onUnreadMessages(unreadMessages);
  }, [unreadMessages]);

  const getTotalMessageCount = () => {
    let totalMessages = 0;

    if (unreadMessages) {
      totalMessages = unreadMessages.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.unreadMessageCount;
      }, 0);
    }
    return totalMessages;
  };

  const getTotalMessageCountForAssignment = (assignment: Assignment) => {
    let totalMessages = 0;

    if (!assignment || !assignment.assignmentApplications) {
      return totalMessages;
    }

    const { assignmentApplications } = assignment;

    if (unreadMessages) {
      const unreadAssignmentApplicationMessages = unreadMessages?.map(
        (unreadMessage) => ({
          assignmentApplicationId: unreadMessage.conversation.id,
          count: unreadMessage.unreadMessageCount,
        })
      );

      const assignmentApplicationsWithUnreadMessages =
        unreadAssignmentApplicationMessages.filter((unreadMessage) =>
          assignmentApplications.some(
            (assignmentApplication) =>
              String(assignmentApplication.id) ===
              unreadMessage.assignmentApplicationId
          )
        );

      totalMessages = assignmentApplicationsWithUnreadMessages.reduce(
        (accumulator, unreadMessage) => {
          return accumulator + unreadMessage.count;
        },
        0
      );
    }

    return totalMessages;
  };

  const hasNewMessage = (assignmentId: string) => {
    if (unreadMessages) {
      const unreadAssignmentApplicationMessages = unreadMessages?.map(
        (unreadMessage) => ({
          assignmentApplicationId: unreadMessage.conversation.id,
        })
      );

      return unreadAssignmentApplicationMessages.some(
        (application) => application.assignmentApplicationId === assignmentId
      );
    } else {
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    getTotalMessageCountForAssignment,
    getTotalMessageCount,
    hasNewMessage,
  }));

  return <>{children}</>;
});

ChatMessageCount.displayName = 'ChatMessageCount';

export default ChatMessageCount;
