import React from 'react';

interface Props {
  className?: string;
}

const IconListDot = (props: Props) => {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <g fill="currentColor">
        <circle id="Oval" cx="10" cy="10" r="3" />
      </g>
    </svg>
  );
};

export default IconListDot;
