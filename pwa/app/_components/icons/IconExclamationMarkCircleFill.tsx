import React from 'react';

interface Props {
  className?: string;
}

const IconExclamationMarkCircleFill = (props: Props) => {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        fill="currentColor"
        d="M10,2 C14.418278,2 18,5.581722 18,10 C18,14.418278 14.418278,18 10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 Z M10,13 C9.44771525,13 9,13.4477153 9,14 C9,14.5522847 9.44771525,15 10,15 C10.5522847,15 11,14.5522847 11,14 C11,13.4477153 10.5522847,13 10,13 Z M10,5 C9.44771525,5 9,5.44771525 9,6 L9,10 C9,10.5522847 9.44771525,11 10,11 C10.5522847,11 11,10.5522847 11,10 L11,6 C11,5.44771525 10.5522847,5 10,5 Z"
      />
    </svg>
  );
};

export default IconExclamationMarkCircleFill;
