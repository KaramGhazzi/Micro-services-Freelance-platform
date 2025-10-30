import React, { ChangeEvent, FC, SelectHTMLAttributes } from 'react';
import classNames from 'classnames';
import IconChevronUpDown from './icons/IconChevronUpDown';

interface BaseSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  label?: string;
  helper?: string;
  error?: string;
  value: any;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  selectSize?: string;
  disabled?: boolean;
}

const BaseSelect: FC<BaseSelectProps> = ({
  label,
  placeholder,
  required,
  helper,
  error,
  value,
  onChange,
  autoFocus,
  children,
  name,
  disabled,
  selectSize = null,
}) => {
  const placeholderDisabled = placeholder && required ? true : false;

  return (
    <div className="grid gap-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          value={value ?? ''}
          onChange={onChange}
          required={required}
          autoFocus={autoFocus}
          name={name}
          className={classNames({
            'ring-secondary-500/20 focus:border-secondary-300 block w-full cursor-pointer appearance-none rounded-lg border bg-white px-4 font-sans text-sm font-medium font-normal placeholder-neutral-300 shadow-sm outline-none transition-all focus:ring-2 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-500':
              true,
            'border-error-500': error,
            'border-neutral-200': !error,
            'border-neutral-300': value?.length > 0,
            'h-10': selectSize === 'sm',
            'h-12': selectSize !== 'sm',
          })}
          disabled={disabled}
        >
          {placeholder && (
            <option disabled={placeholderDisabled} key="placeholder" value="">
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <i className="pointer-events-none absolute bottom-0 right-0 top-0 flex items-center pr-3">
          <IconChevronUpDown />
        </i>
      </div>

      {error && <p className="text-error-600 text-xs font-medium">{error}</p>}

      {helper && (
        <p className="text-xs font-medium text-neutral-500">{helper}</p>
      )}
    </div>
  );
};

export default BaseSelect;
