import React from 'react';
import { Popover } from '@headlessui/react';
import classNames from 'classnames';
import BaseRadio from './BaseRadio';
import IconChevronDown from './icons/IconChevronDown';

type Option<T> = {
  label: string;
  value: T;
  large?: boolean;
};

type Props<T> = {
  selected: T;
  options: Option<T>[];
  large?: boolean;
  icon?: React.ReactNode;
  onChange?: (selectedOption: T) => void;
};

const BaseFilterButton = <T extends string>({
  selected,
  options,
  onChange,
  large,
  icon,
}: Props<T>) => {
  const label =
    options?.find((option) => option.value == selected)?.label ?? '-';

  const handleRadioChange = (optionValue: T) => {
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <Popover className="relative z-10 ">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={classNames({
              'flex min-w-[12rem] items-center gap-2 rounded-lg border border-neutral-200 bg-white pl-4 pr-3 text-sm shadow-sm transition-all hover:bg-neutral-50':
                true,
              'h-12 w-full': large,
              'h-10': !large,
            })}
          >
            {icon}
            <span className="grow text-left">{label}</span>

            <IconChevronDown className={open ? 'rotate-180' : ''} />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 mt-2 flex max-h-[448px] min-w-[12rem] flex-col gap-1 overflow-y-auto rounded-lg border border-neutral-100 bg-white px-4 py-3 shadow-md">
            {options?.map((option, index) => (
              <div key={index}>
                <BaseRadio
                  label={option.label}
                  name={option.value}
                  checked={selected == option.value}
                  onChange={() => {
                    handleRadioChange(option.value);
                    close();
                  }}
                  hideRadio
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
