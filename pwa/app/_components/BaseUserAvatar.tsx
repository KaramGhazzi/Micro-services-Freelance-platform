import classNames from 'classnames';
import React from 'react';

type Props = {
  url?: string | null;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  contain?: boolean;
};

const BaseUserAvatar: React.FC<Props> = ({ url, size = 'md', contain }) => {
  return (
    <div
      className={classNames({
        'relative flex-shrink-0 overflow-hidden rounded-lg shadow-sm': true,
        'border border-neutral-200 text-neutral-200': size !== '2xs',
        'h-6 w-6': size === '2xs',
        'h-8 w-8': size === 'xs',
        'h-10 w-10': size === 'sm',
        'h-12 w-12': size === 'md',
        'h-16 w-16': size === 'lg',
        'h-20 w-20': size === 'xl',
        'h-24 w-24': size === '2xl',
      })}
    >
      <figure className=" via-11% via-67% absolute inset-0 rounded-lg border border-white bg-neutral-300 bg-gradient-to-tr from-[#F7981D] from-0% via-[#A0C28B] via-[#BFB364] via-[#DBA641] via-45% to-[#6CDBCC] to-100% text-white">
        <i className="group-hover-touch:opacity-100 absolute inset-0 rounded-lg bg-neutral-900/10 opacity-0 transition-opacity" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className="absolute left-0 top-0 h-full w-full transform-gpu"
        >
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M15,12 C16.1045695,12 17,12.8954305 17,14 C17,15.1045695 16.1045695,16 15,16 C13.8954305,16 13,15.1045695 13,14 C13,12.8954305 13.8954305,12 15,12 Z M25,12 C26.1045695,12 27,12.8954305 27,14 C27,15.1045695 26.1045695,16 25,16 C23.8954305,16 23,15.1045695 23,14 C23,12.8954305 23.8954305,12 25,12 Z M10,23.3333333 C16.2777778,26.4444444 20.5277778,28 22.75,28 C24.9722222,28 27.3888889,26 30,22"
          />
        </svg>
        {url && (
          <img
            src={url}
            alt=""
            className={classNames({
              'absolute inset-0 h-full w-full rounded-md bg-white': true,
              'object-contain': contain,
              'object-cover': !contain,
            })}
          />
        )}
      </figure>
    </div>
  );
};

export default BaseUserAvatar;
