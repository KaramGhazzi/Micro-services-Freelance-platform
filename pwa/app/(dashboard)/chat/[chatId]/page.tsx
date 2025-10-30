'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import Link from 'next/link';
import ChatMessage from '../_components/ChatMessage';
import BaseButton from '@/app/_components/BaseButton';
import BaseUserAvatar from '@/app/_components/BaseUserAvatar';
import BaseStatus from '@/app/_components/BaseStatus';
import IconPaperPlaneFill from '@/app/_components/icons/IconPaperPlaneFill';
import IconChevronLeft from '@/app/_components/icons/IconChevronLeft';

export default function Chat() {
  const t = useTranslations();
  const [message, setMessage] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  const chat = {
    user: { firstName: 'Tim', lastName: 'van Daatselaar' },
    updatedAt: '2023-12-31 00:00:00.000',

    assignment: {
      title: 'Backend Developer',
      company: {
        name: 'Company name',
      },
    },

    messages: [
      {
        content: 'Test message',
        date: '2023-12-31 00:00:00.000',
        user: {
          id: 1,
          firstName: 'Marjolijn',
          lastName: 'van Voorst',
        },
      },
      {
        content: 'Test message 2',
        date: '2024-02-08 00:00:00.000',
        user: {
          id: 2,
          firstName: 'Tim',
          lastName: 'van Daatselaar',
        },
      },
    ],
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex min-w-0 justify-between gap-5 border-b border-neutral-100 bg-white px-4 py-3 sm:px-5 sm:py-5 lg:px-10 lg:py-6">
        <div className="flex items-center overflow-hidden">
          <div className="shrink-0">
            <Link
              href="/chat"
              className="flex h-10 w-10 items-center justify-start pl-1 transition-all lg:hidden"
            >
              <IconChevronLeft className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex min-w-0 gap-3 overflow-hidden">
            <BaseUserAvatar size="md" />
            <div className="overflow-hidden">
              <div className="font-heading mt-0.5 grow truncate text-base font-bold tracking-tight">
                {chat.user.firstName} {chat.user.lastName}
              </div>
              <div className="flex min-w-0 items-center gap-3 overflow-hidden">
                <div className="text-primary-600 flex min-w-0 items-center gap-1.5 overflow-hidden text-sm font-medium">
                  <span className="truncate">
                    {chat.assignment?.title ?? '-'}
                  </span>
                  <i className="inline-flex h-1 w-1 shrink-0 rounded-full bg-current"></i>
                  <span className="truncate whitespace-nowrap">
                    {chat.assignment?.company?.name ?? '-'}
                  </span>
                </div>

                <div className="shrink-0">
                  <BaseStatus theme={'NEW'}>
                    {t(`assignment.status.NEW`)}
                  </BaseStatus>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <BaseButton theme="secondary">{t('chat.checkAssignment')}</BaseButton>
        </div>
      </header>

      <section className="flex grow flex-col gap-5 overflow-y-auto px-5 py-5 lg:px-10">
        {chat.messages?.map((message, index) => {
          return (
            <div key={index}>
              <ChatMessage message={message} />
            </div>
          );
        })}

        <div ref={bottomRef} />
      </section>

      <footer className="border-t border-neutral-100 bg-white p-4 py-3 sm:p-5 lg:p-6">
        <form className="relative">
          <textarea
            placeholder={t(`chat.placeholder`)}
            className="ring-secondary-500/20 focus:border-secondary-300 h-16 w-full resize-none rounded-lg border border-neutral-100 px-5 py-3.5 font-sans text-sm placeholder-neutral-300 shadow-sm outline-none transition-all focus:ring-2 lg:h-20"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className={classNames({
              'hover:bg-primary-100 absolute right-1 top-1 rounded-lg p-2 transition-all':
                true,
              'text-primary-600': message.length > 0,
              'pointer-events-none text-neutral-400': message.length === 0,
            })}
          >
            <IconPaperPlaneFill />
          </button>
        </form>
      </footer>
    </div>
  );
}
