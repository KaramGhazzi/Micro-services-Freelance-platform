import React from 'react';

interface Props {
  className?: string;
}

const IconLoader = (props: Props) => {
  return (
    <svg
      className={props.className}
      height="20"
      width="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="icon-loader-a"
          x1="9.665%"
          x2="16.33%"
          y1="16.035%"
          y2="50%"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <path
        d="M10,1 C14.9705627,1 19,5.02943725 19,10 C19,14.9705627 14.9705627,19 10,19 C5.02943725,19 1,14.9705627 1,10 C1,9.44771525 1.44771525,9 2,9 C2.55228475,9 3,9.44771525 3,10 C3,13.8659932 6.13400675,17 10,17 C13.8659932,17 17,13.8659932 17,10 C17,6.13400675 13.8659932,3 10,3 C9.44771525,3 9,2.55228475 9,2 C9,1.44771525 9.44771525,1 10,1 Z"
        fill="url(#icon-loader-a)"
        transform="rotate(90 10 10)"
      />
    </svg>
  );
};

export default IconLoader;
