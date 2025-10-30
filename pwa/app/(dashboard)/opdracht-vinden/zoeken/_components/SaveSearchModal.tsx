import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Modal from '@/app/_components/BaseDialog';
import BaseButton from '@/app/_components/BaseButton';
import BaseInput from '@/app/_components/BaseInput';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import { SavedSearchCreateInput, SearchQueryInput } from '@/graphql/types';
import { useCreateSavedSearchMutation } from '@/graphql/mutations/saved-search/createSavedSearch.generated';

type SaveSearchModalProps = {
  isOpen: boolean;
  isReadOnly?: boolean;
  onClose: () => void;
  onSave?: () => void;
  filterData: SearchQueryInput;
  title?: string;
  instantAlert?: boolean;
  batchAlert?: boolean;
};

const SaveSearchModal = ({
  isOpen,
  isReadOnly,
  onClose,
  onSave,
  filterData,
  title,
  instantAlert,
  batchAlert,
}: SaveSearchModalProps) => {
  const t = useTranslations('assignment');
  const [createSavedSearch] = useCreateSavedSearchMutation();

  const [formData, setFormData] = useState({
    title: '',
    instantAlert: false,
    batchAlert: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const {
    searchTags,
    hoursTo,
    hoursFrom,
    noMatchingIntermediaries,
    locations,
    onLocation,
    expertises,
  } = filterData;

  let combinedFilters: string[] = [];
  let combinedLocations: string[] = [];

  if (searchTags?.length) {
    searchTags.forEach((searchTag) => combinedFilters.push(searchTag));
  }

  if (locations?.length) {
    locations.forEach((location) =>
      combinedFilters.push(t(`location.province.${location}`))
    );

    locations.forEach((location) =>
      combinedLocations.push(t(`location.province.${location}`))
    );
  }

  if (expertises && expertises.length) {
    expertises.forEach((expertise) =>
      combinedFilters.push(t(`expertise.option.${expertise}`))
    );
  }

  if (hoursFrom && hoursTo && hoursTo > 0) {
    combinedFilters.push(`${hoursFrom}-${hoursTo} uur`);
  }

  if (noMatchingIntermediaries) {
    combinedFilters.push(t('toolbar.noMatchingIntermediaries'));
  }

  if (onLocation) {
    combinedFilters.push(t('toolbar.onLocation'));
    combinedLocations.push(t('toolbar.onLocation'));
  }

  const getFormData = (): SavedSearchCreateInput => {
    return {
      description: formData.title,
      batchAlert: formData.batchAlert,
      instantAlert: formData.instantAlert,
      maxHoursPerWeek: hoursTo ? hoursTo : undefined,
      minHoursPerWeek: hoursFrom ? hoursFrom : undefined,
      searchTags:
        searchTags && searchTags.length > 0 ? String(searchTags) : undefined,
      locations:
        locations && locations.length > 0 ? String(locations) : undefined,
      expertises:
        expertises && expertises.length > 0 ? String(expertises) : undefined,
      noMatchingIntermediaries: noMatchingIntermediaries,
      onLocation: onLocation,
    };
  };

  const saveSearch = async () => {
    const response = await createSavedSearch({
      variables: {
        data: getFormData(),
      },
    });

    // TODO handle errors
    if (!response.errors && onSave) {
      onSave();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title={isReadOnly && title !== undefined ? title : t('modal.saveSearch')}
      footer={
        <>
          <BaseButton onClick={onClose} theme="secondary" size="md">
            {t('modal.cancel')}
          </BaseButton>

          {!isReadOnly && (
            <BaseButton
              onClick={saveSearch}
              size="md"
              disabled={formData?.title?.length === 0}
            >
              {t('modal.save')}
            </BaseButton>
          )}
        </>
      }
    >
      <div className="grid gap-6">
        {!isReadOnly && (
          <>
            <BaseInput
              label={t('modal.nameOfSearch')}
              placeholder={t('modal.nameOfSearch')}
              name="title"
              value={title ?? formData.title}
              onChange={handleInputChange}
              type="text"
              autofocus
            />

            <div className="grid gap-2">
              <p className="font-medium text-neutral-700">
                {t('modal.alertSettings')}
              </p>
              <div className="grid gap-1">
                <BaseCheckbox
                  label={t('modal.instantAlert')}
                  name="instantAlert"
                  checked={
                    instantAlert !== undefined
                      ? instantAlert
                      : formData.instantAlert
                  }
                  onChange={handleCheckboxChange}
                />
                <BaseCheckbox
                  label={t('modal.batchAlert')}
                  name="batchAlert"
                  checked={
                    batchAlert !== undefined ? batchAlert : formData.batchAlert
                  }
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
          </>
        )}
        {!isReadOnly && combinedFilters.length > 0 && (
          <div className="grid gap-2">
            <p className="font-medium text-neutral-700">
              {t('modal.savedFilters')}
            </p>
            <ul className="flex flex-wrap gap-1">
              {combinedFilters.map((filter) => (
                <li
                  key={filter}
                  className="flex h-6 items-center whitespace-nowrap rounded bg-neutral-700 px-2 text-xs font-semibold text-white"
                >
                  {filter}
                </li>
              ))}
            </ul>
          </div>
        )}
        {isReadOnly && (
          <div className="grid gap-3">
            {[
              {
                label: t('savedSearches.searchTerms'),
                items: searchTags,
                renderItem: (item: string) => item,
              },
              {
                label: t('savedSearches.expertises'),
                items: expertises,
                renderItem: (item: string) => t(`expertise.option.${item}`),
              },
              {
                label: t('savedSearches.hoursPerWeek'),
                items:
                  hoursFrom && hoursTo && hoursTo > 0
                    ? [`${hoursFrom} - ${hoursTo} uur`]
                    : hoursFrom && hoursFrom > 0
                    ? [`${hoursFrom} > uur`]
                    : hoursTo && hoursTo > 0
                    ? [`< ${hoursTo} uur`]
                    : [],
              },
              {
                label: t('savedSearches.locations'),
                items: combinedLocations,
                renderItem: (item: string) => item,
              },
              {
                label: t('savedSearches.intermediair'),
                items: noMatchingIntermediaries
                  ? [t('toolbar.noMatchingIntermediaries')]
                  : [],
              },
            ].map(
              ({ label, items, renderItem = (item) => item }) =>
                items &&
                items.length > 0 && (
                  <div key={label}>
                    <p className="mb-1 font-medium text-neutral-900">{label}</p>
                    <ul className="flex flex-wrap gap-1">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="flex h-6 items-center whitespace-nowrap rounded bg-neutral-700 px-2 text-xs font-semibold text-white"
                        >
                          {renderItem(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SaveSearchModal;
