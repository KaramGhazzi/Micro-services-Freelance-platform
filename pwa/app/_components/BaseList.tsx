import React from 'react';

import { useRouter } from 'next/navigation';
import BaseStatus from './BaseStatus';
import BaseUserAvatar from './BaseUserAvatar';

export interface BaseListRow {
  url?: string;
  newTab?: boolean;
  columns: BaseListColumn[] | IconRow[];
}

export interface BaseListColumn {
  type: 'default' | 'date' | 'icon' | 'status' | 'customColumn';
  text?: string;
  children?: any;
  ellipsis?: boolean;
  isBold?: boolean;
  status?: string;
  label?: string;
  imageUrl?: string;
}

export interface IconRow extends BaseListColumn {
  subText?: string;
  imageUrl?: string;
}

export interface BaseListItem {
  headers: string[];
  rows: BaseListRow[];
}

interface Props {
  loading?: boolean;
  baseListItem?: BaseListItem;
  embedded?: boolean;
}

const BaseList = ({ loading, baseListItem: listItem, embedded }: Props) => {
  const router = useRouter();

  const header = (text: string) => {
    return (
      <th
        key={`checkAssignmentsTable-${text}`}
        className={`top-0 z-10 border-b border-neutral-100 bg-white/90 py-2.5 ${
          embedded ? '' : 'first-of-type:pl-5 lg:first-of-type:pl-10'
        } pr-5 text-left font-medium backdrop-blur-sm md:sticky lg:pr-10 `}
      >
        <div className={`whitespace-nowrap`}>{text}</div>
      </th>
    );
  };

  const headerEmptyDefault = (i: number) => {
    return (
      <td key={`headerEmptyDefault-${i}`}>
        <div className="h-2 w-16 rounded-xl bg-neutral-50" />
      </td>
    );
  };

  const headerEmptyIcon = (i: number) => {
    return (
      <td
        key={`headerEmptyIcon-${i}`}
        className="whitespace-nowrap py-4 pl-5 pr-10 md:pl-10"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-neutral-100" />
          <div className="flex flex-col gap-3">
            <div className="h-5 w-40 rounded-xl bg-neutral-100" />
            <div className="h-2 w-16 rounded-xl bg-neutral-50" />
          </div>
        </div>
      </td>
    );
  };

  const columnDefault = (
    text: string | undefined,
    ellipsis?: boolean | undefined,
    isBold?: boolean | undefined
  ) => {
    let className = '';
    if (ellipsis) {
      className = 'text-ellipsis overflow-x-clip max-w-[164px]';
    }

    const key = (Math.random() + 1).toString(36).substring(7);

    return (
      <td
        key={`rowDefault-${key}`}
        className={`whitespace-nowrap py-4 ${
          embedded ? '' : 'first-of-type:pl-10'
        }   pr-10 ${className} ${
          isBold ? 'font-semibold text-neutral-900' : ''
        }`}
      >
        {text}
      </td>
    );
  };

  const columnDate = (date: string | undefined) => {
    if (!date) {
      return columnDefault('');
    }

    const formattedDate = new Intl.DateTimeFormat('nl-NL', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date));

    return columnDefault(formattedDate);
  };

  const columnCustom = (children?: any) => {
    return children;
  };

  const columnIcon = (
    title: string | undefined,
    subtitle: string,
    label?: string,
    imageUrl?: string
  ) => {
    return (
      <td
        key={`rowIcon-${title}`}
        className={`whitespace-nowrap px-5 py-4 ${
          embedded ? '' : 'first-of-type:pl-5 lg:first-of-type:pl-10'
        }  lg:pr-10`}
      >
        <div className="flex items-center gap-4">
          <BaseUserAvatar url={imageUrl} />
          <div className="overflow-hidden">
            <div className="flex items-center gap-1 truncate text-sm font-semibold text-neutral-900">
              <div className="flex max-w-[340px] gap-1 truncate">
                {`${title}`}
                {label && <BaseStatus theme="FREELANCE">{label}</BaseStatus>}
              </div>
            </div>
            <div className="truncate">{subtitle}</div>
          </div>
        </div>
      </td>
    );
  };

  const columnStatus = (
    text: string | undefined,
    status: string | undefined
  ) => {
    return (
      <td
        className={`whitespace-nowrap py-4 pr-10 ${
          embedded ? '' : 'first-of-type:pl-5 lg:first-of-type:pl-10'
        }`}
        key={`status-${text}`}
      >
        <BaseStatus theme={status}>{text}</BaseStatus>
      </td>
    );
  };

  return (
    <table
      className="relative w-full border-collapse bg-white text-sm text-neutral-700"
      cellPadding="0"
    >
      <thead>
        <tr>
          {listItem?.headers?.map((headerText) => {
            return header(headerText);
          })}
        </tr>
      </thead>
      <tbody>
        {loading && (
          <>
            <tr className="bg-white">
              {listItem?.headers?.map((_, index) => {
                if (index === 0) {
                  return headerEmptyIcon(index);
                } else {
                  return headerEmptyDefault(index);
                }
              })}
            </tr>
          </>
        )}

        {!loading &&
          listItem?.rows?.map((listItem, index) => {
            const isClickable = !!listItem?.url;

            const rowClick = (url?: undefined | string, newTab?: boolean) => {
              if (isClickable && url) {
                if (newTab) {
                  window.open(url, '_blank');
                } else {
                  router.push(url);
                }
              }
            };

            return (
              <tr
                onClick={() => rowClick(listItem?.url, listItem.newTab)}
                key={`row-${index}`}
                className={`group border-b border-neutral-100 transition-all hover:bg-neutral-50 ${
                  embedded ? 'last-of-type:border-white' : ''
                } ${isClickable ? 'hover:cursor-pointer' : ''}`}
              >
                {listItem.columns?.map((row) => {
                  switch (row.type) {
                    case 'icon':
                      return columnIcon(
                        row.text,
                        (row as IconRow).subText ?? '',
                        row.label,
                        row.imageUrl
                      );
                    case 'date':
                      return columnDate(row.text);
                    case 'status':
                      return columnStatus(row.text, row.status);
                    case 'customColumn':
                      return columnCustom(row.children);
                    default:
                      return columnDefault(row.text, row.ellipsis, row.isBold);
                  }
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default BaseList;
