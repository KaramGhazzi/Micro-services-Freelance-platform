import classNames from 'classnames';
import React from 'react';
import { useTranslations } from 'next-intl';
import BaseSelect from './BaseSelect';
import IconChevronLeft from '@/app/_components/icons/IconChevronLeft';
import IconChevronLeftStop from '@/app/_components/icons/IconChevronLeftStop';
import IconChevronRight from '@/app/_components/icons/IconChevronRight';
import IconChevronRightStop from '@/app/_components/icons/IconChevronRightStop';

type Props = {
  currentPage: number;
  numberOfPages: number;
  resultsPerPage?: number;
  resultsPerPageOptions?: number[];
  onPageChange: (pageNumber: number) => any;
  onResultsPerPageChange: (pageNumber: number) => any;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  numberOfPages,
  resultsPerPage = 12,
  resultsPerPageOptions = [12, 24, 36],
  onPageChange,
  onResultsPerPageChange,
}) => {
  const t = useTranslations('global');

  const displayedPageNumbers = () => {
    switch (currentPage) {
      case 1:
      case 2:
      case 3:
        if (numberOfPages <= 3) {
          return Array.from({ length: numberOfPages }, (_, i) => i + 1);
        } else {
          if (numberOfPages === 4) {
            return [1, 2, 3, 4];
          }
          return [1, 2, 3, '...', numberOfPages].filter(
            (n) => (typeof n === 'number' && n <= numberOfPages) || n === '...'
          );
        }
      case numberOfPages:
      case numberOfPages - 1:
        return [
          numberOfPages - 4,
          numberOfPages - 3,
          numberOfPages - 2,
          numberOfPages - 1,
          numberOfPages,
        ].filter((n) => typeof n === 'number' && n > 0);
      default:
        return [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          numberOfPages,
        ].filter(
          (n) =>
            (typeof n === 'number' && n > 0) ||
            (currentPage !== numberOfPages - 2 && n === '...')
        );
    }
  };

  const setCurrentPage = (pageNumber: any) => {
    onPageChange(pageNumber);
  };

  const setResultsPerPage = (e: any) => {
    const { value } = e.target;
    onResultsPerPageChange(value);
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-y-4 md:flex-row">
      {/* Results per page */}
      <div className="hidden items-center gap-x-2 text-sm lg:flex">
        <div className="font-medium text-neutral-700">
          {t('resultsPerPage')}
        </div>
        <div className="w-[72px]">
          <BaseSelect
            name="resultsPerPage"
            value={resultsPerPage}
            onChange={setResultsPerPage}
            required
            selectSize="sm"
          >
            {resultsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </BaseSelect>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex h-10 items-center rounded-lg border border-neutral-200 bg-white">
        {/* Go to first page */}
        <div
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(1);
            }
          }}
          className={classNames({
            'relative flex h-10 w-9 items-center justify-center ': true,
            'text-neutral-900 hover:cursor-pointer': currentPage !== 1,
            'text-neutral-300': currentPage === 1,
          })}
        >
          <IconChevronLeftStop />
          <i className="absolute right-0 h-5 w-px bg-neutral-100"></i>
        </div>

        {/* Go to previous page */}
        <div
          onClick={() => {
            if (currentPage - 1 >= 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          className={classNames({
            'relative flex h-10 w-9 items-center justify-center ': true,
            'text-neutral-900 hover:cursor-pointer': currentPage !== 1,
            'text-neutral-300': currentPage === 1,
          })}
        >
          <IconChevronLeft />
          <i
            className={classNames({
              'absolute right-0 h-5 w-px bg-neutral-100': true,
              hidden: currentPage === 1,
            })}
          ></i>
        </div>

        {/* Page numbers */}
        {displayedPageNumbers().map((pageNumber, index) => (
          <div
            onClick={() => {
              if (typeof pageNumber === 'number') {
                setCurrentPage(pageNumber);
              }
            }}
            key={index}
            className={classNames({
              'relative flex items-center justify-center text-sm': true,
              'h-full w-10 bg-neutral-100 font-semibold text-neutral-900':
                pageNumber === currentPage,
              'h-10 w-10 font-medium text-neutral-500 hover:cursor-pointer':
                pageNumber !== currentPage,
              'font-semibold text-neutral-900': pageNumber === '...',
            })}
          >
            {pageNumber}
            <i
              className={classNames({
                'absolute right-0 h-5 w-px bg-neutral-100': true,
                hidden:
                  typeof pageNumber === 'number' &&
                  pageNumber + 1 === currentPage,
              })}
            ></i>
          </div>
        ))}

        {/* Goto next page */}
        <div
          onClick={() => {
            if (currentPage + 1 <= numberOfPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
          className={classNames({
            'relative flex h-8 w-9 items-center justify-center ': true,
            'text-neutral-900 hover:cursor-pointer':
              currentPage !== numberOfPages,
            'text-neutral-300': currentPage === numberOfPages,
          })}
        >
          <IconChevronRight />
          <i className="absolute right-0 h-5 w-px bg-neutral-100"></i>
        </div>

        {/* Go to last page */}
        <div
          onClick={() => {
            if (currentPage !== numberOfPages) {
              setCurrentPage(numberOfPages);
            }
          }}
          className={classNames({
            'relative flex h-8 w-9 items-center justify-center ': true,
            'text-neutral-900 hover:cursor-pointer':
              currentPage !== numberOfPages,
            'text-neutral-300': currentPage === numberOfPages,
          })}
        >
          <IconChevronRightStop />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
