import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Section: React.FC<Props> = ({ children }) => {
  return (
    <section className="px-5 py-8 lg:p-10">
      <div className="grid max-w-4xl gap-6">{children}</div>
    </section>
  );
};

export default Section;
