import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mijn opdrachten',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
