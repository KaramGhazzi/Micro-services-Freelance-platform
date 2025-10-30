import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account voltooien',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
