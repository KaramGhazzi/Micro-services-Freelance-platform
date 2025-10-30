import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Freelance opdracht',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
