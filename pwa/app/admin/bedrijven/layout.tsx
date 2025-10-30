import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Bedrijven',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
