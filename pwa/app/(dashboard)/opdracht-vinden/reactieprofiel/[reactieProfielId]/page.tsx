'use client';
import { notFound } from 'next/navigation';
import ApplicationProfileFormPage from '../_components/ApplicationProfileFormPage';
import { ApplicationProfile } from '@/graphql/types';
import { useGetMyApplicationProfileQuery } from '@/graphql/queries/application-profile/getMyApplicationProfile.generated';

export default function Page({
  params,
}: {
  params: { reactieProfielId: number };
}) {
  const { data, loading, error } = useGetMyApplicationProfileQuery({
    variables: {
      where: { id: { equals: Number(params.reactieProfielId) } },
    },
  });

  const applicationProfile = data?.myApplicationProfile as
    | ApplicationProfile
    | undefined;

  if (error && !loading) {
    return notFound();
  } else if (data) {
    return (
      <>
        {!loading && applicationProfile?.id && (
          <ApplicationProfileFormPage applicationProfile={applicationProfile} />
        )}
      </>
    );
  }
}
