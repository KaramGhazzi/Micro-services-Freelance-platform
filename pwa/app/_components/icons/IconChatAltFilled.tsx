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
        fill="currentColor"
        d="M16,7 C17.1045695,7 18,7.8954305 18,9 L18,13 C18,14.1045695 17.1045695,15 16,15 L14,15 L14,18 L11,15 L9,15 C8.661,15 8.342,14.916 8.062,14.767 L9.828,13 L11,13 C13.209139,13 15,11.209139 15,9 L15,7 Z M11,3 C12.1045695,3 13,3.8954305 13,5 L13,9 C13,10.1045695 12.1045695,11 11,11 L9,11 L6,14 L6,11 L4,11 C2.8954305,11 2,10.1045695 2,9 L2,5 C2,3.8954305 2.8954305,3 4,3 L11,3 Z"
      />
    </svg>
  );
};

export default Icon;
