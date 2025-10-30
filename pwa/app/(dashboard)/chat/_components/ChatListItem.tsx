'use client';
import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import useTimeAgo from '@/app/_libs/useTimeAgo';
import BaseUserAvatar from '@/app/_components/BaseUserAvatar';

type Props = {
  chat: any;
};

const ChatListItem: React.FC<Props> = ({ chat }) => {
  const currentRoute = usePathname();

  const isCurrentRoute = currentRoute === `/chat/${chat.id}`;

  return (
    <Link
      href={`/chat/${chat.id}`}
      className={classNames({
        'relative flex gap-3 border-b border-neutral-100 p-5 transition-all lg:pl-10':
          true,
        'bg-white hover:bg-neutral-50': !isCurrentRoute,
        'bg-info-50': isCurrentRoute,
      })}
    >
      <div>
        <BaseUserAvatar size="md" />
      </div>
      <div className="grow overflow-hidden pt-0.5">
        <div className="mb-1 flex gap-3">
          <div className="font-heading grow truncate text-sm font-bold tracking-tight">
            {chat.user.firstName} {chat.user.lastName}
          </div>

          {isCurrentRoute && (
            <i className="bg-info-300 absolute bottom-0 right-0 top-0 w-1"></i>
          )}

          <div
            className={classNames({
              'shrink-0 text-xs leading-5': true,
              'text-secondary-500': chat.unreadMessagesCount > 0,
              'text-neutral-500': chat.unreadMessagesCount === 0,
            })}
          >
            {useTimeAgo(chat.updatedAt)}
          </div>
        </div>
        <div className="flex">
          <div className="truncate text-sm text-neutral-600">
            {chat.latestMessage ?? '-'}
          </div>
          <div className="shrink-0">
            {chat.unreadMessagesCount > 0 && (
              <div className="bg-secondary-500 flex h-5 min-w-[20px] items-center justify-center rounded-full px-[3px] text-xs font-semibold text-white">
                {chat.unreadMessagesCount}
              </div>
            )}
          </div>
        </div>
        <div className="text-primary-600 mt-2.5 flex items-center gap-1.5 overflow-hidden text-xs font-medium">
          <span className="truncate">{chat.assignment?.title ?? '-'}</span>
          <i className="inline-flex h-1 w-1 rounded-full bg-current"></i>
          <span className="whitespace-nowrap">
            {chat.assignment?.company?.name ?? '-'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;
