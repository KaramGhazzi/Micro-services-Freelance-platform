import React, { useContext, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Assignment, AssignmentStatus } from '@/graphql/types';
import IconXCircleFill from '@/app/_components/icons/IconXCircleFill';
import BaseStatus from '@/app/_components/BaseStatus';
import IconArrowRight from '@/app/_components/icons/IconArrowRight';
import IconClock from '@/app/_components/icons/IconClock';
import IconEye from '@/app/_components/icons/IconEye';
import IconChatBubble from '@/app/_components/icons/IconChatBubble';
import IconSearchDocument from '@/app/_components/icons/IconSearchDocument';
import IconUser from '@/app/_components/icons/IconUser';
import IconChatAltFilled from '@/app/_components/icons/IconChatAltFilled';
import IconChatAlt from '@/app/_components/icons/IconChatAlt';
import TalkJSContext from '@/app/(dashboard)/_context/TalkJSContext';

interface AssignmentCardProps {
  assignment?: any;
  index?: number;
  showOwner?: boolean;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  index,
  showOwner,
}) => {
  const t = useTranslations('assignment');
  const { getMessageCountForAssignment, unreadMessages } =
    useContext(TalkJSContext);

  const hasNewMessages = (assignment: Assignment) => {
    const hasUnreadApplications = assignment?.assignmentApplications?.some(
      (application) => {
        return !application.isRead;
      }
    );
    return (
      getMessageCountForAssignment(assignment) > 0 || hasUnreadApplications
    );
  };

  useEffect(() => {}, [unreadMessages]);

  const declinedAssignment = assignment?.status === AssignmentStatus.Declined;
  const showDate = new Date(assignment?.publishAt ?? assignment?.updatedAt);

  const getHref = (status: AssignmentStatus, id: string) => {
    switch (status) {
      case AssignmentStatus.Concept:
        return `/opdracht-plaatsen/nieuwe-opdracht/bewerken/${id}`;
      case AssignmentStatus.PendingReview:
      case AssignmentStatus.InReview:
      case AssignmentStatus.Declined:
      case AssignmentStatus.Archived:
        return `/opdracht-plaatsen/mijn-opdrachten/${id}/details`;
      default:
        return `/opdracht-plaatsen/mijn-opdrachten/${id}`;
    }
  };

  const href = getHref(assignment.status, assignment.id);

  return (
    <Link
      key={index}
      className="hover:pointer-cursor group relative flex flex-col gap-4 border border-transparent bg-white px-5 py-5 shadow-sm transition-all hover:border-neutral-300 lg:rounded-2xl lg:p-8 lg:py-8"
      href={href}
    >
      <header className="grow">
        <div className="mb-3 flex justify-between gap-3">
          <BaseStatus theme={assignment?.status!}>
            {t(`status.${assignment?.status}`)}
          </BaseStatus>
        </div>
        <div className="line-clamp-2">
          <h2 className="font-heading text-base font-bold tracking-tight text-neutral-900">
            {assignment?.title}
          </h2>
        </div>
      </header>
      {!declinedAssignment ? (
        <ul className="grid gap-2">
          {assignment?.externalCode && (
            <li className="flex gap-2 text-sm text-neutral-700">
              <IconSearchDocument className="shrink-0 text-neutral-400" />
              <span>{assignment?.externalCode}</span>
            </li>
          )}
          <li className="flex gap-2 text-sm text-neutral-700">
            <IconEye className="shrink-0 text-neutral-400" />
            <span>{t('detail.views', { count: assignment?.viewsCount })}</span>
          </li>
          <li className="flex gap-2 text-sm text-neutral-700">
            <IconChatBubble className="text-neutral-400" />
            <span>
              {t('detail.comments', {
                count: assignment.commentsCount,
              })}
            </span>
          </li>
          <li className="flex gap-2 text-sm text-neutral-700">
            <IconClock className="text-neutral-400" />
            <span suppressHydrationWarning>
              {new Intl.DateTimeFormat('nl-NL', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(showDate)}
            </span>
          </li>
          {showOwner && (
            <li className="flex gap-2 text-sm text-neutral-700">
              <IconUser className="text-neutral-400" />
              <span>{`${assignment.owner?.firstName} ${assignment.owner?.lastName}`}</span>
            </li>
          )}
          {hasNewMessages(assignment) ? (
            <li className="text-secondary-500 flex gap-2 text-sm">
              <IconChatAltFilled />
              <span className="text-secondary-600 font-semibold">
                {t('detail.newActivity')}
              </span>
            </li>
          ) : (
            <li className="flex gap-2 text-sm text-neutral-700">
              <IconChatAlt className="text-neutral-400" />
              <span>{t('detail.noNewActivity')}</span>
            </li>
          )}
        </ul>
      ) : (
        <div className="flex items-center gap-2 text-red-600">
          <IconXCircleFill />
          <p className="text-sm font-semibold  text-red-700">
            {' '}
            {t('declineReason')}{' '}
          </p>
        </div>
      )}

      <div className="absolute bottom-8 right-8 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
        <IconArrowRight className="text-neutral-900" />
      </div>
    </Link>
  );
};

export default AssignmentCard;
