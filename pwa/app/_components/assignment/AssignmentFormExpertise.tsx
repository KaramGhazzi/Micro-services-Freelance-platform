import React, { useCallback, useMemo } from 'react';
import { Popover } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import BaseHeading from '../BaseHeading';
import BaseChecktag from '../BaseChecktag';
import IconPlusCircle from '../icons/IconPlusCircle';
import IconXSm from '../icons/IconXSm';
import AssignmentFormSection from './AssignmentFormSection';
import expertiseOptions from '@/app/(dashboard)/_data/expertiseOptions';
import { ExpertiseType } from '@/graphql/types';

const AreaOfExpertiseSelector = ({
  addExpertise,
  removeExpertise,
  expertises = [],
  disabled = false,
}: {
  addExpertise: (expertise: ExpertiseType) => void;
  removeExpertise: (expertise: ExpertiseType) => void;
  expertises?: ExpertiseType[];
  disabled?: boolean;
}) => {
  const t = useTranslations();
  const global = useTranslations('global');

  const handleChange = useCallback(
    (changedExpertise: ExpertiseType) => {
      const existingExpertise = expertises.some(
        (item) => item === changedExpertise
      );

      if (existingExpertise) {
        removeExpertise(changedExpertise);
      } else {
        addExpertise(changedExpertise);
      }
    },
    [expertises]
  );

  return (
    <Popover className="relative z-20">
      {() => (
        <>
          <Popover.Button
            disabled={disabled}
            className="bg-transparent outline-none"
          >
            <div
              className={classNames(
                'relative inline-flex h-10 w-auto items-center justify-center gap-1 rounded-lg bg-neutral-50 px-5 text-sm font-semibold transition-all hover:bg-neutral-100',
                disabled ? 'pointer-events-none opacity-50' : ''
              )}
            >
              <IconPlusCircle />
              {global('add')}
            </div>
          </Popover.Button>

          {!disabled && (
            <Popover.Panel className="absolute z-20 mt-2 max-h-[448px] w-[calc(100vw-2.5rem)] max-w-5xl divide-y divide-neutral-100 overflow-y-auto rounded-lg border border-neutral-100 bg-white shadow-md lg:w-[calc(100vw-23rem)]">
              <div className="flex flex-col">
                {expertiseOptions?.map((expertiseArea) => (
                  <div
                    key={expertiseArea.label}
                    className="divide-neutral-100 border-b p-5"
                  >
                    <div className="mb-2 text-sm font-medium">
                      {t(`expertise.type.${expertiseArea.label}.label`)}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {expertiseArea.expertises.map((expertise) => (
                        <BaseChecktag
                          key={expertise}
                          label={t(`assignment.expertise.option.${expertise}`)}
                          name={expertise}
                          checked={expertises.some(
                            (item) => expertise === item
                          )}
                          onChange={() => handleChange(expertise)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          )}
        </>
      )}
    </Popover>
  );
};

export default function AssignmentFormExpertise({
  expertises,
  isEditable,
  updateExpertises,
}: {
  expertises: ExpertiseType[];
  isEditable: boolean;
  updateExpertises?: (expertises: ExpertiseType[]) => void;
}) {
  const t = useTranslations();

  const addExpertise = (expertise: ExpertiseType) => {
    if (expertises) {
    }
    if (
      disabled ||
      expertises?.find((currentExpertise) => currentExpertise === expertise)
    )
      return;

    if (updateExpertises) {
      updateExpertises([...expertises, expertise]);
    }
  };

  const removeExpertise = (expertiseToRemove: ExpertiseType) => {
    const newExpertises = expertises.filter(
      (expertise) => expertise !== expertiseToRemove
    );

    if (updateExpertises) {
      updateExpertises(newExpertises);
    }
  };

  const expertiseLimit = 3;

  const disabled = useMemo(() => {
    return expertises && expertises?.length >= expertiseLimit;
  }, [expertises]);

  return (
    <AssignmentFormSection>
      <div>
        <BaseHeading type="h2">{t('assignment.heading.expertise')}</BaseHeading>
        {isEditable && (
          <p className="mt-1 text-sm font-medium text-neutral-500">
            {t('expertise.description')}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {expertises.map((expertise) => (
          <div key={expertise} className="group relative">
            <div className="pointer-events-none relative inline-flex w-auto items-center justify-center rounded-lg bg-neutral-100 px-5 py-2.5  text-sm font-semibold transition-all hover:bg-neutral-200">
              {t(`assignment.expertise.option.${expertise}`)}
            </div>
            {isEditable && (
              <span
                className="absolute -right-2 -top-1 h-5 w-5 cursor-pointer items-center justify-center rounded-xl bg-slate-700 text-white opacity-0 transition-all group-hover:opacity-100"
                onClick={() => removeExpertise(expertise)}
              >
                <IconXSm />
              </span>
            )}
          </div>
        ))}

        {isEditable && (
          <AreaOfExpertiseSelector
            addExpertise={addExpertise}
            removeExpertise={removeExpertise}
            expertises={expertises}
            disabled={disabled}
          />
        )}
      </div>
    </AssignmentFormSection>
  );
}
