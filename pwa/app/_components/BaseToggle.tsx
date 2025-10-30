import classNames from 'classnames';
import React, { KeyboardEvent, useRef } from 'react';
import IconCheckmarkSm from './icons/IconCheckmarkSm';
import IconXSm from './icons/IconXSm';

interface Props {
  label: string;
  checked: boolean;
  name: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  withBackgroundColor?: boolean;
  disabled?: boolean;
}

const BaseToggle: React.FC<Props> = ({
  label,
  checked,
  name,
  required,
  onChange,
  withBackgroundColor,
  disabled,
}) => {
  const input = useRef<HTMLInputElement>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    if (!input.current) return;

    if (e.code === 'Space') {
      input.current.click();
    }
  };

  return (
    <div>
      <label
        className={classNames({
          'relative inline-flex w-full cursor-pointer gap-4 rounded-xl py-2 text-sm font-medium':
            true,
          'bg-secondary-50 px-2': checked && withBackgroundColor,
          'bg-neutral-50 px-2': !checked && withBackgroundColor,
        })}
      >
        <input
          ref={input}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
          className="invisible absolute"
          disabled={disabled}
        />
        <div
          tabIndex={0}
          onKeyDown={onKeyDown}
          className={classNames({
            'relative flex h-5 w-10 shrink-0 items-center justify-center rounded-full transition-all':
              true,
            'bg-secondary-500': checked && !disabled,
            'bg-neutral-200 hover:bg-neutral-300': !checked || disabled,
          })}
        >
          <span
            className={classNames({
              'absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-all':
                true,
              'translate-x-5': checked,
            })}
          >
            <IconCheckmarkSm
              className={classNames({
                'absolute -left-0.5 -top-0.5 h-5 w-5 transition-all': true,
                'text-secondary-500': !disabled,
                '-rotate-90 opacity-0': !checked,
              })}
            />
            <IconXSm
              className={classNames({
                'absolute -left-0.5 -top-0.5 h-5 w-5 text-neutral-300 transition-all':
                  true,
                'rotate-90 opacity-0': checked,
              })}
            />
          </span>
        </div>
        <div
          className={classNames({
            'transition-all': true,
            'text-neutral-700': !checked,
            'text-neutral-900': checked && withBackgroundColor,
          })}
        >
          {label}
        </div>
      </label>
    </div>
  );
};

export default BaseToggle;
