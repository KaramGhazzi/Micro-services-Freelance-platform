import classNames from 'classnames';
import React from 'react';

type Props = {
  children: React.ReactNode;
  theme?: string;
};

const Tag: React.FC<Props> = ({ children, theme = 'neutral' }) => {
  const classes = classNames(
    'inline-flex h-5 items-center rounded-full px-2 text-xs font-semibold overflow-hidden',
    {
      'text-neutral-900 bg-neutral-100': [
        'neutral',
        'CONCEPT',
        'CLOSED',
        'ARCHIVED',
        'PAUSED',
        'QUESTION',
        'INVITED',
      ].includes(theme),
      'text-success-900 bg-success-100': [
        'NEW',
        'PUBLISHED',
        'ACCEPTED',
        'ACTIVE',
        'COMPLETED',
        'paid',
        'success',
      ].includes(theme),
      'text-warning-900 bg-warning-100': [
        'PENDING_REVIEW',
        'IN_REVIEW',
        'PENDING',
        'PROPOSED',
        'PUBLISHING',
        'draft',
        'open',
        'void',
        'warning',
      ].includes(theme),
      'text-error-900 bg-error-100': [
        'DECLINED',
        'error',
        'FAILED',
        'uncollectible',
      ].includes(theme),
      'text-white bg-orange-500': ['FREELANCE'].includes(theme),
    }
  );

  return (
    <div className={classes}>
      <span className="truncate">{children}</span>
    </div>
  );
};

export default Tag;
