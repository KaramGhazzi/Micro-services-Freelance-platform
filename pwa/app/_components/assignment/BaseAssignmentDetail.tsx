'use client';
import { useTranslations, useFormatter } from 'next-intl';
import React, { useEffect } from 'react';
import BaseButton from '../BaseButton';
import IconRocket from '../icons/IconRocket';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseStatus from '@/app/_components/BaseStatus';
import IconChatBubble from '@/app/_components/icons/IconChatBubble';
import IconEye from '@/app/_components/icons/IconEye';
import { GetAssignmentQuery } from '@/graphql/queries/assignments/getAssignment.generated';
import { AssignmentNotVisibleReason, RateType } from '@/graphql/types';

interface BaseAssignmentDetailProps {
  assignment: GetAssignmentQuery['assignment'];
  hideViewsAndComments?: boolean;
  hideReference?: boolean;
  asideComponent: React.JSX.Element;
  children?: React.ReactNode;
  onClick?: () => void;
}

const ToBeDeterminedRateTypes = [
  RateType.Agreement,
  RateType.Fixed,
  RateType.Marketconform,
  RateType.Unknown,
];

const BaseAssignmentDetail = ({
  assignment,
  hideViewsAndComments,
  hideReference,
  asideComponent,
  children,
}: BaseAssignmentDetailProps) => {
  const t = useTranslations('assignment');
  const format = useFormatter();

  useEffect(() => {
    const now = new Date();
    const assignmentDate = new Date(assignment?.descriptionIsVisibleFrom);

    if (assignmentDate) {
      const timeDifference = assignmentDate.getTime() - now.getTime();

      if (timeDifference > 0) {
        const timer = setTimeout(() => {
          window.location.reload();
        }, timeDifference);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const renderPair = (
    from: string | null | undefined,
    to: string | null | undefined
  ) => {
    const pair = [];
    if (from) {
      pair.push(from);
    }

    if (to) {
      pair.push(to);
    }

    return pair.join(' - ');
  };

  const renderHours = (
    hoursFrom: number | null | undefined,
    hoursTo: number | null | undefined
  ) => {
    if (!hoursFrom && !hoursTo) {
      return '-';
    }

    if (hoursFrom === hoursTo) {
      return hoursFrom?.toString() + ' ' + t('detail.hoursPerWeek');
    }

    return (
      renderPair(hoursFrom?.toString(), hoursTo?.toString()) +
      ' ' +
      t('detail.hoursPerWeek')
    );
  };

  const formatToCurrency = (amount: number | null | undefined) => {
    return amount
      ? format.number(amount, { style: 'currency', currency: 'EUR' })
      : null;
  };

  const isToBeDeterminedRateType = (rateType: RateType | null | undefined) => {
    return rateType ? ToBeDeterminedRateTypes.includes(rateType) : false;
  };

  const renderRate = (rateFrom?: number | null, rateTo?: number | null) => {
    if (isToBeDeterminedRateType(assignment?.rateType)) {
      return <span>{t('rateType.options.' + assignment?.rateType)}</span>;
    }

    if (!rateFrom && !rateTo) {
      return '-';
    }

    return (
      <>
        <span>
          {renderPair(formatToCurrency(rateFrom), formatToCurrency(rateTo))}{' '}
        </span>
        <span>{t('rateType.options.' + assignment?.rateType)}</span>
      </>
    );
  };

  const renderAssignmentDetails = () => {
    if (!assignment?.descriptionIsVisible) {
      if (
        assignment?.notVisibleReason ===
        AssignmentNotVisibleReason.MarketmonitorNoCredits
      ) {
        return <MarketMonitorNoCreditsBlock />;
      }

      if (
        assignment?.notVisibleReason ===
        AssignmentNotVisibleReason.MarketmonitorWaitingPeriod
      ) {
        return (
          <MarketMonitorWaitingPeriodBlock
            date={assignment?.descriptionIsVisibleFrom}
          />
        );
      }
      return <NotProBlock date={assignment?.descriptionIsVisibleFrom} />;
    } else {
      return (
        <div className="prose prose-sm prose-h2:text-base prose-h3:text-sm mt-4 break-words">
          {assignment?.description?.length ? (
            <div
              dangerouslySetInnerHTML={{ __html: assignment?.description }}
            />
          ) : (
            <div>-</div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="flex-grow xl:flex">
      <div className="flex-grow border-neutral-100 bg-white xl:border-r">
        <div className="max-w-4xl">
          <div className="grid gap-10 px-5 py-8 lg:p-10">
            <header className="grid gap-2">
              <h2 className="font-heading text-2xl font-bold tracking-tight">
                {assignment?.title}
              </h2>
              <p className="text-sm font-medium text-neutral-500">
                {t('detail.by')}{' '}
                <strong className="font-semibold text-neutral-900">
                  {assignment?.descriptionIsVisible
                    ? `${assignment?.owner?.firstName} ${assignment?.owner?.lastName}`
                    : '?'}
                </strong>{' '}
                {t('detail.at')}{' '}
                <strong className="font-semibold text-neutral-900">
                  {assignment?.publishAt
                    ? format.dateTime(new Date(assignment?.publishAt), {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })
                    : assignment?.createdAt
                    ? format.dateTime(new Date(assignment?.createdAt), {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })
                    : ''}
                </strong>
              </p>
              {!hideViewsAndComments && (
                <ul className="flex gap-6">
                  <li className="flex gap-2">
                    <IconEye className="shrink-0 text-neutral-400" />
                    <span className="text-sm font-medium text-neutral-600">
                      {t('detail.views', { count: assignment?.viewsCount })}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <IconChatBubble className="shrink-0 text-neutral-400" />
                    <span className="text-sm font-medium text-neutral-600">
                      {t('detail.comments', {
                        count: assignment?.commentsCount,
                      })}
                    </span>
                  </li>
                </ul>
              )}
            </header>
            <dl className="divide-y divide-neutral-100 rounded-xl bg-neutral-50 text-sm">
              <Row
                title={t('detail.status')}
                value={
                  <BaseStatus theme={assignment?.status || 'CONCEPT'}>
                    {t(`status.${assignment?.status}`)}
                  </BaseStatus>
                }
              />
              {!hideReference && (
                <Row
                  title={t('detail.reference')}
                  value={
                    assignment?.externalCode?.length
                      ? assignment?.externalCode
                      : '-'
                  }
                />
              )}
              <Row
                title={t('detail.applicationDeadlineDate')}
                value={
                  assignment?.applicationDeadlineDate
                    ? format.dateTime(
                        new Date(assignment?.applicationDeadlineDate),
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }
                      )
                    : '-'
                }
              />
              {!assignment?.hideInDescription && (
                <Row
                  title={t('detail.location')}
                  value={`${
                    assignment?.onLocation?.length
                      ? t('onLocation.options.' + assignment?.onLocation)
                      : '-'
                  }${
                    assignment?.place?.length ? ', ' + assignment?.place : ''
                  }`}
                />
              )}
              <Row
                title={t('detail.startDate')}
                value={
                  assignment?.startDate
                    ? format.dateTime(new Date(assignment?.startDate), {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : '' +
                      (assignment?.startAsap
                        ? ' ' + t('startAsap.label')
                        : t('negotiable'))
                }
              />
              <Row
                title={t('detail.duration')}
                value={`${t('durationType.meta.' + assignment?.durationType, {
                  count: assignment?.duration,
                })} ${
                  assignment?.durationExtendable ? t('detail.extendable') : ''
                }`}
              />

              <Row
                title={t('detail.hours')}
                value={renderHours(assignment?.hoursFrom, assignment?.hoursTo)}
              />
              <Row
                title={t('detail.rate')}
                value={
                  <div
                    className={
                      isToBeDeterminedRateType(assignment?.rateType)
                        ? 'lowercase'
                        : ''
                    }
                  >
                    {renderRate(assignment?.rateFrom, assignment?.rateTo)}
                  </div>
                }
              />
              <Row
                title={t('detail.contractType')}
                value={t('contractType.options.' + assignment?.contractType)}
              />
              {assignment?.currentStatus?.key === 'published' && (
                <Row
                  title={t('detail.publishedOn')}
                  value={
                    assignment?.createdAt
                      ? format.dateTime(new Date(assignment?.createdAt), {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : ''
                  }
                />
              )}
              {assignment?.customerRelationCompany &&
                assignment?.customerRelationCompanyVisible && (
                  <Row
                    title={t('detail.customerRelationCompany')}
                    value={assignment?.customerRelationCompany ?? '-'}
                  />
                )}
            </dl>
            <section className="min-w-0">
              <BaseHeading type="h2" size="lg">
                {t('detail.assignmentDescription')}
              </BaseHeading>
              <div>{renderAssignmentDetails()}</div>
              {children}
            </section>
          </div>
        </div>
      </div>
      <aside className="w-full border-t border-neutral-100 xl:max-w-sm xl:border-t-0 2xl:max-w-md">
        {asideComponent}
      </aside>
    </div>
  );
};

const Row = ({ title, value }: { title: string; value: any }) => {
  return (
    <div className="grid grid-cols-2 py-[10px]">
      <dt className="px-3 font-medium text-neutral-900">{title}</dt>
      <dd className="px-3 text-sm text-neutral-700">{value}</dd>
    </div>
  );
};

const footnoteText = (chunks: React.ReactNode) => (
  <span className="font-semibold text-neutral-900">{chunks}</span>
);

const NotAllowedBlock = ({
  title,
  description,
  footnote,
  buttonText,
  date,
  href,
  onClick,
  hideIcon = false,
}: {
  title: string;
  description?: string;
  footnote?: string;
  buttonText: string;
  date?: string;
  href?: string;
  onClick?: () => void;
  hideIcon?: boolean;
}) => {
  const t = useTranslations('assignment');
  const format = useFormatter();

  let formattedDate = '';
  if (date) {
    formattedDate = format.dateTime(new Date(date), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  return (
    <section className="relative z-10 grid gap-10 bg-white from-white pb-10 pt-12 before:pointer-events-none before:absolute before:bottom-full before:left-0 before:right-0 before:h-32 before:bg-gradient-to-t">
      <header className="grid justify-center gap-2 text-center">
        <h4 className="font-heading text-xl font-bold tracking-tight">
          {t(title)}
        </h4>
        <p className="font-heading font-semibold tracking-tight text-neutral-700">
          {description &&
            t(description, {
              date: formattedDate,
            })}
        </p>
      </header>

      <footer className="grid justify-center gap-4 text-center">
        <p className="text-sm font-medium text-neutral-700">
          {footnote
            ? t.rich(footnote, {
                highlight: footnoteText,
              })
            : ''}
        </p>
        <div className="flex justify-center">
          <div>
            <BaseButton theme="primary" size="lg" href={href} onClick={onClick}>
              {!hideIcon && <IconRocket />}
              <span>{t(buttonText)}</span>
            </BaseButton>
          </div>
        </div>
      </footer>
    </section>
  );
};

const NotProBlock = ({ date }: { date?: string }) => {
  return (
    <NotAllowedBlock
      title="detail.notProBlock.title"
      description="detail.notProBlock.description"
      footnote="detail.notProBlock.footnote"
      buttonText="detail.notProBlock.button"
      href="/pro"
      date={date}
    />
  );
};

const MarketMonitorNoCreditsBlock = () => {
  return (
    <NotAllowedBlock
      title="detail.marketMonitorNoCredits.title"
      buttonText="detail.marketMonitorNoCredits.button"
      hideIcon={true}
      href="/offerte-aanvragen"
    />
  );
};

const MarketMonitorWaitingPeriodBlock = ({ date }: { date?: string }) => {
  return (
    <NotAllowedBlock
      title="detail.marketMonitorWaitingPeriod.title"
      description="detail.marketMonitorWaitingPeriod.description"
      buttonText="detail.marketMonitorWaitingPeriod.button"
      hideIcon={true}
      href="/offerte-aanvragen"
      date={date}
    />
  );
};

export default BaseAssignmentDetail;
