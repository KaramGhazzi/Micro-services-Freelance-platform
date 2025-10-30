import Link from 'next/link';
import { Session } from '@talkjs/react';
import UnreadMessageBubble from './UnreadMessageBubble';
import IconChatBubble from '@/app/_components/icons/IconChatBubble';
import { useChat } from '@/app/_hooks/useChat';
import { useAuth } from '@/app/_hooks/useAuth';

export default function ChatButton() {
  const { currentUser } = useAuth();
  const { syncUser, talkJsAppId } = useChat({});

  return (
    <Link
      href={'/chat'}
      className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-neutral-500 transition-all hover:bg-neutral-50 hover:text-neutral-600"
    >
      <IconChatBubble />

      {talkJsAppId && currentUser && (
        <Session appId={talkJsAppId} syncUser={syncUser}>
          <UnreadMessageBubble />
        </Session>
      )}
    </Link>
  );
}
