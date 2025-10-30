import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upgrade naar PRO',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
