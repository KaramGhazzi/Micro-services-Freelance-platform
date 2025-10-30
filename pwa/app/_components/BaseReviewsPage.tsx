'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '../_hooks/useAuth';
import BaseEmptyState from './BaseEmptyState';
import Modal from './BaseDialog';
import BaseHeading from './BaseHeading';
import IconCheckmarkMd from './icons/IconCheckmarkMd';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import BaseButton from '@/app/_components/BaseButton';
import BaseReviewCard from '@/app/_components/BaseReviewCard';
import { Review, ReviewWhereInput, SortOrder } from '@/graphql/types';
import { useReviewsQuery } from '@/graphql/queries/reviews/reviews.generated';
import { useDeleteReviewMutation } from '@/graphql/mutations/reviews/deleteReview.generated';

interface PageProps {
  title: string;
  type: BaseReviewsPageType;
  hasToolbar?: boolean;
  companyId?: number;
  createdByUserId?: number;
  receivedByUserId?: number;
}

export enum BaseReviewsPageType {
  CREATED = 'created',
  RECEIVED = 'reveived',
}

const BaseReviewsPage = ({
  title,
  type,
  companyId,
  createdByUserId,
  receivedByUserId,
  hasToolbar,
}: PageProps) => {
  const t = useTranslations();
  const [currentTake, setCurrentTake] = useState(5);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsCount, setReviewsCount] = useState<number>(0);
  const { isAdminUser } = useAuth();
  const [reviewIdToBeDeleted, setReviewIdToBeDeleted] = useState<number>(0);

  useEffect(() => {
    loadMoreReviews();
  }, [currentTake, reviews]);

  const { refetch: refetchReviews } = useReviewsQuery({
    skip: true,
  });

  const loadMoreReviews = async () => {
    let where: ReviewWhereInput = {};

    if (isAdminUser && companyId) {
      where.companyId = { equals: companyId };
    }

    if (createdByUserId) {
      where.createdById = { equals: createdByUserId };
    }

    if (receivedByUserId && companyId) {
      where.receivedById = { equals: receivedByUserId };
      where.companyId = { equals: companyId };
      where.assignment = {
        is: {
          companyId: {
            equals: companyId,
          },
        },
      };
    }

    const data = await refetchReviews({
      where,
      orderBy: [{ createdAt: SortOrder.Desc }],
      take: currentTake,
    });

    setReviews(data?.data?.reviews as Review[]);
    setReviewsCount(data.data.count);
  };

  const handleLoadMoreClick = () => {
    setCurrentTake((prevCurrentTake) => prevCurrentTake + 5);
  };

  const [deleteReviewMutation] = useDeleteReviewMutation();
  const [deleteReviewModalActive, setDeleteReviewModalActive] = useState(false);
  const [deleteReviewConfirmModalActive, setDeleteReviewConfirmModalActive] =
    useState(false);

  const handleDeleteReview = (reviewId: number) => {
    setReviewIdToBeDeleted(reviewId);
    setDeleteReviewModalActive(true);
  };

  const deleteReview = async () => {
    setDeleteReviewModalActive(false);
    try {
      const { data: isReviewDeleted } = await deleteReviewMutation({
        variables: {
          reviewId: Number(reviewIdToBeDeleted),
        },
      });

      if (!!isReviewDeleted) {
        setDeleteReviewConfirmModalActive(true);
        const updatedReviews = reviews.filter(
          (review) => Number(review.id) === Number(reviewIdToBeDeleted)
        );
        setReviews(updatedReviews);
      }
    } catch (error) {
      console.log(error);
    }

    return false;
  };

  const renderReviews = () => {
    return (
      <div className="grid lg:max-w-4xl lg:gap-4">
        {reviews?.map((review) => {
          return (
            <BaseReviewCard
              key={`review-${review.id}`}
              review={review}
              type={type}
              onDelete={handleDeleteReview}
            />
          );
        })}

        {reviewsCount > currentTake && (
          <div className="mb-5 mt-5 flex w-full justify-center lg:mb-0">
            <BaseButton
              size="lg"
              theme="secondary"
              loading={false}
              onClick={handleLoadMoreClick}
            >
              {t('company.loadMoreReviews')}
            </BaseButton>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {hasToolbar && (
        <BaseToolbarSub
          title={title}
          subtitle={t('global.resultsCount', { count: reviewsCount })}
        />
      )}

      <section className="flex-grow xl:flex">
        <div className="flex-grow border-neutral-100 p-5 lg:p-10 xl:border-r">
          {reviews && reviews.length > 0 && renderReviews()}
          {reviews &&
            reviews.length === 0 &&
            type === BaseReviewsPageType.CREATED && (
              <BaseEmptyState
                imageUrl="/illustration/ratings.svg"
                title={t(`emptyState.reviewsCreated.title`)}
                description={t(`emptyState.reviewsCreated.description`)}
              />
            )}

          {reviews &&
            reviews.length === 0 &&
            type === BaseReviewsPageType.RECEIVED && (
              <BaseEmptyState
                imageUrl="/illustration/ratings.svg"
                title={t(`emptyState.reviewsReceived.title`)}
                description={t(`emptyState.reviewsReceived.description`)}
              />
            )}
        </div>
      </section>
      <Modal
        isOpen={deleteReviewModalActive}
        onClose={() => setDeleteReviewModalActive(false)}
        size="md"
        title={t('reviews.deleteReviewTitle')}
        footer={
          <>
            <BaseButton
              onClick={() => setDeleteReviewModalActive(false)}
              theme="secondary"
              size="md"
            >
              {t('reviews.cancel')}
            </BaseButton>

            <BaseButton onClick={deleteReview} size="md">
              {t('reviews.deleteReviewTitle')}
            </BaseButton>
          </>
        }
      >
        <p className="text-neutral-500">
          {t('reviews.deleteReviewDescription')}
        </p>
      </Modal>
      <Modal
        isOpen={deleteReviewConfirmModalActive}
        onClose={() => setDeleteReviewConfirmModalActive(false)}
        size="md"
      >
        <div className="flex justify-center">
          <i className="bg-success-50 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="bg-success-100 flex h-14 w-14 items-center justify-center rounded-full">
              <IconCheckmarkMd className="text-success-500 h-10 w-10" />
            </span>
          </i>
        </div>
        <div className="mb-8 grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('reviews.deleteReviewSuccessTitle')}
          </BaseHeading>
          <p className="text-center font-medium text-neutral-700">
            {t('reviews.deleteReviewSuccessDescription')}
          </p>
        </div>

        <BaseButton
          onClick={() => setDeleteReviewConfirmModalActive(false)}
          theme="primary"
          size="lg"
          wide
        >
          {t('reviews.closeWindow')}
        </BaseButton>
      </Modal>
    </>
  );
};

export default BaseReviewsPage;
