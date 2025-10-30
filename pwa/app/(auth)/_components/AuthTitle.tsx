import React from 'react';

export default function AuthTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-heading text-lg font-bold text-neutral-900">
      {children}
    </h1>
  );
}
