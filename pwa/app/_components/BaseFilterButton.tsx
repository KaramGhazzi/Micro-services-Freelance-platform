import React, { useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';
import classNames from 'classnames';
import BaseCheckbox from './BaseCheckbox';
import IconChevronDown from './icons/IconChevronDown';

type Option<T> = {
  label: string;
  value: T;
  large?: boolean;
};

type Props<T> = {
  label: string;
  options?: Option<T>[];
  large?: boolean;
  onChange?: (selectedOptions: T[]) => void;
  selected?: T[];
};

const BaseFilterButton = <T extends string>({
  label,
  options,
  onChange,
  large,
  selected,
}: Props<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<T[]>(selected ?? []);
  useEffect(() => {
    if (selected) setSelectedOptions(selected);
  }, [selected]);

  const handleCheckboxChange = (optionValue: T) => {
    let updatedSelection: T[];

    if (selectedOptions.includes(optionValue)) {
      updatedSelection = selectedOptions.filter(
        (value) => value !== optionValue
      );
    } else {
      updatedSelection = [...selectedOptions, optionValue];
    }

    setSelectedOptions(updatedSelection);

    if (onChange) {
      onChange(updatedSelection);
    }
  };

  return (
    <Popover className="relative z-10 ">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames({
              'flex items-center gap-2 rounded-lg border border-neutral-200 bg-white pl-4 pr-3 text-sm font-semibold shadow-sm transition-all hover:bg-neutral-50':
                true,
              'h-12 w-full': large,
              'h-10': !large,
            })}
          >
            <span className="grow text-left">{label}</span>
            <span
              className={classNames({
                'mr-1 flex h-5 min-w-[20px] items-center justify-center rounded-lg px-0.5 text-xs font-semibold tabular-nums':
                  true,
                'bg-neutral-100 text-neutral-700': selectedOptions.length === 0,
                'bg-neutral-900 text-white': selectedOptions.length > 0,
              })}
            >
              {selectedOptions.length}
            </span>

            <IconChevronDown className={open ? 'rotate-180' : ''} />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 mt-2 flex max-h-[448px] w-screen max-w-[224px] flex-col gap-1 overflow-y-auto rounded-lg border border-neutral-100 bg-white px-4 py-3 shadow-md">
            {options?.map((option, index) => (
              <div key={index}>
                <BaseCheckbox
                  label={option.label}
                  name={option.value}
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                />
              </div>
            ))}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default BaseFilterButton;
