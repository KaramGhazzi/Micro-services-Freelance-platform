import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

type Props = {
  imageUrl: string;
  title: string;
  description?: string;
  large?: boolean;
  withMaxWidth?: boolean;
};

const BaseEmptyState: React.FC<Props> = ({
  imageUrl,
  title,
  description,
  large,
  withMaxWidth = true,
}) => {
  return (
    <div
      className={`m-auto my-10 mb-24 flex flex-col items-center px-5 text-center ${
        withMaxWidth ? 'max-w-lg' : ''
      }`}
    >
      <Image
        src={imageUrl}
        width={0}
        height={0}
        sizes="100vw"
        alt=""
        style={{ width: 'auto', height: 'auto' }}
      />
      <h3
        className={classNames({
          'font-heading mt-4 font-bold tracking-tight': true,
          'mb-2 text-xl lg:text-2xl': large,
          'mb-1': !large,
        })}
      >
        {title}
      </h3>
      {description && (
        <p
          className={classNames({
            'text-neutral-500': true,
            'text-sm': !large,
          })}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default BaseEmptyState;
