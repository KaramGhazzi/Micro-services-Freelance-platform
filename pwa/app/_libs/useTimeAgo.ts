'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import nl from 'dayjs/locale/nl';
dayjs.extend(relativeTime);
dayjs.locale(nl);

export default function useTimeAgo(date: string) {
  return dayjs(date).fromNow();
}
