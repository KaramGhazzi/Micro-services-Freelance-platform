import React from 'react';

interface Props {
  className?: string;
}

const IconCheckmarkSm = (props: Props) => {
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
        d="M14.7069519,6.79278645 C15.0976827,7.18328631 15.0976827,7.8162866 14.7068778,8.20686045 L9.69978632,13.2068019 C9.3089497,13.5971716 8.67538365,13.5971652 8.28459021,13.2068386 L6.27787333,11.2036457 C5.90102285,10.813738 5.90772411,10.1900548 6.29315522,9.80496788 C6.67923433,9.41923353 7.30349768,9.41381479 7.69921817,9.79572196 L8.99160088,11.0849916 L13.2917022,6.79277231 C13.6825289,6.4024126 14.3160949,6.40239643 14.7069519,6.79278645 Z"
      />
    </svg>
  );
};

export default IconCheckmarkSm;
