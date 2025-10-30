import React from 'react';

interface Props {
  className?: string;
}

const Icon = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={props.className}
    >
      <path
        d="M17.952 3.25a.95.95 0 0 0-1.201-1.202L2.65 6.75a.95.95 0 0 0-.162 1.731l4.317 2.398a.95.95 0 0 0 1.133-.16l3.07-3.069a.95.95 0 1 1 1.343 1.343l-3.07 3.07a.95.95 0 0 0-.159 1.133l2.399 4.316a.95.95 0 0 0 1.73-.16l4.7-14.102Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Icon;
