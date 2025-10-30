import React from 'react';

interface IconHamburgerProps {
  active: boolean;
  className?: string;
  id?: number | string;
}

const IconHamburger: React.FC<IconHamburgerProps> = ({
  active,
  className,
  id,
}) => {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id={`icon-hamburger-gradient-${id}`}
          x1="0%"
          x2="100%"
          y1="50%"
          y2="50%"
        >
          <stop offset="0%" stopColor="#EE7056" />
          <stop offset="51.336%" stopColor="#ED6655" />
          <stop offset="100%" stopColor="#FBAA58" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          opacity={active ? 1 : 0}
          d="M2,4.75 C2,4.33578644 2.33578644,4 2.75,4 L17.25,4 C17.6642136,4 18,4.33578644 18,4.75 C18,5.16421356 17.6642136,5.5 17.25,5.5 L2.75,5.5 C2.33578644,5.5 2,5.16421356 2,4.75 Z M2,10 C2,9.58578644 2.33578644,9.25 2.75,9.25 L17.25,9.25 C17.6642136,9.25 18,9.58578644 18,10 C18,10.4142136 17.6642136,10.75 17.25,10.75 L2.75,10.75 C2.33578644,10.75 2,10.4142136 2,10 Z M2,15.25 C2,14.8357864 2.33578644,14.5 2.75,14.5 L17.25,14.5 C17.6642136,14.5 18,14.8357864 18,15.25 C18,15.6642136 17.6642136,16 17.25,16 L2.75,16 C2.33578644,16 2,15.6642136 2,15.25 Z"
          fill={`url(#icon-hamburger-gradient-${id})`}
          fillRule="nonzero"
          className="duration-250 transition-opacity"
        />
        <path
          opacity={active ? 0 : 1}
          d="M2,4.75 C2,4.33578644 2.33578644,4 2.75,4 L17.25,4 C17.6642136,4 18,4.33578644 18,4.75 C18,5.16421356 17.6642136,5.5 17.25,5.5 L2.75,5.5 C2.33578644,5.5 2,5.16421356 2,4.75 Z M2,10 C2,9.58578644 2.33578644,9.25 2.75,9.25 L17.25,9.25 C17.6642136,9.25 18,9.58578644 18,10 C18,10.4142136 17.6642136,10.75 17.25,10.75 L2.75,10.75 C2.33578644,10.75 2,10.4142136 2,10 Z M2,15.25 C2,14.8357864 2.33578644,14.5 2.75,14.5 L17.25,14.5 C17.6642136,14.5 18,14.8357864 18,15.25 C18,15.6642136 17.6642136,16 17.25,16 L2.75,16 C2.33578644,16 2,15.6642136 2,15.25 Z"
          fill="#97A5B0"
          fillRule="nonzero"
          className="duration-250 transition-opacity"
        />
      </g>
    </svg>
  );
};

export default IconHamburger;
