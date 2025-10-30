import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Component: React.FC<Props> = ({ children }) => {
  return (
    <section className="px-5 py-8  lg:p-10">
      <div className="grid max-w-4xl gap-8">{children}</div>
    </section>
  );
};

export default Component;
