import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gegeven beoordelingen',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
