import Link from 'next/link';
import classNames from 'classnames';
import React from 'react';
import IconLoader from './icons/IconLoader';

type Props = {
  icon?: any;
  disabled?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  download?: true;
  onClick?: React.MouseEventHandler<HTMLElement>;
  theme?: 'primary' | 'secondary' | 'warning';
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

const Button: React.FC<Props> = ({
  icon,
  disabled,
  href,
  onClick,
  type,
  download,
  theme = 'primary',
  size = 'md',
  loading,
}) => {
  const buttonClass = classNames(
    'relative shadow-sm inline-flex justify-center items-center rounded-lg relative transition-all !w-10 !h-10 !px-0 justify-center shrink-0',
    disabled ? 'opacity-50 pointer-events-none' : '',
    {
      'bg-gradient-to-b from-primary-500 to-primary-700 text-white before:absolute before:transition-all  before:rounded-lg before:inset-px before:bg-primary-600 hover:before:bg-primary-500':
        theme === 'primary',
      'bg-white border border-neutral-200 text-neutral-900 hover:bg-neutral-50':
        theme === 'secondary',
      'bg-white border border-neutral-200 text-red-600 hover:bg-neutral-50':
        theme === 'warning',
    },
    loading ? 'text-opacity-0 pointer-events-none' : '',
    {
      'h-8 px-4': size === 'sm',
      'w-10': size === 'md',
      'h-12 px-6': size === 'lg',
    }
  );

  const renderBaseIconButtonContent = () => {
    return (
      <span className="relative flex items-center gap-1 whitespace-nowrap">
        {icon}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center text-white text-opacity-100">
            <IconLoader className="animate-spin" />
          </span>
        )}
      </span>
    );
  };

  if (href) {
    return (
      <Link href={href} className={buttonClass} download={download}>
        {renderBaseIconButtonContent()}
      </Link>
    );
  }

  return (
    <button type={type ?? 'button'} onClick={onClick} className={buttonClass}>
      {renderBaseIconButtonContent()}
    </button>
  );
};

export default Button;
