'use client';
import { useTranslations } from 'next-intl';
import { useAuth } from '../_hooks/useAuth';
import { BaseReviewsPageType } from './BaseReviewsPage';
import BaseButton from './BaseButton';
import IconTrash from './icons/IconTrash';
import { ReviewType, Review, UserRole } from '@/graphql/types';
import IconThumbsUp from '@/app/_components/icons/IconThumbsUp';
import BaseUserAvatar from '@/app/_components/BaseUserAvatar';

const BaseReviewCard = ({
  review,
  type,
  onDelete: onDelete,
}: {
  review: Review;
  type: BaseReviewsPageType;
  onDelete: (reviewId: number) => void;
}) => {
  const {
    type: reviewType,
    receivedBy,
    createdAt,
    content,
    assignment,
    createdBy,
    id,
  } = review;
  const t = useTranslations();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === UserRole.Admin;

  const reviewUser =
    type === BaseReviewsPageType.CREATED ? receivedBy : createdBy;

  const handleDeleteReview = () => {
    onDelete(Number(id));
  };

  return (
    <>
      <article className="border-b border-neutral-100 bg-white p-5 py-6 lg:rounded-2xl lg:border-0 lg:p-6 lg:shadow-sm">
        <header className="flex justify-between gap-4">
          <div className="flex flex-row gap-4">
            <BaseUserAvatar size="md" />
            <div className="grid gap-1">
              <h4 className="font-heading font-bold tracking-tight">
                {reviewUser?.firstName} {reviewUser?.lastName}
              </h4>
              <div>
                <div className="flex gap-1 text-sm text-neutral-500">
                  <span
                    className={`${
                      reviewType === ReviewType.Top
                        ? 'text-success-400 '
                        : 'text-warning-500 '
                    }`}
                  >
                    {reviewType === ReviewType.Top ? (
                      <IconThumbsUp />
                    ) : (
                      <IconThumbsUp className="rotate-180" />
                    )}
                  </span>
                  <span className="mr-1 font-semibold uppercase text-neutral-900">
                    {reviewType}
                  </span>
                  <span suppressHydrationWarning>
                    {t('assignment.reviewDate', {
                      date: new Intl.DateTimeFormat('nl-NL', {
                        dateStyle: 'medium',
                      }).format(new Date(createdAt)),
                    })}
                  </span>
                </div>
              </div>

              {assignment?.title && (
                <div className="text-sm text-neutral-500">
                  {t('global.reviewOn')}:{' '}
                  <span className="font-semibold text-neutral-900">
                    {assignment.title} ({assignment.company.name})
                  </span>
                </div>
              )}
            </div>
          </div>
          {(type === BaseReviewsPageType.CREATED || isAdmin) && (
            <div className="grid grid-cols-1 gap-4">
              {/* TODO: Disabled for FNG-2558 */}
              {/* <BaseButton theme="secondary" size="lg" square>
                <IconPencil />
              </BaseButton> */}
              <BaseButton
                theme="secondary"
                size="lg"
                square
                onClick={handleDeleteReview}
              >
                <IconTrash />
              </BaseButton>
            </div>
          )}
        </header>
        <div className="mt-6">
          <p className="text-sm text-neutral-700">{content}</p>
        </div>
      </article>
    </>
  );
};

export default BaseReviewCard;
