'use client';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Popover } from '@headlessui/react';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';
import locationsOptions, { Province } from '../../../_data/provinceOptions';
import SaveSearchModal from './SaveSearchModal';
import BaseTagInput, { BaseTagInputRef } from '@/app/_components/BaseTagInput';
import IconSearch from '@/app/_components/icons/IconSearch';
import IconChevronDown from '@/app/_components/icons/IconChevronDown';
import BaseChecktag from '@/app/_components/BaseChecktag';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import BaseInput from '@/app/_components/BaseInput';
import BaseButton from '@/app/_components/BaseButton';
import IconBellSm from '@/app/_components/icons/IconBellSm';
import { ExpertiseType, SearchQueryInput } from '@/graphql/types';
import IconFilter from '@/app/_components/icons/IconFilter';
import Modal from '@/app/_components/BaseDialog';
import BaseHeading from '@/app/_components/BaseHeading';
import { useSavedSearchQuery } from '@/graphql/queries/saved-search/savedSearch.generated';
import BaseConfirmationIcon from '@/app/_components/BaseConfirmationIcon';
import IconSavedSearch from '@/app/_components/icons/IconSavedSearch';
import BaseAlert from '@/app/_components/BaseAlert';
import FeatureFlagContext from '@/app/(dashboard)/_context/FeatureFlagContext';
import expertiseOptions from '@/app/(dashboard)/_data/expertiseOptions';
import {
  useFilterStorage,
  useFilterStorageAsState,
} from '@/app/_hooks/useFilterStorage';

type Props = {
  count?: any;
  onSearch: (query: SearchQueryInput, hasSavedSearch: boolean) => void;
};

const keys: (keyof SearchQueryInput)[] = [
  'searchTags',
  'hoursTo',
  'hoursFrom',
  'noMatchingIntermediaries',
  'locations',
  'onLocation',
  'expertises',
];

const SearchToolbar = ({ count, onSearch }: Props) => {
  const t = useTranslations('assignment');
  const searchParams = useSearchParams();
  const filterStorage = useFilterStorage('/opdracht-vinden/zoeken', {
    savedSearchId: 0,
  });

  const savedSearchId =
    Number(searchParams.get('zoekopdracht')) ||
    filterStorage.get('savedSearchId');

  const [savedSearchLoaded, setSavedSearchLoaded] = useState(false);
  const [saveSearchModalIsOpen, setSaveSearchModalIsOpen] = useState(false);
  const [confirmSaveSearchModalIsOpen, setConfirmSaveSearchModalIsOpen] =
    useState(false);

  const [activeSavedSearch, setActiveSavedSearch] = useState<any>(null);
  const { textkernelEnabled } = useContext(FeatureFlagContext);
  const baseTagInputRef = useRef<BaseTagInputRef>(null);

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters, resetFilters] =
    useFilterStorageAsState<SearchQueryInput>(filterStorage, {
      noMatchingIntermediaries: false,
      onLocation: false,
      expertises: [],
      locations: [],
      hoursFrom: null,
      hoursTo: null,
      publishAtFrom: undefined,
      searchTags: [],
    });

  const { data: savedSearchData } = useSavedSearchQuery({
    variables: {
      where: {
        id: savedSearchId,
      },
      markAsViewed: true,
    },
    skip: !savedSearchId || savedSearchLoaded,
  });

  const updateFilter = <T extends keyof SearchQueryInput>(
    filterToUpdate: T,
    valueToUpdate: SearchQueryInput[T]
  ) => {
    setFilters((previousState) => ({
      ...previousState,
      [filterToUpdate]: valueToUpdate,
    }));
  };

  useEffect(() => {
    if (!activeSavedSearch) return;

    if (savedSearchIsSameAsFilters()) {
      filterStorage.set('savedSearchId', Number(activeSavedSearch.id));
    } else {
      filterStorage.remove('savedSearchId');
    }
  }, [filters, activeSavedSearch]);

  useEffect(() => {
    if (filters) {
      onSearch(filters, !!activeSavedSearch);
    }
  }, [filters]);

  useEffect(() => {
    if (!savedSearchData) {
    } else if (!savedSearchLoaded) {
      setSavedSearchLoaded(true);

      if (savedSearchData.savedSearch?.searchTags) {
        const tags = savedSearchData.savedSearch.searchTags.split(',');
        updateFilter('searchTags', tags);
      } else {
        updateFilter('searchTags', []);
      }

      if (savedSearchData.savedSearch?.locations) {
        const locations = savedSearchData.savedSearch.locations.split(',');
        updateFilter('locations', locations);
      } else {
        updateFilter('locations', []);
      }

      if (savedSearchData.savedSearch?.expertises) {
        const expertises = savedSearchData.savedSearch.expertises.split(',');
        updateFilter('expertises', expertises);
      } else {
        updateFilter('expertises', []);
      }

      if (savedSearchData.savedSearch?.minHoursPerWeek) {
        updateFilter('hoursFrom', savedSearchData.savedSearch?.minHoursPerWeek);
      } else {
        updateFilter('hoursFrom', null);
      }

      if (savedSearchData.savedSearch?.maxHoursPerWeek) {
        updateFilter('hoursTo', savedSearchData.savedSearch?.maxHoursPerWeek);
      } else {
        updateFilter('hoursTo', null);
      }

      if (savedSearchData.savedSearch?.noMatchingIntermediaries) {
        updateFilter(
          'noMatchingIntermediaries',
          savedSearchData.savedSearch?.noMatchingIntermediaries
        );
      } else {
        updateFilter('noMatchingIntermediaries', false);
      }

      if (savedSearchData.savedSearch?.onLocation) {
        updateFilter('onLocation', savedSearchData.savedSearch?.onLocation);
      } else {
        updateFilter('onLocation', false);
      }

      setActiveSavedSearch(savedSearchData.savedSearch);
    }
  }, [savedSearchData]);

  const handleTagsChange = (updatedTags: string[]) => {
    updateFilter('searchTags', updatedTags);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'min') {
      updateFilter('hoursFrom', parseInt(value));
    }

    if (name === 'max') {
      updateFilter('hoursTo', parseInt(value));
    }
  };

  const toggleAllLocations = (locations?: Province[]) => {
    if (!locations) {
      return;
    }

    const allOptionsPresent = locations.every((location) =>
      filters.locations?.includes(location)
    );

    if (allOptionsPresent) {
      const filteredLocations = filters.locations?.filter(
        (location) => !locations.some((loc) => loc === location)
      );
      updateFilter('locations', filteredLocations ?? []);
    } else {
      const newLocations = locations
        .filter((location) => !filters.locations?.includes(location))
        .map((location) => location);

      updateFilter('locations', [
        ...(filters.locations ?? []),
        ...newLocations,
      ]);
    }
  };

  const toggleAllExpertises = (expertises?: ExpertiseType[]) => {
    if (!expertises) {
      return;
    }

    const allOptionsPresent = expertises.every((expertise) =>
      filters.expertises?.includes(expertise)
    );

    if (allOptionsPresent) {
      const filteredExpertises = filters.expertises?.filter(
        (filterExpertise) =>
          !expertises.some((expertise) => filterExpertise === expertise)
      );
      updateFilter('expertises', filteredExpertises ?? []);
    } else {
      const newExpertises = expertises
        .filter((expertise) => !filters.expertises?.includes(expertise))
        .map((expertise) => expertise);

      updateFilter('expertises', [
        ...(filters.expertises ?? []),
        ...newExpertises,
      ]);
    }
  };

  const handleLocationChange = (locationValue: string) => {
    const updatedLocations = new Set(filters.locations);

    if (updatedLocations.has(locationValue)) {
      updatedLocations.delete(locationValue);
    } else {
      updatedLocations.add(locationValue);
    }

    updateFilter('locations', Array.from(updatedLocations));
  };

  const handleOnLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter('onLocation', e.target.checked);
  };

  const handleExpertiseChange = (expertiseValue: string) => {
    const updatedExpertises = new Set(filters.expertises);

    if (updatedExpertises.has(expertiseValue)) {
      updatedExpertises.delete(expertiseValue);
    } else {
      updatedExpertises.add(expertiseValue);
    }
    updateFilter('expertises', Array.from(updatedExpertises));
  };

  const handleIntermediariesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateFilter('noMatchingIntermediaries', e.target.checked);
  };

  const hoursPerWeekCount = useMemo(() => {
    const hoursFrom = filters?.hoursFrom ?? 0;
    const hoursTo = filters?.hoursTo ?? 0;

    if (hoursFrom === 0 && hoursTo === 0) return 0;
    if (hoursFrom > 0 && hoursTo > 0) return 1;
    if (hoursFrom > 0 || hoursTo > 0) return 1;

    return 0;
  }, [filters?.hoursFrom, filters?.hoursTo]);

  const placedByCount = useMemo(() => {
    if (filters?.noMatchingIntermediaries) return 1;

    return 0;
  }, [filters?.noMatchingIntermediaries]);

  const someFiltersActive = (): boolean => {
    const filtersActive =
      (filters.hoursFrom && filters.hoursFrom > 0) ||
      (filters.hoursTo && filters.hoursTo > 0) ||
      (filters.locations && filters.locations.length > 0) ||
      (filters.expertises && filters.expertises.length > 0) ||
      (filters.searchTags && filters.searchTags.length > 0) ||
      filters.onLocation !== false ||
      filters.noMatchingIntermediaries !== false;

    return filtersActive;
  };

  const savedSearchIsSameAsFilters = (): boolean => {
    const savedSearchTags = activeSavedSearch?.searchTags?.split(',') || [];
    const savedSearchLocations = activeSavedSearch?.locations?.split(',') || [];
    const savedSearchExpertises =
      activeSavedSearch?.expertises?.split(',') || [];
    const savedSearchHoursFrom = activeSavedSearch?.minHoursPerWeek || null;
    const savedSearchHoursTo = activeSavedSearch?.maxHoursPerWeek || null;
    const savedSearchNoMatchingIntermediaries =
      activeSavedSearch?.noMatchingIntermediaries || null;
    const savedSearchOnLocation = activeSavedSearch?.onLocation || null;

    const tagsAreEqual =
      JSON.stringify(savedSearchTags) ===
      JSON.stringify(filters.searchTags || []);
    const locationsAreEqual =
      JSON.stringify(savedSearchLocations) ===
      JSON.stringify(filters.locations || []);
    const expertisesAreEqual =
      JSON.stringify(savedSearchExpertises) ===
      JSON.stringify(filters.expertises || []);
    const hoursFromIsEqual =
      savedSearchHoursFrom === (filters.hoursFrom || null);
    const hoursToIsEqual = savedSearchHoursTo === (filters.hoursTo || null);
    const noMatchingIntermediariesIsEqual =
      savedSearchNoMatchingIntermediaries ===
      (filters.noMatchingIntermediaries || null);
    const onLocationIsEqual =
      savedSearchOnLocation === (filters.onLocation || null);

    return (
      tagsAreEqual &&
      locationsAreEqual &&
      expertisesAreEqual &&
      hoursFromIsEqual &&
      hoursToIsEqual &&
      noMatchingIntermediariesIsEqual &&
      onLocationIsEqual
    );
  };

  const getLocationFilterCount = () => {
    let locationFilterCount = filters.locations?.length ?? 0;
    locationFilterCount += filters.onLocation ? 1 : 0;
    return locationFilterCount;
  };

  const getExpertiseFilterCount = () => {
    return (filters.expertises && filters.expertises.length) || 0;
  };

  const saveCompleted = () => {
    setSaveSearchModalIsOpen(false);
    setConfirmSaveSearchModalIsOpen(true);
  };

  const isCountryChecked = (provinces: Province[]) => {
    if (!filters.locations) {
      return false;
    }
    const allOptionsPresent = provinces.every((province) =>
      filters.locations?.includes(province)
    );

    return allOptionsPresent;
  };

  const isExpertiseAreaChecked = (expertises: ExpertiseType[]) => {
    if (!filters.expertises) {
      return false;
    }
    const allOptionsPresent = expertises.every(
      (expertise) =>
        filters.expertises && filters.expertises.includes(expertise)
    );

    return allOptionsPresent;
  };

  const handleResetFilters = () => {
    if (baseTagInputRef.current) {
      baseTagInputRef.current.resetTags();
    }
    resetFilters();
  };

  return (
    <header className="z-20 grid gap-2 border-b border-neutral-100 bg-white/90 px-5 py-6 backdrop-blur-sm lg:gap-6 lg:px-10 lg:py-10">
      <div className="flex flex-col justify-between lg:flex-row lg:items-center">
        <div className="flex items-center gap-2 lg:gap-4">
          <h1 className="font-heading text-xl font-bold tracking-tight lg:text-2xl">
            {t('toolbar.searchAssignments')} ({count ?? 0})
          </h1>
          {activeSavedSearch && savedSearchIsSameAsFilters() && (
            <div>
              <div className="flex gap-1 text-sm font-medium text-neutral-600">
                <IconSavedSearch className="text-neutral-400" />
                <span>{activeSavedSearch.description}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-4">
        <BaseTagInput
          ref={baseTagInputRef}
          initialTags={filters?.searchTags}
          onTagsChange={handleTagsChange}
          placeholder={t('toolbar.searchPlaceholder')}
          icon={<IconSearch className="text-neutral-600" />}
        />

        <div className="flex-wrap gap-2 lg:flex lg:gap-4">
          <div
            className={`flex-wrap gap-2 lg:flex lg:gap-4 ${
              showFilters ? 'flex' : 'hidden'
            }`}
          >
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames({
                      'inline-flex h-10 items-center gap-2 rounded-lg pl-4 pr-3 text-sm font-semibold outline-none transition-all':
                        true,
                      'bg-neutral-50 hover:bg-neutral-100':
                        (filters.expertises?.length ?? 0) === 0 && !open,
                      'bg-primary-100 hover:bg-primary-200':
                        filters.expertises && filters.expertises.length > 0,
                      'bg-neutral-100': open,
                    })}
                  >
                    <span>{t('toolbar.expertises')}</span>
                    <span
                      className={classNames({
                        'flex h-5 min-w-[20px] items-center justify-center rounded-lg px-1 text-xs font-semibold':
                          true,
                        'bg-neutral-200 text-neutral-700':
                          filters.expertises && filters.expertises.length === 0,
                        'bg-neutral-900 text-white':
                          filters.expertises && filters.expertises.length > 0,
                      })}
                    >
                      {getExpertiseFilterCount()}
                    </span>
                    <IconChevronDown className={open ? 'rotate-180' : ''} />
                  </Popover.Button>
                  <Popover.Panel className="absolute z-20 mt-2 max-h-[448px] w-[calc(100vw-2.5rem)] max-w-5xl divide-y divide-neutral-100 overflow-y-auto rounded-lg border border-neutral-100 bg-white shadow-md lg:w-[calc(100vw-23rem)]">
                    {expertiseOptions.map((expertiseArea, index) => (
                      <section key={index} className="p-5">
                        <header className="mb-0.5">
                          {expertiseArea.expertises && (
                            <BaseCheckbox
                              label={t(`expertise.area.${expertiseArea.label}`)}
                              name={expertiseArea.label}
                              checked={isExpertiseAreaChecked(
                                expertiseArea.expertises
                              )}
                              onChange={() =>
                                toggleAllExpertises(expertiseArea.expertises)
                              }
                            />
                          )}
                        </header>
                        {expertiseArea.expertises && (
                          <div className="flex flex-wrap gap-1">
                            {expertiseArea.expertises.map((expertises) => (
                              <BaseChecktag
                                key={expertises}
                                label={t(`expertise.option.${expertises}`)}
                                name={expertises}
                                checked={
                                  filters.expertises?.includes(expertises) ??
                                  false
                                }
                                onChange={() =>
                                  handleExpertiseChange(expertises)
                                }
                              />
                            ))}
                          </div>
                        )}
                      </section>
                    ))}
                  </Popover.Panel>
                </>
              )}
            </Popover>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames({
                      'inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg pl-4 pr-3 text-sm font-semibold outline-none transition-all':
                        true,
                      'bg-neutral-50 hover:bg-neutral-100':
                        hoursPerWeekCount === 0 && !open,
                      'bg-primary-100 hover:bg-primary-200':
                        hoursPerWeekCount > 0,
                      'bg-neutral-100': open,
                    })}
                  >
                    <span>{t('toolbar.hoursPerWeek')}</span>
                    <span
                      className={classNames({
                        'flex h-5 min-w-[20px] items-center justify-center rounded-lg px-1 text-xs font-semibold':
                          true,
                        'bg-neutral-200 text-neutral-700':
                          hoursPerWeekCount === 0,
                        'bg-neutral-900 text-white': hoursPerWeekCount > 0,
                      })}
                    >
                      {hoursPerWeekCount}
                    </span>
                    <IconChevronDown className={open ? 'rotate-180' : ''} />
                  </Popover.Button>
                  <Popover.Panel className="absolute z-20 mt-2 max-h-[448px] w-[calc(100vw-2.5rem)] max-w-sm divide-y divide-neutral-100 overflow-y-auto rounded-lg border border-neutral-100 bg-white shadow-md">
                    <div className="flex items-end gap-3 p-5">
                      <BaseInput
                        label={t('filter.min')}
                        placeholder="0"
                        name="min"
                        append={t('filter.hour')}
                        value={filters?.hoursFrom}
                        onChange={handleHoursChange}
                        type="number"
                      />
                      <i className="mb-6 h-px w-3 bg-neutral-200"></i>
                      <BaseInput
                        label={t('filter.max')}
                        placeholder="40"
                        name="max"
                        append={t('filter.hour')}
                        value={filters?.hoursTo}
                        onChange={handleHoursChange}
                        type="number"
                      />
                    </div>
                  </Popover.Panel>
                </>
              )}
            </Popover>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames({
                      'inline-flex h-10 items-center gap-2 rounded-lg pl-4 pr-3 text-sm font-semibold outline-none transition-all':
                        true,
                      'bg-neutral-50 hover:bg-neutral-100':
                        ((filters.locations?.length ?? 0) === 0 && !open) ||
                        !filters.onLocation,
                      'bg-primary-100 hover:bg-primary-200':
                        (filters.locations && filters.locations.length > 0) ||
                        filters.onLocation,
                      'bg-neutral-100': open,
                    })}
                  >
                    <span>{t('toolbar.workLocation')}</span>
                    <span
                      className={classNames({
                        'flex h-5 min-w-[20px] items-center justify-center rounded-lg px-1 text-xs font-semibold':
                          true,
                        'bg-neutral-200 text-neutral-700':
                          (filters.locations &&
                            filters.locations.length === 0) ||
                          !filters.onLocation,
                        'bg-neutral-900 text-white':
                          (filters.locations && filters.locations.length > 0) ||
                          filters.onLocation,
                      })}
                    >
                      {getLocationFilterCount()}
                    </span>
                    <IconChevronDown className={open ? 'rotate-180' : ''} />
                  </Popover.Button>
                  <Popover.Panel className="absolute z-20 mt-2 max-h-[448px] w-[calc(100vw-2.5rem)] max-w-sm divide-y divide-neutral-100 overflow-y-auto rounded-lg border border-neutral-100 bg-white shadow-md">
                    {locationsOptions.map((country, index) => (
                      <section key={index} className="p-5">
                        <header className="mb-0.5">
                          {country.items ? (
                            <BaseCheckbox
                              label={t(`location.country.${country.label}`)}
                              name={country.label}
                              checked={isCountryChecked(country.items)}
                              onChange={() => toggleAllLocations(country.items)}
                            />
                          ) : (
                            <BaseCheckbox
                              label={t(`location.country.${country.label}`)}
                              name={country.label}
                              checked={filters?.onLocation}
                              onChange={handleOnLocationChange}
                            />
                          )}
                        </header>
                        {country.items && (
                          <div className="flex flex-wrap gap-1">
                            {country.items.map((province) => (
                              <BaseChecktag
                                key={province}
                                label={t(`location.province.${province}`)}
                                name={province}
                                checked={
                                  filters.locations?.includes(province) ?? false
                                }
                                onChange={() => handleLocationChange(province)}
                              />
                            ))}
                          </div>
                        )}
                      </section>
                    ))}
                  </Popover.Panel>
                </>
              )}
            </Popover>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames({
                      'inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg pl-4 pr-3 text-sm font-semibold outline-none transition-all':
                        true,
                      'bg-neutral-50 hover:bg-neutral-100':
                        placedByCount === 0 && !open,
                      'bg-primary-100 hover:bg-primary-200': placedByCount > 0,
                      'bg-neutral-100': open,
                    })}
                  >
                    <span>{t('toolbar.placedBy')}</span>
                    <span
                      className={classNames({
                        'flex h-5 min-w-[20px] items-center justify-center rounded-lg px-1 text-xs font-semibold':
                          true,
                        'bg-neutral-200 text-neutral-700': placedByCount === 0,
                        'bg-neutral-900 text-white': placedByCount > 0,
                      })}
                    >
                      {placedByCount}
                    </span>
                    <IconChevronDown className={open ? 'rotate-180' : ''} />
                  </Popover.Button>
                  <Popover.Panel className="absolute z-20 mt-2 max-h-[448px] w-[calc(100vw-2.5rem)] max-w-sm divide-y divide-neutral-100 overflow-y-auto rounded-lg border border-neutral-100 bg-white shadow-md">
                    <div className="p-5">
                      <BaseCheckbox
                        label={t('toolbar.noMatchingIntermediaries')}
                        name="noMatchingIntermediaries"
                        checked={filters.noMatchingIntermediaries}
                        onChange={handleIntermediariesChange}
                      />
                    </div>
                  </Popover.Panel>
                </>
              )}
            </Popover>

            {filters && (
              <SaveSearchModal
                isOpen={saveSearchModalIsOpen}
                onClose={() => setSaveSearchModalIsOpen(false)}
                onSave={() => saveCompleted()}
                filterData={filters}
              />
            )}
            <Modal
              isOpen={confirmSaveSearchModalIsOpen}
              onClose={() => setConfirmSaveSearchModalIsOpen(false)}
              size="md"
            >
              <BaseConfirmationIcon />
              <div className="mb-8 grid gap-1 text-center">
                <BaseHeading type="h2" size="base">
                  {t('modal.searchSaved')}
                </BaseHeading>
                <p className="text-neutral-500">
                  {t('modal.searchSavedDescription')}
                </p>
              </div>
              <div className="grid gap-4">
                <BaseButton
                  onClick={() => setConfirmSaveSearchModalIsOpen(false)}
                  wide
                  size="lg"
                >
                  {t('modal.continueSearch')}
                </BaseButton>
                <div className="text-center">
                  <Link
                    href="/opdracht-vinden/mijn-zoekopdrachten"
                    className="font-medium text-neutral-900 hover:underline"
                  >
                    {t('modal.toSavedSearches')}
                  </Link>
                </div>
              </div>
            </Modal>
          </div>
          <div className="py-2 lg:hidden">
            <BaseButton
              theme="secondary"
              size="md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <IconFilter />
              <span>
                {showFilters
                  ? t('toolbar.hideFilters')
                  : t('toolbar.showFilters')}
              </span>
            </BaseButton>
          </div>
          {someFiltersActive() && !savedSearchIsSameAsFilters() && (
            <div className="mb-2 lg:mb-0">
              <BaseButton
                theme="primary"
                size="md"
                onClick={() => setSaveSearchModalIsOpen(true)}
              >
                <IconBellSm />
                <span>{t('toolbar.saveSearch')}</span>
              </BaseButton>
            </div>
          )}
          {someFiltersActive() && (
            <BaseButton
              theme="secondary"
              size="md"
              onClick={handleResetFilters}
            >
              <span>{t('toolbar.resetFilters')}</span>
            </BaseButton>
          )}
        </div>
        <BaseAlert
          title={t('toolbar.assignmentsInactive.title')}
          text={t('toolbar.assignmentsInactive.description')}
          theme="warning"
          alertDisabled={textkernelEnabled}
        />
      </div>
    </header>
  );
};

export { keys as searchToolbarKeys };
export default SearchToolbar;
