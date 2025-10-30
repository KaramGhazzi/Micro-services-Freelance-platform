'use client';
import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useContext,
  useRef,
} from 'react';
import { Session } from '@talkjs/react';
import { UnreadConversation } from 'talkjs/all';
import ChatMessageCount from '../_components/ChatMessageCount';
import FeatureFlagContext from './FeatureFlagContext';
import { useChat } from '@/app/_hooks/useChat';
import { Assignment } from '@/graphql/types';
import { useAuth } from '@/app/_hooks/useAuth';

const TalkJSContext = createContext<{
  getMessageCountForAssignment: (assignment: Assignment) => number;
  getAssignmentHasNewMessages: (applicationId: string) => boolean;
  getTotalMessageCount: () => number;
  unreadMessages?: UnreadConversation[];
}>({
  getMessageCountForAssignment: () => 0,
  getAssignmentHasNewMessages: () => false,
  getTotalMessageCount: () => 0,
  unreadMessages: [],
});

interface TalkJSContextProps {
  children?: React.ReactNode;
}

export interface ChatMessageRefType {
  getTotalMessageCountForAssignment: (assignment: Assignment) => number;
  hasNewMessage: (assignmentId: string) => boolean;
  getTotalMessageCount: () => number;
}

export const TalkJSContextProvider = ({ children }: TalkJSContextProps) => {
  const { currentUser } = useAuth();
  const { talkjsEnabled } = useContext(FeatureFlagContext);
  const { syncUser, talkJsAppId } = useChat({});
  const [unreadMessages, setUnreadMessages] = useState<
    UnreadConversation[] | undefined
  >();
  const chatMessageRef = useRef<ChatMessageRefType | null>(null);

  useEffect(() => {}, [currentUser, unreadMessages]);

  const getTotalMessageCount = () => {
    if (chatMessageRef.current) {
      return chatMessageRef.current.getTotalMessageCount();
    } else {
      return 0;
    }
  };

  const getMessageCountForAssignment = (assignment: Assignment) => {
    if (chatMessageRef.current) {
      return chatMessageRef.current.getTotalMessageCountForAssignment(
        assignment
      );
    } else {
      return 0;
    }
  };

  const getAssignmentHasNewMessages = (assignmentId: string) => {
    if (chatMessageRef.current) {
      return chatMessageRef.current.hasNewMessage(assignmentId);
    } else {
      return false;
    }
  };

  const talkJSContextObject = useMemo(
    () => ({
      getMessageCountForAssignment,
      getAssignmentHasNewMessages,
      getTotalMessageCount,
      unreadMessages,
    }),
    [unreadMessages]
  );

  const handleUnreadMessages = (
    unreadMessage: UnreadConversation[] | undefined
  ) => {
    setUnreadMessages(unreadMessage);
  };

  if (!talkjsEnabled || !currentUser || !talkJsAppId) {
    return null;
  }

  return (
    <TalkJSContext.Provider value={talkJSContextObject}>
      <Session appId={talkJsAppId} syncUser={syncUser}>
        <ChatMessageCount
          ref={chatMessageRef}
          onUnreadMessages={handleUnreadMessages}
        >
          {children}
        </ChatMessageCount>
      </Session>
    </TalkJSContext.Provider>
  );
};

export default TalkJSContext;
