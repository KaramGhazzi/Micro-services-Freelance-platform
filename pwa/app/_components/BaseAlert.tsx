'use client';

import React from 'react';
import classNames from 'classnames';
import IconCheckmarkCircleFill from '@/app/_components/icons/IconCheckmarkCircleFill';
import IconExclamationMarkCircleFill from '@/app/_components/icons/IconExclamationMarkCircleFill';

type Props = {
  title: string;
  text?: string;
  theme?: 'neutral' | 'success' | 'warning' | 'error';
  alertDisabled?: boolean;
};

const BaseAlert = ({
  title,
  text,
  theme = 'neutral',
  alertDisabled = false,
}: Props) => {
  if (alertDisabled) {
    return null;
  }

  const classes = classNames('flex p-4 rounded-lg text-sm gap-3', {
    'bg-neutral-50 text-neutral-900': theme === 'neutral',
    'bg-success-50 text-success-900': theme === 'success',
    'bg-warning-50 text-warning-900': theme === 'warning',
    'bg-error-50 text-error-900': theme === 'error',
  });

  return (
    <div className={classes}>
      {theme === 'success' && (
        <IconCheckmarkCircleFill className="text-success-500 shrink-0" />
      )}
      {theme === 'warning' && (
        <IconExclamationMarkCircleFill className="text-warning-500 shrink-0" />
      )}
      <span className="grow">
        <p className="font-semibold">{title}</p>
        {text && <p className="opacity-70">{text}</p>}
      </span>
    </div>
  );
};

export default BaseAlert;
