import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Opdrachten',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
