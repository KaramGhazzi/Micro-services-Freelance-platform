import Link from 'next/link';
import IconBell from '@/app/_components/icons/IconBell';
import { useMyUnreadNotificationCountQuery } from '@/graphql/queries/notifications/getMyUnreadNotificationCount.generated';
import { useResetMyUnreadNotificationCountMutation } from '@/graphql/mutations/notifications/resetMyUnreadNotificationCount.generated';

export default function ChatButton() {
  const { data: { myUnreadNotificationCount } = {} } =
    useMyUnreadNotificationCountQuery({
      pollInterval: 60000,
    });
  const [resetUnreadNotificationCount] =
    useResetMyUnreadNotificationCountMutation();
  const count = myUnreadNotificationCount || 0;
  const displayCount = count > 9 ? '9+' : count;

  const resetCount = async () => {
    await resetUnreadNotificationCount();
  };

  return (
    <Link
      href={'/notificaties'}
      className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-neutral-500 transition-all hover:bg-neutral-50 hover:text-neutral-600"
      onClick={resetCount}
    >
      <IconBell />
      {count > 0 && (
        <div className="bg-secondary-500 absolute right-[3px] top-[3px] flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-xs font-semibold text-white">
          <span>{displayCount}</span>
        </div>
      )}
    </Link>
  );
}
