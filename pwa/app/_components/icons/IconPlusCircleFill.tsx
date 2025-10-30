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
      <path
        fill="currentColor"
        d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 3.439a.75.75 0 0 0-.75.737V9.25H6.176a.75.75 0 0 0-.004 1.5H9.25v3.083a.75.75 0 1 0 1.5-.005V10.75h3.074a.75.75 0 0 0 .004-1.5H10.75V6.176a.75.75 0 0 0-.75-.737Z"
      />
    </svg>
  );
};

export default Icon;
