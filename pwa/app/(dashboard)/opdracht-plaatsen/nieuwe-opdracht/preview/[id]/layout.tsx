import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview opdracht',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
