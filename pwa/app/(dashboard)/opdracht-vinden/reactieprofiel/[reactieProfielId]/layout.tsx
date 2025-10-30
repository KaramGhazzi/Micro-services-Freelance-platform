import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bewerk reactieprofiel',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
