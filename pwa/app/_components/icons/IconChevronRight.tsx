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
        id="Icon/chevron-right"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M7.469647,5.46984574 C7.76249663,5.17671809 8.23707628,5.17671809 8.5299259,5.46984574 L12.5298992,9.4748259 C12.8228064,9.76818826 12.8228064,10.2439013 12.5298726,10.5372904 L8.52989923,14.5422705 C8.23874104,14.82378 7.77113065,14.8197115 7.48185511,14.5300738 C7.1924093,14.2402657 7.18834127,13.7715367 7.47271703,13.4767322 L10.7626737,10.1827109 L10.9391189,10.0060448 L10.7626737,9.82937868 L7.46967368,6.53225678 C7.17676655,6.23889442 7.17676655,5.76318139 7.469647,5.46984574 Z"
          id="Combined-Shape"
          fill="currentColor"
          fillRule="nonzero"
        ></path>
      </g>
    </svg>
  );
};

export default Icon;
