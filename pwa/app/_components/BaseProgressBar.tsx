import React from 'react';

interface ProgressBarProps {
  currentValue: number;
  maxValue: number;
}

const ProgressBar = ({ currentValue, maxValue }: ProgressBarProps) => {
  let formattedPercentage = 0;

  // Prevent values above 100
  if (currentValue > maxValue) {
    formattedPercentage = 100;
  }

  // Prevent negative values
  if (currentValue < 0) {
    formattedPercentage = 0;
  }

  // Calculate percentage
  if (currentValue >= 0 && currentValue <= maxValue) {
    formattedPercentage = (100 * currentValue) / maxValue;
  }

  return (
    <div className="relative w-full">
      <span className="relative z-0 block h-[8px] w-full rounded bg-neutral-50" />
      <div
        className="z-1 absolute left-0 top-0 h-[8px] rounded bg-gradient-to-r from-[#EE7056] via-[#ED6655] to-[#FBAA58]"
        style={{ width: formattedPercentage + '%' }}
      />
    </div>
  );
};

export default ProgressBar;
