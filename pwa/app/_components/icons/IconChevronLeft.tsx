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
      <g
        id="Icon/chevron-left"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M11.4696737,5.46981903 C11.7624966,5.17671809 12.2370763,5.17671809 12.5298726,5.46979232 C12.8228064,5.76318139 12.8228064,6.23889442 12.5298726,6.53228349 L9.23689923,9.82937868 L9.06045399,10.0060448 L9.23689923,10.1827109 L12.5298992,13.4798328 C12.8112316,13.7715367 12.8071636,14.2402657 12.5177178,14.5300738 C12.2284423,14.8197115 11.7608319,14.82378 11.4665768,14.5392232 L7.46967368,10.5372636 C7.17676655,10.2439013 7.17676655,9.76818826 7.46970036,9.47479919 Z"
          id="Combined-Shape"
          fill="currentColor"
          fillRule="nonzero"
        ></path>
      </g>
    </svg>
  );
};

export default Icon;
