import classNames from 'classnames';
import { KeyboardEvent, useRef } from 'react';
import Link from 'next/link';
import IconCheckmarkSm from './icons/IconCheckmarkSm';

interface CheckboxProps {
  label?: string;
  name: string;
  checked: boolean;
  required?: boolean;
  value?: string;
  link?: {
    text: string;
    url: string;
    target?: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaseCheckbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  required,
  link,
  onChange,
  name,
  value,
}) => {
  const input = useRef<HTMLInputElement>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    if (!input.current) return;

    if (e.code === 'Space') {
      input.current.click();
    }
  };

  return (
    <>
      <label className="relative inline-flex cursor-pointer gap-2 text-sm font-medium">
        <input
          ref={input}
          type="checkbox"
          name={name}
          value={value || ''}
          checked={checked ?? false}
          onChange={onChange}
          required={required}
          className="invisible absolute"
        />
        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <span
            onKeyDown={onKeyDown}
            tabIndex={0}
            className={classNames({
              'focus:ring-secondary-500/20 focus:border-secondary-300 h-4 w-4 rounded border shadow-sm outline-none transition-all focus:ring-2':
                true,
              'bg-primary-500 ring-primary-500/20 border-transparent ring-2':
                checked,
              'border-neutral-200 bg-white': !checked,
            })}
          ></span>
          <IconCheckmarkSm
            className={classNames({
              'absolute left-0 top-0 h-full w-full text-white transition-all':
                true,
              'opacity-0': !checked,
            })}
          />
        </div>
        <div
          className={classNames({
            'transition-all': true,
            'text-neutral-900': checked,
            'text-neutral-700': !checked,
          })}
        >
          {label}{' '}
          {link && (
            <Link
              href={link?.url}
              target={link.target ?? '_self'}
              className="text-primary-600 font-medium hover:underline"
            >
              {link?.text}
            </Link>
          )}
        </div>
      </label>
    </>
  );
};

export default BaseCheckbox;
