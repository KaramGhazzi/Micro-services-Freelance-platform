import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mijn reactieprofielen',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
