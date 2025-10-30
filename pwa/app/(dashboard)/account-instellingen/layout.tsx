import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account instellingen',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
