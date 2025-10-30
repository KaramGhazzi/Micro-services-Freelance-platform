import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Opdracht bewerken',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
