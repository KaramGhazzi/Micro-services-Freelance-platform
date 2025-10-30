import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Betalingsbevestiging',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
