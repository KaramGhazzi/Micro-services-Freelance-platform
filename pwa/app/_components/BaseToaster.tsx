import React, { useState } from 'react';
import classNames from 'classnames';
import IconCheckmarkCircleFill from './icons/IconCheckmarkCircleFill';
import IconXMd from './icons/IconXMd';

type Props = {
  children: React.ReactNode;
  theme?: 'neutral' | 'success' | 'error';
  onClose?: () => void;
};

const Toaster: React.FC<Props> = ({ children, theme = 'neutral', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const classes = classNames(
    'flex gap-2 px-5 py-3 text-sm font-semibold lg:px-10',
    {
      'bg-neutral-200 text-neutral-900': theme === 'neutral',
      'bg-success-200 text-success-900': theme === 'success',
      'bg-error-100 text-error-900': theme === 'error',
      hidden: !isVisible,
    }
  );

  const handleCloseToaster = () => {
    if (onClose) {
      onClose();
    }
    setIsVisible(false);
  };

  return (
    <div className={classes}>
      {theme === 'success' && (
        <IconCheckmarkCircleFill className="text-success-500" />
      )}
      <span className="grow">{children}</span>
      <button onClick={() => handleCloseToaster()}>
        <IconXMd />
      </button>
    </div>
  );
};

export default Toaster;
