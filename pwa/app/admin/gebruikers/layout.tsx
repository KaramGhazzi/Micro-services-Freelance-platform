import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Gebruikers',
};

type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: UserLayoutProps) => {
  return <div className="flex flex-grow flex-col">{children}</div>;
};

export default UserLayout;
