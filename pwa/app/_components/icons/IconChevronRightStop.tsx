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
        id="Icon/chevron-right-stop"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M12.969677,5.46981903 C13.2625,5.17671809 13.7370796,5.17671809 14.0298759,5.46979232 C14.3228097,5.76318139 14.3228097,6.23889442 14.0298759,6.53228349 L10.7369026,9.82937868 L10.5604573,10.0060448 L10.7369026,10.1827109 L14.0299026,13.4798328 C14.311235,13.7715367 14.3071669,14.2402657 14.0177211,14.5300738 C13.7284456,14.8197115 13.2608352,14.82378 12.9665801,14.5392232 L8.96967702,10.5372636 C8.67676988,10.2439013 8.67676988,9.76818826 8.96970369,9.47479919 Z M6.5,5.25 C6.91421356,5.25 7.25,5.58578644 7.25,6 L7.25,14 C7.25,14.4142136 6.91421356,14.75 6.5,14.75 C6.08578644,14.75 5.75,14.4142136 5.75,14 L5.75,6 C5.75,5.58578644 6.08578644,5.25 6.5,5.25 Z"
          id="Combined-Shape"
          fill="currentColor"
          fillRule="nonzero"
          transform="translate(9.9998, 10) scale(-1, 1) translate(-9.9998, -10)"
        ></path>
      </g>
    </svg>
  );
};

export default Icon;
