'use client';
import { useFormatter, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SkeletonCard from '../zoeken/_components/SkeletonCard';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import BaseToaster from '@/app/_components/BaseToaster';
import IconClock from '@/app/_components/icons/IconClock';
import BaseButton from '@/app/_components/BaseButton';
import IconTrash from '@/app/_components/icons/IconTrash';
import IconAttachment from '@/app/_components/icons/IconAttachment';
import IconCurrencyEuro from '@/app/_components/icons/IconCurrencyEuro';
import BaseEmptyState from '@/app/_components/BaseEmptyState';
import IconPlusCircleFill from '@/app/_components/icons/IconPlusCircleFill';
import { RateType, SortOrder } from '@/graphql/types';
import BaseHeading from '@/app/_components/BaseHeading';
import Modal from '@/app/_components/BaseDialog';
import { useDeleteApplicationProfileMutation } from '@/graphql/mutations/application-profiles/deleteApplicationProfile.generated';
import BaseConfirmationIcon from '@/app/_components/BaseConfirmationIcon';
import { useGetMyApplicationProfilesQuery } from '@/graphql/queries/application-profile/getMyApplicationProfiles.generated';

export default function Page() {
  const t = useTranslations();
  const format = useFormatter();

  const [deleteApplicationProfileMutation] =
    useDeleteApplicationProfileMutation();

  const searchParams = useSearchParams();
  const toaster = searchParams.get('toaster');
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [
    deleteApplicationProfileModalIsOpen,
    setDeleteApplicationProfileModalIsOpen,
  ] = useState(false);
  const [applicationProfileToBeDeleted, setApplicationProfileBeDeleted] =
    useState(0);

  const {
    data: { myApplicationProfiles: applicationProfiles } = {},
    loading,
    refetch,
  } = useGetMyApplicationProfilesQuery({
    variables: {
      orderBy: [{ createdAt: SortOrder.Desc }],
    },
  });

  const deleteApplicationProfile = async (applicationProfileId: number) => {
    try {
      const { data: deleteApplicationProfileResponse } =
        await deleteApplicationProfileMutation({
          variables: {
            applicationProfileId,
          },
        });

      if (deleteApplicationProfileResponse) {
        setConfirmationModalIsOpen(true);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteApplicationProfile = (applicationProfileId: string) => {
    setApplicationProfileBeDeleted(parseInt(applicationProfileId));
    setDeleteApplicationProfileModalIsOpen(true);
  };

  return (
    <>
      <BaseToolbarSub
        title={t('assignment.toolbar.myApplicationProfiles')}
        subtitle={t('global.resultsCount', {
          count: applicationProfiles?.length ?? 0,
        })}
      >
        <BaseButton wide href="/opdracht-vinden/reactieprofiel/nieuw">
          <IconPlusCircleFill />
          <span>{t('assignment.toolbar.newApplicationProfile')}</span>
        </BaseButton>
      </BaseToolbarSub>
      <Modal
        isOpen={deleteApplicationProfileModalIsOpen}
        onClose={() => setDeleteApplicationProfileModalIsOpen(false)}
        size="md"
        title={t('assignment.modal.closeApplicationProfile')}
        footer={
          <>
            <BaseButton
              onClick={() => setDeleteApplicationProfileModalIsOpen(false)}
              theme="secondary"
              size="md"
            >
              {t('assignment.modal.cancel')}
            </BaseButton>

            <BaseButton
              onClick={() =>
                deleteApplicationProfile(applicationProfileToBeDeleted)
              }
              size="md"
            >
              {t('assignment.modal.closeApplicationProfile')}
            </BaseButton>
          </>
        }
      >
        <p className="text-neutral-500">
          {t('assignment.modal.closeApplicationProfileDescription')}
        </p>
      </Modal>
      <Modal
        isOpen={confirmationModalIsOpen}
        onClose={() => setConfirmationModalIsOpen(false)}
      >
        <BaseConfirmationIcon />
        <div className="mb-8 grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('assignment.modal.confirmApplicationProfileDelete')}
          </BaseHeading>
        </div>
        <BaseButton
          wide
          size="lg"
          onClick={() => setConfirmationModalIsOpen(false)}
        >
          {t('assignment.modal.backToApplicationProfiles')}
        </BaseButton>
      </Modal>
      {toaster && (
        <BaseToaster theme="success">
          {t(`assignment.toaster.${toaster}`)}
        </BaseToaster>
      )}
      <section className="lg:px-10 lg:pt-6">
        {!loading && applicationProfiles?.length === 0 && (
          <BaseEmptyState
            imageUrl="/illustration/response-profile.svg"
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
                  key={applicationProfile.id}
                  className="group relative flex flex-col gap-6 border border-transparent bg-white px-5 py-5 text-sm shadow-sm transition-all lg:rounded-2xl lg:p-8 lg:py-8"
                >
                  <header className="flex flex-col gap-1">
                    <div className="line-clamp-2">
                      <h2 className="font-heading text-base font-bold tracking-tight text-neutral-900">
                        {applicationProfile.title}
                      </h2>
                    </div>
                  </header>
                  <ul className="flex flex-col gap-2">
                    <li className="flex gap-2 text-neutral-700">
                      <IconCurrencyEuro className="text-neutral-400" />
                      <span>
                        {applicationProfile?.rateType !==
                          RateType.Agreement && (
                          <span>
                            {!applicationProfile?.rateTo &&
                              t('assignment.application.general.from')}{' '}
                            {format.number(applicationProfile?.rateFrom ?? 0, {
                              style: 'currency',
                              currency: 'EUR',
                            })}
                            {applicationProfile?.rateTo && (
                              <>
                                {' - '}
                                {format.number(
                                  applicationProfile?.rateTo ?? 0,
                                  {
                                    style: 'currency',
                                    currency: 'EUR',
                                  }
                                )}
                              </>
                            )}{' '}
                          </span>
                        )}
                        <span className="lowercase">
                          {t(
                            'assignment.rateType.options.' +
                              (applicationProfile?.rateType ?? '')
                          )}
                        </span>
                      </span>
                    </li>

                    <li className="flex gap-2 text-neutral-700">
                      <IconClock className="text-neutral-400" />
                      {applicationProfile.availableHours ? (
                        <span>
                          {applicationProfile.availableHours}{' '}
                          {t('assignment.detail.hoursPerWeek')}
                        </span>
                      ) : (
                        <span>{t('assignment.detail.hoursPerWeekNotSet')}</span>
                      )}
                    </li>

                    <li className="flex gap-2 text-neutral-700">
                      <IconAttachment className="text-neutral-400" />
                      <span>
                        {t('assignment.detail.filesCount', {
                          count: applicationProfile?.documents?.length ?? 0,
                        })}
                      </span>
                    </li>
                  </ul>
                  <footer className="mt-auto flex flex-row flex-wrap gap-3">
                    <BaseButton
                      onClick={() =>
                        handleDeleteApplicationProfile(applicationProfile.id)
                      }
                      theme="secondary"
                      size="md"
                      square
                    >
                      <IconTrash />
                    </BaseButton>
                    <BaseButton
                      theme="primary"
                      size="md"
                      href={`/opdracht-vinden/reactieprofiel/${applicationProfile?.id}`}
                    >
                      {t('global.open')}
                    </BaseButton>
                  </footer>
                </article>
              );
            })}
        </div>
      </section>
    </>
  );
}
