'use client';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ApplicationProfilesSection from '@/app/_components/application-profiles/ApplicationProfilesSection';
import BaseButton from '@/app/_components/BaseButton';
import BaseContent from '@/app/_components/BaseContent';
import Modal from '@/app/_components/BaseDialog';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseTag from '@/app/_components/BaseTag';
import BaseFormattedRate from '@/app/_components/BaseFormattedRate';
import IconDocument from '@/app/_components/icons/IconDocument';
import { useGetApplicationProfileQuery } from '@/graphql/queries/application-profile/getApplicationProfile.generated';
import { useGetApplicationProfilesQuery } from '@/graphql/queries/application-profile/getApplicationProfiles.generated';
import {
  ApplicationProfile,
  ApplicationProfileFile,
  Availability,
  SortOrder,
} from '@/graphql/types';
import { parseTags } from '@/app/_libs/Tags';

export default function AdminApplicationProfilePage() {
  const { gebruikerId: userId } = useParams<{ gebruikerId: string }>();
  const t = useTranslations('assignment');
  const [applicationModalIsOpen, setApplicationModalIsOpen] = useState(false);
  const [selectedApplicationProfile, setSelectedApplicationProfile] =
    useState<ApplicationProfile>();

  const {
    data: { applicationProfiles } = {},
    loading,
    refetch: refetchAllApplicationProfiles,
  } = useGetApplicationProfilesQuery({
    variables: {
      where: {
        ownerId: {
          equals: parseInt(userId),
        },
      },
      orderBy: [{ createdAt: SortOrder.Desc }],
    },
  });

  const { refetch: refetchSingleApplicationProfile } =
    useGetApplicationProfileQuery({
      variables: {
        where: {
          ownerId: {
            equals: parseInt(userId),
          },
        },
      },
    });

  const fetchUserApplicationProfile = async (profileId: string) => {
    retrieveSingleApplicationProfile(profileId);
  };

  const retrieveSingleApplicationProfile = async (profileId: string) => {
    try {
      const data = await refetchSingleApplicationProfile({
        where: {
          id: {
            equals: parseInt(profileId),
          },
        },
      });

      if (data.data.applicationProfile) {
        setSelectedApplicationProfile(
          data.data.applicationProfile as ApplicationProfile
        );
        setApplicationModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error while retrieving application profile:', error);
    }
  };

  const expertises = parseTags(selectedApplicationProfile?.expertises);
  const personalQualities = parseTags(
    selectedApplicationProfile?.personalQualities
  );

  return (
    <>
      {applicationProfiles && !loading && (
        <ApplicationProfilesSection
          applicationProfiles={
            applicationProfiles as Partial<ApplicationProfile>[]
          }
          refetchApplicationProfiles={refetchAllApplicationProfiles}
          refetchApplicationProfile={fetchUserApplicationProfile}
          isReadOnly
          loading={loading}
        ></ApplicationProfilesSection>
      )}
      <Modal
        isOpen={applicationModalIsOpen}
        onClose={() => setApplicationModalIsOpen(false)}
        size="lg"
        noPadding
        title={selectedApplicationProfile?.title}
        footer={
          <>
            <BaseButton
              onClick={() => setApplicationModalIsOpen(false)}
              theme="secondary"
              size="lg"
            >
              {t('close')}
            </BaseButton>
          </>
        }
      >
        <div className="flex-grow xl:flex">
          <div className="flex-grow divide-y-4 divide-neutral-50 border-neutral-100 bg-white xl:border-r">
            <section className="pb-8 focus:outline-none lg:pb-8" tabIndex={0}>
              <div className="mx-5 grid max-w-4xl gap-6 lg:mx-8">
                <div className="grid gap-4 focus:outline-none">
                  <dl className="mt-2 divide-y divide-neutral-100 rounded-xl bg-neutral-50 text-sm">
                    <Row
                      title={t('application.general.availabilityWeek')}
                      value={
                        selectedApplicationProfile?.availableHours
                          ? `${selectedApplicationProfile?.availableHours} uur`
                          : '-'
                      }
                    />
                    <Row
                      title={t('application.general.readilyAvailable')}
                      value={
                        selectedApplicationProfile?.availability ===
                        Availability.Immediately
                          ? 'Ja'
                          : 'Nee'
                      }
                    />
                    <Row
                      title={t('application.general.rate')}
                      value={
                        <BaseFormattedRate
                          rateType={selectedApplicationProfile?.rateType}
                          rateFrom={selectedApplicationProfile?.rateFrom}
                          rateTo={selectedApplicationProfile?.rateTo}
                        />
                      }
                    />
                  </dl>

                  <div className="pt-5">
                    <BaseHeading type="h2" size="lg">
                      {t('application.general.subTitleFiles')}
                    </BaseHeading>
                  </div>

                  <div className="-mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {selectedApplicationProfile?.documents?.map(
                      (document: ApplicationProfileFile) => {
                        return (
                          <div
                            key={`${document.file.name}-${document.file.size}`}
                            className="flex items-center gap-x-3 rounded-lg border border-neutral-100 bg-white p-3 shadow-sm "
                          >
                            <div className="rounded-lg border border-neutral-100 p-1.5">
                              <IconDocument />
                            </div>
                            <div className="overflow-hidden">
                              <div className="truncate text-xs font-semibold text-neutral-900">
                                {document.file.name}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                    {!selectedApplicationProfile?.documents?.length && (
                      <p className="text-sm text-neutral-700">-</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8 lg:py-8">
              <div className="mx-5 grid max-w-4xl lg:mx-8">
                <div className="grid gap-4">
                  <BaseHeading type="h2" size="lg">
                    {t('application.expertise.title')}
                  </BaseHeading>

                  {expertises.length === 0 && (
                    <p className="text-sm text-neutral-700">-</p>
                  )}
                  {expertises.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 ">
                      {expertises.map((expertise: string, index: number) => (
                        <BaseTag key={index}>{expertise}</BaseTag>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="py-8 lg:py-8">
              <div className="mx-5 grid max-w-4xl gap-6 lg:mx-8">
                <div className="grid gap-4">
                  <BaseHeading type="h2" size="lg">
                    {t('application.personalQualities.title')}
                  </BaseHeading>
                  {personalQualities.length === 0 && (
                    <p className="text-sm text-neutral-700">-</p>
                  )}
                  {personalQualities.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 ">
                      {personalQualities.map(
                        (personalQualitiy: string, index: number) => (
                          <BaseTag key={index}>{personalQualitiy}</BaseTag>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="py-8 lg:py-8">
              <div className="mx-5 grid max-w-4xl gap-6 lg:mx-8">
                <div className="grid gap-4">
                  <BaseHeading type="h2" size="lg">
                    {t('application.backgroundInformation.title')}
                  </BaseHeading>

                  <div className="flex items-center gap-x-1">
                    <BaseContent
                      content={
                        selectedApplicationProfile?.background
                          ? selectedApplicationProfile?.background
                          : '-'
                      }
                      max-height={140}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Modal>
    </>
  );
}

const Row = ({ title, value }: { title: string; value: any }) => {
  return (
    <div className="grid gap-1 py-[10px] md:grid-cols-2 md:gap-6">
      <dt className="px-3 font-medium text-neutral-900">{title}</dt>
      <dd className="px-3 text-sm text-neutral-700">{value}</dd>
    </div>
  );
};
