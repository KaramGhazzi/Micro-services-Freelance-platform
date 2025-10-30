'use client';

import Users from '../page';

export default function UsersInvite({
  params: { email },
}: Readonly<{
  params: { email: string };
}>) {
  return <Users params={{ email }} />;
}
