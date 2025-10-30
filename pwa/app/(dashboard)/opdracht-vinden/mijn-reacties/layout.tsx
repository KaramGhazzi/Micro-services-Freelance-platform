import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verstuurde reacties',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
