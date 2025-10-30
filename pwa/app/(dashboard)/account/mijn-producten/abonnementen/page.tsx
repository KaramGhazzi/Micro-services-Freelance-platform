'use client';
import React from 'react';
import WithGuard from '../../../../_components/WithGuard';
import FreelanceProducts from '@/app/(dashboard)/account/mijn-producten/abonnementen/_components/freelanceProducts';
import TopAssignments from '@/app/(dashboard)/account/mijn-producten/abonnementen/_components/topAssignments';

export default function Page() {
  return (
    <WithGuard permissions={['contracts:get', 'plan:get-collection']}>
      <div className="flex-grow border-neutral-100 bg-white">
        <div className="px-5 py-8 lg:p-10">
          <FreelanceProducts />
          <TopAssignments />
        </div>
      </div>
    </WithGuard>
  );
}
