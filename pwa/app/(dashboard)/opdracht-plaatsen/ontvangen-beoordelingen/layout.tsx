import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ontvangen beoordelingen',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
