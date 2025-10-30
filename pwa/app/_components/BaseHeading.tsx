import React, { ReactNode } from 'react';

type HeadingProps = {
  size?: 'base' | 'lg' | 'xl' | '2xl';
  type?: 'h1' | 'h2' | 'h3';
  children: ReactNode;
};

const Heading: React.FC<HeadingProps> = ({
  size = 'lg',
  type = 'h3',
  children,
}) => {
  const HeadingTag = type;

  let className;
  switch (size) {
    case 'base':
      className =
        'text-base font-bold font-heading tracking-tight text-neutral-900';
      break;
    case 'lg':
      className =
        'text-lg font-semibold font-heading tracking-tight text-neutral-900';
      break;
    case 'xl':
      className =
        'text-xl font-bold font-heading tracking-tight text-neutral-900';
      break;
    case '2xl':
      className =
        'text-2xl font-bold font-heading tracking-tight text-neutral-900';
      break;
    default:
      className = 'text-base';
      break;
  }

  return <HeadingTag className={className}>{children}</HeadingTag>;
};

export default Heading;
