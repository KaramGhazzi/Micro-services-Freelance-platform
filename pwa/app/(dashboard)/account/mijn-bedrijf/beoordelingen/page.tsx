'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import WithGuard from '@/app/_components/WithGuard';
import { basicMyCompanyToolbarTabs } from '@/app/(dashboard)/_data/companyToolbarTabs';
import BaseHeading from '@/app/_components/BaseHeading';
import {
  CompanyType,
  Review,
  ReviewInformation,
  ReviewType,
  SortOrder,
} from '@/graphql/types';
import BaseUserAvatar from '@/app/_components/BaseUserAvatar';
import IconThumbsUp from '@/app/_components/icons/IconThumbsUp';
import BaseButton from '@/app/_components/BaseButton';
import { useReviewsQuery } from '@/graphql/queries/reviews/reviews.generated';
import { useReviewInformationQuery } from '@/graphql/queries/reviews/reviewInformation.generated';
import Section from '@/app/_components/BaseSection';
import BaseEmptyState from '@/app/_components/BaseEmptyState';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Page() {
  const t = useTranslations();
  const { currentCompany } = useAuth();

  const [reviews, setReviews] = useState<Map<string, Review>>(new Map());
  const [reviewInformation, setReviewInformation] =
    useState<ReviewInformation>();
  const maxReviews = 5;
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);

  const { loading, refetch: loadReviews } = useReviewsQuery({ skip: true });
  const { refetch: loadReviewInformation } = useReviewInformationQuery({
    skip: true,
  });

  const filteredTabs = basicMyCompanyToolbarTabs.filter((tab) => {
    if (currentCompany?.type === CompanyType.Freelancer) {
      return tab.name !== t('navigation.company-profile');
    }

    return true;
  });

  useEffect(() => {
    if (!currentCompany) {
      return;
    }

    const retrieveReviews = async () => {
      try {
        const data = await loadReviews({
          where: { companyId: { equals: Number(currentCompany?.id) } },
          orderBy: [{ createdAt: SortOrder.Desc }],
          take: maxReviews,
          skip,
        });
        setReviewCount(data?.data?.count);
        const newReviews = new Map<string, Review>(reviews);

        data?.data?.reviews.forEach((review) => {
          newReviews.set(review.id, review as Review);
        });

        setReviews(newReviews);
      } catch (error) {
        console.error('Error while retrieving reviews:', error);
      }
    };
    retrieveReviews();
  }, [currentCompany, skip]);

  useEffect(() => {
    if (!currentCompany) {
      return;
    }
    const currentCompanyId = Number.parseInt(currentCompany?.id);

    loadReviewInformation({ companyId: currentCompanyId }).then((data) => {
      setReviewInformation(data?.data?.reviewInformation);
    });
  }, [currentCompany]);

  const loadMoreReviews = () => {
    setSkip(skip + 5);
  };

  return (
    <WithGuard permissions={['company:update']}>
      <BaseToolbarSub
        title={t('reviews.title')}
        subtitle={t('reviews.subTitle')}
        tabs={filteredTabs}
      />

      <div className="flex-grow xl:flex">
        <section className="flex-grow border-neutral-100 bg-white xl:border-r">
          {!loading && reviewCount === 0 ? (
            <BaseEmptyState
              imageUrl="/illustration/empty-illustration.svg"
              title={t(`reviews.emptyState.title`)}
              description={t(`reviews.emptyState.description`)}
            />
          ) : (
            <Section>
              <BaseHeading type="h3" size="lg">
                {t.rich('company.allReceivedReviews', {
                  count: reviewCount,
                  tops: reviewInformation?.top,
                  tips: reviewInformation?.tip,
                })}
              </BaseHeading>

              <p className="text-sm font-medium text-neutral-700">
                {t('company.reviewsSubtitle')}
              </p>

              {Array.from(reviews.values()).map((review) => {
                const isTopReview = review.type === ReviewType.Top;

                return (
                  <div key={`review-${review.id}`} className="flex gap-4">
                    <BaseUserAvatar url="/demo/logo-ipsum.svg" size="md" />

                    <div className="flex-auto rounded-xl bg-neutral-50 p-6">
                      <div className="align-items-center mb-2 flex">
                        <span
                          className={`${
                            isTopReview
                              ? 'text-success-400 '
                              : 'text-warning-500 '
                          }mr-2 flex`}
                        >
                          {isTopReview ? (
                            <IconThumbsUp />
                          ) : (
                            <IconThumbsUp className="rotate-180" />
                          )}
                        </span>
                        <strong className="flex-auto text-sm font-semibold">
                          {review.createdBy?.firstName}{' '}
                          {review.createdBy?.lastName}
                        </strong>
                        <span className="text-sm text-neutral-500">
                          {new Intl.DateTimeFormat('nl-NL', {
                            dateStyle: 'medium',
                          }).format(new Date(review.createdAt))}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700">
                        {review.content}
                      </p>
                    </div>
                  </div>
                );
              })}

              {skip < reviewCount - maxReviews && (
                <div className="flex justify-center">
                  <BaseButton
                    size="lg"
                    theme="secondary"
                    loading={loading}
                    onClick={loadMoreReviews}
                  >
                    {t('company.loadMoreReviews')}
                  </BaseButton>
                </div>
              )}
            </Section>
          )}
        </section>
        <aside className="w-full xl:max-w-sm 2xl:max-w-md" />
      </div>
    </WithGuard>
  );
}
