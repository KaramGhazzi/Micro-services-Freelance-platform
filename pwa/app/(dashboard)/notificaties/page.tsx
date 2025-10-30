'use client';

import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

import BaseToolbar from '@/app/_components/toolbar/BaseToolbar';
import IconBell from '@/app/_components/icons/IconBell';
import {
  GetMyNotificationsQuery,
  useGetMyNotificationsQuery,
} from '@/graphql/queries/notifications/getMyNotifications.generated';
import { NotificationType, SortOrder } from '@/graphql/types';
import { useMarkNotificationsAsReadMutation } from '@/graphql/mutations/notifications/markNotificationsAsRead.generated';
import BasePagination from '@/app/_components/BasePagination';

type Notification = NonNullable<
  NonNullable<GetMyNotificationsQuery['myNotifications']>[0]
>;

export default function Page() {
  const t = useTranslations('');
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPage: number = Number(searchParams.get('pagina')) || 1;
  const resultsPerPage: number = Number(searchParams.get('resultaten')) || 12;
  const variables = {
    orderBy: [{ createdAt: SortOrder.Desc }, { createdAt: SortOrder.Desc }],
    skip: (currentPage - 1) * resultsPerPage,
    take: resultsPerPage,
    where: {
      platformNotification: {
        equals: true,
      },
    },
  };

  const {
    data: { myNotifications, count } = {},
    refetch: reloadNotifications,
  } = useGetMyNotificationsQuery({
    variables,
  });
  const [markNotificationsAsReadMutation] =
    useMarkNotificationsAsReadMutation();

  const getTotalPages = () => {
    if (count) {
      return count > 0 ? Math.ceil(count / resultsPerPage) : 1;
    }

    return 1;
  };

  const numberOfPages: number = getTotalPages();

  const handlePageChange = (pageNumber: number) => {
    router.push(
      `/notificaties?pagina=${pageNumber}&resultaten=${resultsPerPage}`
    );
  };

  const handleResultsPerPageChange = (resultsPerPage: number) => {
    router.push(`/notificaties?pagina=1&resultaten=${resultsPerPage}`);
  };

  const markNotificationsAsRead = async (notification: Notification) => {
    if (notification.readAt) {
      return;
    }
    await markNotificationsAsReadMutation({
      variables: {
        where: {
          id: {
            equals: Number(notification.id),
          },
        },
      },
    });

    await reloadNotifications(variables);
  };

  const notificationClick = async (notification: Notification) => {
    await markNotificationsAsRead(notification);
    if (
      notification.type === NotificationType.AssignmentPublished ||
      notification.type === NotificationType.AssignmentDeclined ||
      notification.type === NotificationType.AssignmentClosed ||
      notification.type === NotificationType.AssignmentsReassigned
    ) {
      if (notification.data) {
        router.push(
          '/opdracht-plaatsen/mijn-opdrachten/' +
            JSON.parse(notification.data).assignmentId
        );
      }
    }
    if (notification.type === NotificationType.MatchNotificationBatch) {
      router.push('/opdracht-vinden/mijn-zoekopdrachten/');
    }
    if (notification.type === NotificationType.MatchNotificationInstant) {
      if (notification.data) {
        router.push(
          '/opdracht-vinden/opdracht/' +
            JSON.parse(notification.data).assignmentId
        );
      }
    }

    if (notification.type === NotificationType.AssignmentApplicationCreated) {
      if (notification.data) {
        router.push(
          '/opdracht-plaatsen/mijn-opdrachten/' +
            JSON.parse(notification.data).assignmentId
        );
      }
    }

    if (notification.type === NotificationType.ReviewCreated) {
      router.push('/opdracht-plaatsen/ontvangen-beoordelingen/');
    }

    if (
      notification.type === NotificationType.AssignmentApplicationStatusChanged
    ) {
      if (notification.data) {
        router.push(
          '/opdracht-vinden/mijn-reacties/' +
            JSON.parse(notification.data).assignmentApplicationId
        );
      }
    }
  };

  const renderField = (data: string | undefined | null, key: string) => {
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData[key] || '-';
    }
    return '-';
  };

  return (
    <div className="h-[calc(100dvh-56px)] overflow-y-auto bg-white">
      <BaseToolbar
        title={t('notifications.title')}
        subtitle={t('notifications.subtitle')}
      />
      <div className="p-5 lg:p-10">
        {myNotifications?.length === 0 && (
          <div className="mt-4 text-sm text-neutral-600">
            {t('notifications.noNotifications')}
          </div>
        )}
        {myNotifications && myNotifications.length > 0 && (
          <>
            <ul>
              {myNotifications.map((notification: any, index) => (
                <li key={index}>
                  <div
                    className="flex cursor-pointer gap-3 border-b border-neutral-100 py-5"
                    onClick={() => notificationClick(notification)}
                  >
                    <IconBell
                      className={classNames({
                        'text-neutral-400': notification.readAt,
                        'text-neutral-900': !notification.readAt,
                      })}
                    />

                    <i
                      className={classNames({
                        'bg-primary-600 relative top-1.5 h-2 w-2 shrink-0 rounded-full':
                          true,
                        'opacity-0': notification.readAt,
                      })}
                    ></i>
                    <div>
                      <div
                        className={classNames({
                          'text-sm text-neutral-900': true,
                          'font-medium ': notification.readAt,
                          'font-semibold': !notification.readAt,
                        })}
                      >
                        {t(`notifications.type.${notification.type}.title`, {
                          title: renderField(
                            notification.data,
                            'assignmentTitle'
                          ),
                        })}
                      </div>
                      <p className="text-sm text-neutral-600">
                        {t(
                          `notifications.type.${notification.type}.description`,
                          {
                            title: renderField(
                              notification.data,
                              'assignmentTitle'
                            ),
                            companyName: renderField(
                              notification.data,
                              'companyName'
                            ),
                            roleOld: renderField(notification.data, 'roleOld'),
                            roleNew: renderField(notification.data, 'roleNew'),
                          }
                        )}
                      </p>

                      <div
                        suppressHydrationWarning
                        className="mt-2 text-xs text-neutral-500"
                      >
                        {new Intl.DateTimeFormat('nl-NL', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        }).format(new Date(notification.createdAt))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <BasePagination
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                resultsPerPage={resultsPerPage}
                onPageChange={handlePageChange}
                onResultsPerPageChange={handleResultsPerPageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
