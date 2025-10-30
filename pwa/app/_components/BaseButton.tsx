import Link from 'next/link';
import classNames from 'classnames';
import React from 'react';
import IconLoader from './icons/IconLoader';

type Props = {
  disabled?: boolean;
  href?: string;
  wide?: boolean;
  square?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'tertiary' | 'warning';
  loading?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const Button: React.FC<Props> = ({
  disabled,
  href,
  onClick,
  children,
  wide,
  type,
  square,
  theme = 'primary',
  size = 'lg',
  loading,
}) => {
  const buttonClass = classNames(
    'relative inline-flex justify-center items-center font-semibold rounded-lg relative text-sm transition-all',
    disabled ? 'opacity-50 pointer-events-none' : '',
    wide ? 'w-full' : 'w-auto',
    square ? '!px-0 justify-center shrink-0' : 'w-auto',
    square && size === 'lg' ? '!w-12' : '',
    square && size === 'md' ? '!w-10' : '',
    {
      'bg-gradient-to-b from-primary-500 to-primary-700 text-white before:absolute before:transition-all  before:rounded-lg before:inset-px before:bg-primary-600 hover:before:bg-primary-500 shadow-sm':
        theme === 'primary',
      'bg-white border border-neutral-200 text-neutral-900 hover:bg-neutral-50 shadow-sm':
        theme === 'secondary',
      'bg-white border border-neutral-200 text-red-600 hover:bg-neutral-50 shadow-sm':
        theme === 'warning',
      'bg-transparent text-neutral-300 hover:text-neutral-900 shadow-none':
        theme === 'tertiary',
    },
    loading ? 'text-opacity-0 pointer-events-none' : '',
    {
      'h-4 px-4': size === 'xs',
      'h-8 px-4': size === 'sm',
      'h-10 px-5': size === 'md',
      'h-12 px-6': size === 'lg',
    }
  );

  const loaderClass = `absolute inset-0 flex items-center justify-center text-opacity-100 ${
    theme === 'primary' ? 'text-white' : 'text-neutral-400'
  }`;

  if (href) {
    return (
      <Link href={href} className={buttonClass} onClick={onClick}>
        <span className="relative flex items-center gap-1 whitespace-nowrap">
          {children}{' '}
          {loading && (
            <span className={loaderClass}>
              <IconLoader className="animate-spin" />
            </span>
          )}
        </span>
      </Link>
    );
  }

  return (
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      className={buttonClass}
    >
      <span className="relative flex items-center gap-1 whitespace-nowrap">
        {children}{' '}
        {loading && (
          <span className={loaderClass}>
            <IconLoader className="animate-spin" />
          </span>
        )}
      </span>
    </button>
  );
};

export default Button;
