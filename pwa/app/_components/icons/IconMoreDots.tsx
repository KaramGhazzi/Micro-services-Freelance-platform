import React from 'react';

interface IconMoreDotsProps {
  active: boolean;
  id?: number | string;
}

const IconMoreDots: React.FC<IconMoreDotsProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M1.5,3 C2.32842712,3 3,2.32842712 3,1.5 C3,0.671572875 2.32842712,0 1.5,0 C0.671572875,0 0,0.671572875 0,1.5 C0,2.32842712 0.671572875,3 1.5,3 Z M7,3 C7.82842712,3 8.5,2.32842712 8.5,1.5 C8.5,0.671572875 7.82842712,0 7,0 C6.17157288,0 5.5,0.671572875 5.5,1.5 C5.5,2.32842712 6.17157288,3 7,3 Z M12.5,3 C13.3284271,3 14,2.32842712 14,1.5 C14,0.671572875 13.3284271,0 12.5,0 C11.6715729,0 11,0.671572875 11,1.5 C11,2.32842712 11.6715729,3 12.5,3 Z"
        transform="translate(3 8)"
      />
    </svg>
  );
};

export default IconMoreDots;
