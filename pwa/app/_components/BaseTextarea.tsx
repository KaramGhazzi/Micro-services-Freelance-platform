import React, { ChangeEvent, FC, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

interface Props
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange'
  > {
  label?: string;
  helper?: string;
  error?: string;
  value: any;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  disabled?: boolean;
  size?: string;
  minLength?: number;
  maxLength?: number;
}

const BaseTextarea: FC<Props> = ({
  label,
  placeholder,
  helper,
  error,
  value,
  onChange,
  autoFocus,
  name,
  disabled,
  size = 'sm',
  minLength,
  maxLength,
}) => {
  return (
    <div className="grid gap-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}

      <div className="flex">
        <textarea
          name={name}
          placeholder={placeholder}
          value={value || ''}
          autoFocus={autoFocus}
          disabled={disabled}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
          className={classNames({
            'ring-secondary-500/20 focus:border-secondary-300 z-10 block flex w-full resize-none appearance-none items-center rounded-lg border bg-white px-4 py-3.5 text-sm font-medium font-normal placeholder-neutral-300 shadow-sm outline-none transition-all focus:ring-2':
              true,
            'border-error-500': error,
            'border-neutral-200': !error,
            'h-24': size === 'sm',
            'h-48': size === 'md',
            'h-72': size === 'lg',
            'border-neutral-300': value?.length > 0,
            'cursor-not-allowed !bg-neutral-50 text-neutral-300': disabled,
          })}
        />
      </div>

      {error && <p className="text-error-600 text-xs font-medium">{error}</p>}

      {helper && (
        <p className="text-xs font-medium text-neutral-500">{helper}</p>
      )}
    </div>
  );
};

export default BaseTextarea;
