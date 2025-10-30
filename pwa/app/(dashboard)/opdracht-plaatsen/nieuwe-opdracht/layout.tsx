import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nieuwe opdracht',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
