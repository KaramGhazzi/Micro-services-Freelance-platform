import React from 'react';

interface Props {
  className?: string;
}

const Icon = (props: Props) => {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.75 9.9298C12.6006 9.57875 14 7.95279 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 7.95279 7.39935 9.57875 9.25 9.9298V18H10.75V9.9298ZM10 8.5C11.3807 8.5 12.5 7.38071 12.5 6C12.5 4.61929 11.3807 3.5 10 3.5C8.61929 3.5 7.5 4.61929 7.5 6C7.5 7.38071 8.61929 8.5 10 8.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Icon;
