import React from 'react';

type Props = {
  children: React.ReactNode;
};

const SectionDivider: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex-grow divide-y-4 divide-neutral-50 border-neutral-100 bg-white xl:border-r">
      {children}
    </div>
  );
};

export default SectionDivider;
