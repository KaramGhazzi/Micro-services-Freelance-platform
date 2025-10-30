import React, { FC, FocusEventHandler, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  append?: string;
  prepend?: string;
  helper?: string;
  error?: string;
  value: any;
  autofocus?: boolean;
  onChange: (value: number) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name: string;
  disabled?: boolean;
}

const BaseInput: FC<Props> = ({
  label,
  placeholder,
  helper,
  error,
  value,
  onChange,
  lang = 'nl-NL',
  autoFocus,
  prepend,
  append,
  name,
  disabled,
}) => {
  const handleConvertNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueWithTwoDecimals = parseFloat(e.target.value).toFixed(2);
    const convertedValueWithTwoDecimals = Number(valueWithTwoDecimals);
    onChange(convertedValueWithTwoDecimals);
  };

  return (
    <div className="grid gap-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}

      <div className="flex">
        {prepend && (
          <div className="flex items-center rounded-l-lg border border-r-0 border-neutral-200 bg-neutral-50 px-3 text-sm font-medium text-neutral-600 shadow-sm">
            {prepend}
          </div>
        )}
        <input
          type="number"
          name={name}
          formNoValidate
          placeholder={placeholder}
          value={value}
          autoFocus={autoFocus}
          disabled={disabled}
          lang={lang}
          min="0"
          onChange={(e) => handleConvertNumber(e)}
          className={classNames({
            'ring-secondary-500/20 focus:border-secondary-300 z-10 block flex h-12 w-full appearance-none items-center rounded-none border bg-white px-4 text-sm font-medium font-normal placeholder-neutral-300 shadow-sm outline-none transition-all  first:rounded-l-lg last:rounded-r-lg focus:ring-2':
              true,
            'border-error-500': error,
            'border-neutral-200': !error,
            'border-neutral-300': value?.length > 0,
            'cursor-not-allowed !bg-neutral-50 text-neutral-300': disabled,
          })}
        />
        {append && (
          <div className="flex items-center rounded-r-lg border border-l-0 border-neutral-200 bg-neutral-50 px-3 text-sm font-medium text-neutral-600 shadow-sm">
            {append}
          </div>
        )}
      </div>

      {error && <p className="text-error-600 text-xs font-medium">{error}</p>}

      {helper && (
        <p className="text-xs font-medium text-neutral-500">{helper}</p>
      )}
    </div>
  );
};

export default BaseInput;
