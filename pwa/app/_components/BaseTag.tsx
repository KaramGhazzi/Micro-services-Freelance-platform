import classNames from 'classnames';
import React from 'react';

type Props = {
  children: React.ReactNode;
  theme?: 'neutral';
};

const Tag: React.FC<Props> = ({ children, theme = 'neutral' }) => {
  const classes = classNames(
    'inline-flex h-8 items-center rounded-md px-2 text-sm font-medium px-3',
    {
      'text-white bg-neutral-700': theme === 'neutral',
    }
  );

  return <div className={classes}>{children}</div>;
};

export default Tag;
