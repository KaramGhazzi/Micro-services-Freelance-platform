import React from 'react';

interface Props {
  className?: string;
}

const Icon = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
      viewBox="0 0 20 20"
      className={props.className}
    >
      <g fill="none">
        <path
          d="M17.657 1.593a.75.75 0 0 1 .75.75v5a.75.75 0 1 1-1.5 0v-3.19l-6.498 6.498a.752.752 0 0 1-1.268-.328.75.75 0 0 1 .204-.729l6.501-6.5h-3.19a.75.75 0 0 1 0-1.5h5Z"
          fill="currentColor"
        />
        <path
          d="M16 10.857v3.429c0 .946-.768 1.714-1.714 1.714H5.714A1.714 1.714 0 0 1 4 14.286V5.714C4 4.768 4.768 4 5.714 4h3.429"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Icon;
