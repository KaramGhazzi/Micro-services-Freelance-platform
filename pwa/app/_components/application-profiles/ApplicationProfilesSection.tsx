'use client';
import { useTranslations } from 'next-intl';
import BaseButton from '../BaseButton';
import BaseEmptyState from '../BaseEmptyState';
import BaseFormattedRate from '../BaseFormattedRate';
import IconAttachment from '../icons/IconAttachment';
import IconClock from '../icons/IconClock';
import IconCurrencyEuro from '../icons/IconCurrencyEuro';
import IconPencil from '../icons/IconPencil';
import IconTrash from '../icons/IconTrash';
import { GetApplicationProfileQuery } from '@/graphql/queries/application-profile/getApplicationProfile.generated';
import SkeletonCard from '@/app/(dashboard)/opdracht-vinden/zoeken/_components/SkeletonCard';

type Props = {
  loading: boolean;
  isReadOnly: boolean;
  refetchApplicationProfiles: () => {};
  refetchApplicationProfile: (profileId: string) => void;
  applicationProfiles: Partial<
    GetApplicationProfileQuery['applicationProfile']
  >[];
};

const ApplicationProfilesSection = ({
  applicationProfiles,
  loading,
  isReadOnly,
  refetchApplicationProfile,
}: Props) => {
  const t = useTranslations('assignment');

  const handleReadApplicationProfile = (profileId: string | undefined) => {
    if (!isReadOnly || !profileId) {
      return;
    }
    refetchApplicationProfile(profileId);
  };

  return (
    <section className="lg:px-10 lg:pt-6">
      {!loading && applicationProfiles?.length === 0 && (
        <BaseEmptyState
          imageUrl="/illustration/application-profile-illustration.svg"
          title={t('emptyState.applicationProfiles.title')}
          description={t('emptyState.applicationProfiles.description')}
        />
      )}
      <div className="grid gap-1 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
        {loading && !applicationProfiles?.length && (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
        {!loading &&
          applicationProfiles?.map((applicationProfile) => {
            return (
              <article
                key={applicationProfile?.id}
                className={`group relative flex flex-col gap-6 border border-transparent bg-white px-5 py-5 text-sm shadow-sm transition-all lg:rounded-2xl lg:p-8 lg:py-8 ${
                  isReadOnly
                    ? 'hover:cursor-pointer hover:border-neutral-300'
                    : ''
                }`}
                onClick={() =>
                  handleReadApplicationProfile(applicationProfile?.id)
                }
              >
                <header className="flex flex-col gap-1">
                  <div className="line-clamp-2">
                    <h2
                      className="font-heading text-base font-bold tracking-tight text-neutral-900"
                      tabIndex={0}
                    >
                      {applicationProfile?.title}
                    </h2>
                  </div>
                </header>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-2 text-neutral-700">
                    <IconCurrencyEuro className="text-neutral-400" />
                    <BaseFormattedRate
                      rateType={applicationProfile?.rateType}
                      rateFrom={applicationProfile?.rateFrom}
                      rateTo={applicationProfile?.rateTo}
                    />
                  </li>

                  <li className="flex gap-2 text-neutral-700">
                    <IconClock className="text-neutral-400" />
                    <span>
                      {applicationProfile?.availableHours
                        ? applicationProfile.availableHours
                        : 0}{' '}
                      {t('detail.hoursPerWeek')}
                    </span>
                  </li>

                  <li className="flex gap-2 text-neutral-700">
                    <IconAttachment className="text-neutral-400" />
                    <span>
                      {t('detail.filesCount', {
                        count: applicationProfile?.documents?.length ?? 0,
                      })}
                    </span>
                  </li>
                </ul>
                <footer className="mt-auto flex flex-row flex-wrap gap-3">
                  {isReadOnly ?? (
                    <>
                      <BaseButton
                        theme="secondary"
                        size="md"
                        square
                        href={`/opdracht-vinden/reactieprofiel/${applicationProfile?.id}`}
                      >
                        <IconPencil />
                      </BaseButton>
                      <BaseButton theme="secondary" size="md" square>
                        <IconTrash />
                      </BaseButton>
                    </>
                  )}
                </footer>
              </article>
            );
          })}
      </div>
    </section>
  );
};

export default ApplicationProfilesSection;
