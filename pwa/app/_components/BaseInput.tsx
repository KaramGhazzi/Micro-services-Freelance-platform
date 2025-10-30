import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  InputHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import BaseTippy from './BaseTippy';
import IconQuestionmarkCircleFill from './icons/IconQuestionmarkCircleFill';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  append?: string;
  prepend?: string;
  helper?: string;
  error?: string;
  value: any;
  autofocus?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name: string;
  disabled?: boolean;
  icon?: any;
  tooltip?: string;
  pattern?: string;
}

const BaseInput: FC<Props> = ({
  label,
  placeholder,
  helper,
  error,
  value,
  onChange,
  onBlur,
  type,
  lang = 'nl-NL',
  autoFocus,
  prepend,
  append,
  name,
  disabled,
  icon,
  tooltip,
  pattern,
}) => {
  return (
    <div className="grid gap-2">
      {label && (
        <div className="flex gap-2">
          {label && (
            <label
              className="block text-sm font-medium text-neutral-700"
              htmlFor={label}
            >
              {label}
            </label>
          )}
          {tooltip && (
            <BaseTippy trigger="click" content={<span>{tooltip}</span>}>
              <div>
                <IconQuestionmarkCircleFill className="text-secondary-500 cursor-pointer" />
              </div>
            </BaseTippy>
          )}
        </div>
      )}

      <div className="flex">
        {prepend && (
          <div className="flex items-center whitespace-nowrap rounded-l-lg border border-r-0 border-neutral-200 bg-neutral-50 px-3 text-sm font-medium text-neutral-600 shadow-sm">
            {prepend}
          </div>
        )}
        <div className="relative w-full">
          {icon && (
            <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2">
              {icon}
            </div>
          )}
          <input
            id={label ?? ''}
            type={type}
            name={name}
            pattern={pattern}
            formNoValidate
            placeholder={placeholder}
            value={value || ''}
            autoFocus={autoFocus}
            disabled={disabled}
            lang={lang}
            onChange={onChange}
            onBlur={onBlur}
            className={classNames({
              'ring-secondary-500/20 focus:border-secondary-300 z-10 block flex h-12 w-full appearance-none items-center rounded-none border bg-white px-4 text-sm font-medium font-normal text-neutral-900 placeholder-neutral-300 shadow-sm outline-none transition-all focus:ring-2 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-500':
                true,
              'border-error-500': error,
              'border-neutral-200': !error,
              'border-neutral-300': value?.length > 0 && !error,
              'rounded-l-lg': !prepend,
              'rounded-r-lg': !append,
              '!pl-10': icon,
            })}
          />
        </div>
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
