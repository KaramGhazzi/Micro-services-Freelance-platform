'use client';
import React from 'react';
import classNames from 'classnames';
import useTimeAgo from '@/app/_libs/useTimeAgo';

type Props = {
  message: any;
};

const ChatMessage: React.FC<Props> = ({ message }) => {
  // TODO: currentUserId is for demo purpose, replace with real current user id
  const currentUserId = 2;

  const isCurrentUser = message.user.id === currentUserId;

  return (
    <div
      className={classNames({
        'w-full max-w-xs lg:max-w-sm': true,
        'ml-auto': message.user.id === currentUserId,
      })}
    >
      <div
        className={classNames({
          'mb-1.5 rounded-2xl p-3 text-sm font-medium': true,
          'bg-info-500 text-white': isCurrentUser,
          'bg-neutral-100 text-neutral-900': !isCurrentUser,
        })}
      >
        {message.content}
      </div>
      <div className="flex items-center gap-1 text-xs text-neutral-500">
        <figure className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full bg-neutral-100">
          <img src="/demo/logo-ipsum.svg" alt="" />
        </figure>

        <span>
          {message.user.firstName} {message.user.lastName},&nbsp;
          {useTimeAgo(message.date)}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
