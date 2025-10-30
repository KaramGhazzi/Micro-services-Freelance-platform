'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import SkeletonCard from '../(dashboard)/opdracht-vinden/zoeken/_components/SkeletonCard';
import SaveSearchModal from '../(dashboard)/opdracht-vinden/zoeken/_components/SaveSearchModal';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import BaseEmptyState from '@/app/_components/BaseEmptyState';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import BaseButton from '@/app/_components/BaseButton';
import IconTrash from '@/app/_components/icons/IconTrash';
import IconPlusCircleFill from '@/app/_components/icons/IconPlusCircleFill';
import { SavedSearchesQueryResult } from '@/graphql/queries/saved-search/savedSearches.generated';

import { MySavedSearchesQueryResult } from '@/graphql/queries/saved-search/mySavedSearch.generated';
import BaseStatus from '@/app/_components/BaseStatus';
import { useUpdateSavedSearchMutation } from '@/graphql/mutations/saved-search/updateSavedSearch.generated';
import { useDeleteSavedSearchMutation } from '@/graphql/mutations/saved-search/deleteSavedSearch.generated';
import Modal from '@/app/_components/BaseDialog';
import BaseConfirmationIcon from '@/app/_components/BaseConfirmationIcon';
import BaseHeading from '@/app/_components/BaseHeading';

type SavedSearchesQueryRow = NonNullable<
  NonNullable<SavedSearchesQueryResult['data']>['savedSearches']
>[0];

interface PageProps {
  hasToolbar: boolean;
  hasMatchesCount: boolean;
  hasButtons: boolean;
  data: SavedSearchesQueryResult['data'] | MySavedSearchesQueryResult['data'];
  loading: boolean;
}

export default function Page({
  hasToolbar,
  hasMatchesCount,
  hasButtons,
  data,
  loading,
}: PageProps) {
  const t = useTranslations();

  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [closeSavedSearchModalIsOpen, setCloseSavedSearchModalIsOpen] =
    useState(false);
  const [savedSearchToBeDeleted, setsavedSearchToBeDeleted] = useState(0);
  const [saveSearchModalIsOpen, setSaveSearchModalIsOpen] = useState(false);
  const [updateSavedSearch] = useUpdateSavedSearchMutation();
  const [deleteSavedSearch] = useDeleteSavedSearchMutation();
  const [savedSearches, setSavedSearches] = useState<SavedSearchesQueryRow[]>();
  const [selectedSavedSearch, setSelectedSavedSearch] =
    useState<SavedSearchesQueryRow>();

  const updateSavedSearchInState = (
    updatedSavedSearch: SavedSearchesQueryRow
  ) => {
    setSavedSearches((prevSavedSearches) => {
      if (!prevSavedSearches) {
        return prevSavedSearches;
      }

      const updatedSearches = prevSavedSearches.map((search) =>
        search.id === updatedSavedSearch.id ? updatedSavedSearch : search
      );

      return updatedSearches;
    });
  };

  const handleCheckboxChange =
    (id: string, field: string) =>
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      await handleUpdateSavedSearch(parseInt(id), field, isChecked);
    };

  const handleUpdateSavedSearch = async (
    id: number,
    field: string,
    isChecked: boolean
  ) => {
    try {
      const response = await updateSavedSearch({
        variables: {
          data: {
            [field]: isChecked,
          },
          where: {
            id: id,
          },
        },
      });

      if (response?.data?.updateSavedSearch) {
        updateSavedSearchInState(response.data.updateSavedSearch);
      }
    } catch (error) {
      console.error('Error updating saved search:', error);
    }
  };

  useEffect(() => {
    if (data?.savedSearches) {
      setSavedSearches(data.savedSearches);
    }
  }, [data]);

  useEffect(() => {}, [savedSearches]);

  const handleViewFilter = (savedSearchId: string) => {
    const savedSearch = savedSearches?.find(
      (savedSearch) => savedSearch.id === savedSearchId
    );
    if (savedSearch) {
      setSelectedSavedSearch(savedSearch);
    }
    setSaveSearchModalIsOpen(true);
  };

  const deleteSearch = async (searchId: number) => {
    try {
      const { data: deleteSavedSearchResponse } = await deleteSavedSearch({
        variables: {
          where: { id: searchId },
        },
      });

      if (deleteSavedSearchResponse) {
        setConfirmationModalIsOpen(true);

        const updatedSearchList = savedSearches?.filter(
          (savedSearches) => String(searchId) !== savedSearches.id
        );
        setSavedSearches(updatedSearchList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSearch = (searchId: string) => {
    setsavedSearchToBeDeleted(parseInt(searchId));
    setCloseSavedSearchModalIsOpen(true);
  };

  const filtersPerCategory = (savedSearch: SavedSearchesQueryRow) => {
    let locationsCount = savedSearch.locations?.split(',').length ?? 0;

    if (savedSearch.onLocation) {
      locationsCount += 1;
    }

    return [
      {
        title: t('assignment.savedSearches.searchTerms'),
        count: savedSearch.searchTags?.split(',').length ?? 0,
      },
      {
        title: t('assignment.savedSearches.expertises'),
        count: savedSearch.expertises?.split(',').length ?? 0,
      },
      {
        title: t('assignment.savedSearches.hoursPerWeek'),
        count:
          savedSearch.minHoursPerWeek || savedSearch.maxHoursPerWeek ? 1 : 0,
      },
      {
        title: t('assignment.savedSearches.locations'),
        count: locationsCount,
      },
      {
        title: t('assignment.savedSearches.intermediair'),
        count: savedSearch.noMatchingIntermediaries ? 1 : 0,
      },
    ];
  };

  return (
    <>
      {hasToolbar && (
        <BaseToolbarSub
          title={t('assignment.toolbar.mySavedSearches')}
          subtitle={t('global.resultsCount', {
            count: savedSearches?.length ?? 0,
          })}
        >
          <BaseButton wide href="/opdracht-vinden/zoeken">
            <IconPlusCircleFill />
            <span>{t('assignment.toolbar.newSearch')}</span>
          </BaseButton>
        </BaseToolbarSub>
      )}
      <Modal
        isOpen={closeSavedSearchModalIsOpen}
        onClose={() => setCloseSavedSearchModalIsOpen(false)}
        size="md"
        title={t('assignment.modal.closeSavedSearch')}
        footer={
          <>
            <BaseButton
              onClick={() => setCloseSavedSearchModalIsOpen(false)}
              theme="secondary"
              size="md"
            >
              {t('assignment.modal.cancel')}
            </BaseButton>

            <BaseButton
              onClick={() => deleteSearch(savedSearchToBeDeleted)}
              size="md"
            >
              {t('assignment.modal.closeSavedSearch')}
            </BaseButton>
          </>
        }
      >
        <p className="text-neutral-500">
          {t('assignment.modal.closeSavedSearchDescription')}
        </p>
      </Modal>
      <Modal
        isOpen={confirmationModalIsOpen}
        onClose={() => setConfirmationModalIsOpen(false)}
      >
        <BaseConfirmationIcon />
        <div className="mb-8 grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('assignment.modal.confirmSavedSearchDelete')}
          </BaseHeading>
        </div>
        <BaseButton
          wide
          size="lg"
          onClick={() => setConfirmationModalIsOpen(false)}
        >
          {t('assignment.modal.backToSavedSearches')}
        </BaseButton>
      </Modal>
      <section className="lg:px-10 lg:py-6">
        {!loading && data?.savedSearches?.length === 0 && (
          <BaseEmptyState
            imageUrl="/illustration/saved-search.svg"
            title={t(`emptyState.savedSearches.title`)}
            description={t(`emptyState.savedSearches.description`)}
          />
        )}

        <div className="grid gap-1 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {!loading &&
            savedSearches?.map((search: SavedSearchesQueryRow) => (
              <article
                key={search.id}
                className="group relative flex flex-col gap-6 border border-transparent bg-white px-5 py-5 text-sm shadow-sm transition-all lg:rounded-2xl lg:p-8 lg:py-8"
              >
                <header className="flex flex-col gap-1">
                  <div className="line-clamp-2">
                    <h2 className="font-heading text-base font-bold tracking-tight text-neutral-900">
                      {search.description}
                    </h2>
                  </div>
                  {hasMatchesCount && (
                    <div>
                      <BaseStatus
                        theme={
                          search?.newMatchesCount > 0 ? 'success' : 'neutral'
                        }
                      >
                        {t(`assignment.savedSearches.newMatches`, {
                          count: search.newMatchesCount,
                        })}
                      </BaseStatus>
                    </div>
                  )}
                </header>

                <div className="grid  gap-1">
                  <BaseCheckbox
                    label={t('assignment.modal.instantAlert')}
                    name="instantAlert"
                    checked={search.instantAlert}
                    onChange={handleCheckboxChange(search.id, 'instantAlert')}
                  />
                  <BaseCheckbox
                    label={t('assignment.modal.batchAlert')}
                    name="batchAlert"
                    checked={search.batchAlert}
                    onChange={handleCheckboxChange(search.id, 'batchAlert')}
                  />
                </div>
                {search && (
                  <div className="grid gap-2">
                    <p className="font-medium text-neutral-900">
                      {t('assignment.modal.savedFilters')}
                    </p>

                    <ul className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
                      {filtersPerCategory(search).map((searchFilter, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{searchFilter.title}</span>
                          <span
                            className={classNames({
                              'flex h-5 min-w-[20px] items-center justify-center rounded-lg px-1 text-xs font-semibold ':
                                true,
                              'bg-neutral-200 text-neutral-700':
                                searchFilter.count === 0,
                              'bg-neutral-900 text-white':
                                searchFilter.count > 0,
                            })}
                          >
                            {searchFilter.count}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <footer className="mt-auto flex flex-row flex-wrap gap-3">
                  {hasButtons && (
                    <BaseButton
                      theme="secondary"
                      size="md"
                      onClick={() => handleDeleteSearch(search.id)}
                      square
                    >
                      <IconTrash />
                    </BaseButton>
                  )}
                  <BaseButton
                    theme="secondary"
                    size="md"
                    onClick={() => handleViewFilter(search.id)}
                  >
                    {t('global.viewFilters')}
                  </BaseButton>
                  {hasButtons && (
                    <BaseButton
                      theme="primary"
                      size="md"
                      href={`/opdracht-vinden/zoeken?zoekopdracht=${search.id}`}
                    >
                      <span>{t('global.check')}</span>
                    </BaseButton>
                  )}
                </footer>
              </article>
            ))}
          <SaveSearchModal
            isOpen={saveSearchModalIsOpen}
            onClose={() => setSaveSearchModalIsOpen(false)}
            filterData={{
              searchTags: selectedSavedSearch?.searchTags?.split(','),
              hoursTo: selectedSavedSearch?.maxHoursPerWeek,
              hoursFrom: selectedSavedSearch?.minHoursPerWeek,
              noMatchingIntermediaries:
                selectedSavedSearch?.noMatchingIntermediaries ?? false,
              locations: selectedSavedSearch?.locations?.split(','),
              expertises: selectedSavedSearch?.expertises?.split(','),
              onLocation: selectedSavedSearch?.onLocation ?? false,
            }}
            title={selectedSavedSearch?.description}
            instantAlert={selectedSavedSearch?.instantAlert}
            batchAlert={selectedSavedSearch?.batchAlert}
            isReadOnly={true}
          />
        </div>
      </section>
    </>
  );
}
