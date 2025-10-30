/* eslint-disable react/jsx-no-undef */
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getImageUrl } from '../../_utils/getImageUrl';
import SkeletonCard from './_components/SkeletonCard';
import SearchToolbar from './_components/SearchToolbar';
import AssignmentLogo from './_components/AssignmentLogo';
import BasePagination from '@/app/_components/BasePagination';
import BaseToaster from '@/app/_components/BaseToaster';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import BaseDropdown from '@/app/_components/BaseDropdown';
import IconArrowRight from '@/app/_components/icons/IconArrowRight';
import IconClock from '@/app/_components/icons/IconClock';
import IconEye from '@/app/_components/icons/IconEye';
import IconChatBubble from '@/app/_components/icons/IconChatBubble';
import { useSearchQuery } from '@/graphql/queries/search/search.generated';
import { CompanyType, SearchQueryInput } from '@/graphql/types';
import BaseEmptyState from '@/app/_components/BaseEmptyState';
import BaseFavoriteButton from '@/app/_components/BaseFavoriteButton';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';
import IconMyResponses from '@/app/_components/icons/IconMyResponses';
import IconBuilding from '@/app/_components/icons/IconBuilding';
import IconPin from '@/app/_components/icons/IconPin';
import IconSortLines from '@/app/_components/icons/IconSortLines';
import {
  useFilterStorage,
  useFilterStorageAsState,
} from '@/app/_hooks/useFilterStorage';
import { useAuth } from '@/app/_hooks/useAuth';

export default function MyAssignments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const toaster = searchParams.get('toaster');
  const { currentCompany } = useAuth();
  const filterStorage = useFilterStorage('/opdracht-vinden/zoeken', {
    savedSearchId: 0,
  });

  const [filters, setFilters] = useFilterStorageAsState(filterStorage, {
    showFavorites: false,
  });

  const currentPage: number = Number(searchParams.get('pagina')) || 1;
  const resultsPerPage: number = Number(searchParams.get('resultaten')) || 12;

  const [searchQuery, setSearchQuery] = useState<SearchQueryInput>();
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const getDefaultSortMethod = (
    query?: SearchQueryInput,
    hasSavedSearch?: boolean
  ) => {
    if (
      hasSavedSearch ||
      searchParams.get('zoekopdracht') ||
      filterStorage.get('savedSearchId')
    )
      return 'newest';

    if (!query) return 'relevance';

    return query.expertises?.length ||
      query.hoursFrom ||
      query.hoursTo ||
      query.locations?.length ||
      query.noMatchingIntermediaries ||
      query.onLocation ||
      query.searchTags?.length
      ? 'relevance'
      : 'newest';
  };

  const [userSetSortMethod, setUserSetSortMethod] = useState(false);
  const [sortMethod, setSortMethod] = useState<string>(() =>
    getDefaultSortMethod(searchQuery)
  );

  let companyType: CompanyType | undefined;

  if (currentCompany) {
    companyType = currentCompany.type;
  } else {
    companyType = CompanyType.Freelancer;
  }

  useEffect(() => {
    if (searchQuery) {
      executeSearch({
        offset: (currentPage - 1) * resultsPerPage,
        limit: resultsPerPage,
        query: searchQuery,
        showFavoritesOnly: filters.showFavorites,
        sortMethod,
      });
    }
  }, [filters.showFavorites, sortMethod]);

  let {
    data,
    loading,
    refetch: executeSearch,
  } = useSearchQuery({
    variables: {
      showFavoritesOnly: filters.showFavorites,
      offset: (currentPage - 1) * resultsPerPage,
      limit: resultsPerPage,
      query: {
        searchTags: [],
        noMatchingIntermediaries: false,
        onLocation: false,
      },
      sortMethod,
    },
  });

  useEffect(() => {
    if (data && data.search && data.search.results) {
      const initialFavorites = data.search.results.reduce(
        (acc: { [key: number]: boolean }, searchResult) => {
          acc[Number(searchResult.assignment.id)] =
            searchResult.assignment.isFavorite;
          return acc;
        },
        {}
      );
      setFavorites(initialFavorites);
    }
  }, [data]);

  const getTotalPages = () => {
    if (data) {
      return data?.search?.count > 0
        ? Math.ceil(data?.search?.count / resultsPerPage)
        : 1;
    }

    return 1;
  };

  const handleSearch = (query: SearchQueryInput, hasSavedSearch: boolean) => {
    setSearchQuery(query);

    let usedSortMethod = sortMethod;
    if (!userSetSortMethod) {
      usedSortMethod = getDefaultSortMethod(query, hasSavedSearch);
      setSortMethod(usedSortMethod);
    }

    executeSearch({
      offset: (currentPage - 1) * resultsPerPage,
      limit: resultsPerPage,
      query,
      showFavoritesOnly: filters.showFavorites,
      sortMethod: usedSortMethod,
    });
  };

  const numberOfPages: number = getTotalPages();

  const handlePageChange = (pageNumber: any) => {
    router.push(
      `/opdracht-vinden/zoeken?pagina=${pageNumber}&resultaten=${resultsPerPage}`
    );
  };

  const handleResultsPerPageChange = (resultsPerPage: any) => {
    router.push(
      `/opdracht-vinden/zoeken?pagina=1&resultaten=${resultsPerPage}`
    );
  };

  const handleShowFavoritesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      showFavorites: checked,
    }));
    executeSearch();
  };

  const handleFavoriteToggle = (assignmentId: number) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [assignmentId]: !prevFavorites[assignmentId],
    }));
  };

  const handleSortMethodChange = (sortMethod: string) => {
    setUserSetSortMethod(true);
    setSortMethod(sortMethod);
  };

  return (
    <>
      <SearchToolbar count={data?.search.count} onSearch={handleSearch} />
      {toaster && (
        <BaseToaster theme="success">
          {t(`assignment.toaster.${toaster}`)}
        </BaseToaster>
      )}
      <section className="lg:px-10 lg:pt-6">
        <div className="relative m-5 flex items-center lg:mx-0 lg:mt-0">
          <BaseCheckbox
            label={t('assignment.toolbar.showFavorites')}
            name="showFavorites"
            checked={filters.showFavorites}
            onChange={handleShowFavoritesChange}
          />
          <div className="flex grow" />
          <BaseDropdown
            selected={sortMethod}
            onChange={handleSortMethodChange}
            options={[
              {
                label: t('assignment.toolbar.sort.relevance'),
                value: 'relevance',
              },
              {
                label: t('assignment.toolbar.sort.newest'),
                value: 'newest',
              },
              {
                label: t('assignment.toolbar.sort.oldest'),
                value: 'oldest',
              },
            ]}
            icon={<IconSortLines />}
          />
        </div>
        {!loading && data?.search?.count === 0 && (
          <BaseEmptyState
            imageUrl="/illustration/search-results.svg"
            title={t(`emptyState.search.title`)}
            description={t(`emptyState.search.description`)}
          />
        )}
        <div className="grid gap-1 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
          {loading && !data?.search?.results && (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
          {data?.search?.results.map((search, index) => {
            const { assignment } = search;

            return (
              <Link
                key={index}
                className={`hover:pointer-cursor group relative flex transform-gpu flex-col gap-4 border border-transparent bg-white px-5 py-5 transition-all hover:border-neutral-300 lg:rounded-2xl lg:p-8 lg:py-8 ${
                  assignment?.isRead
                    ? 'border-neutral-100 opacity-60'
                    : 'shadow-sm'
                }`}
                href={`/opdracht-vinden/opdracht/${search.assignment.id}`}
              >
                <header className="flex grow flex-col gap-3">
                  {companyType && assignment?.type && (
                    <div className="flex justify-between gap-3">
                      <AssignmentLogo
                        assignmentCompanyLogo={getImageUrl(
                          assignment.company.logoImageFile?.container,
                          assignment.company.logoImageFile?.blobName
                        )}
                        assignmentDescriptionIsVisible={
                          assignment?.descriptionIsVisible
                        }
                        assignmentType={assignment?.type}
                        assignmentIsRead={assignment?.isRead}
                        companyType={companyType}
                      />
                      <div className="flex items-start justify-between gap-4">
                        {(assignment.replied && (
                          <span className="flex items-center gap-1 text-xs font-medium text-neutral-400">
                            <IconMyResponses className="w-3.5" active={false} />
                            {t('assignment.detail.replied')}
                          </span>
                        )) ||
                          (assignment?.isRead && (
                            <span className="flex items-center gap-1 text-xs font-medium text-neutral-400">
                              <IconCheckmarkMd />
                              {t('assignment.detail.viewed')}
                            </span>
                          ))}
                        <BaseFavoriteButton
                          key={assignment.id + assignment.isFavorite}
                          assignmentId={Number(assignment.id)}
                          isActive={
                            favorites[Number(assignment.id)] ??
                            assignment.isFavorite
                          }
                          setIsActive={() =>
                            handleFavoriteToggle(Number(assignment.id))
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div className="line-clamp-2">
                    <h2
                      className={`font-heading text-base tracking-tight text-neutral-900 ${
                        assignment?.isRead ? 'font-medium' : 'font-bold'
                      }`}
                    >
                      {assignment.title}
                    </h2>
                  </div>
                </header>
                <ul className="grid gap-2">
                  <li className="flex gap-2 overflow-hidden text-sm text-neutral-700">
                    <IconBuilding className="shrink-0 text-neutral-400" />
                    <span className="truncate">
                      {assignment.descriptionIsVisible
                        ? assignment?.company?.name
                        : t('assignment.detail.proAssignment')}
                    </span>
                  </li>
                  <li className="flex gap-2 overflow-hidden text-sm text-neutral-700">
                    <IconPin className="shrink-0 text-neutral-400" />
                    <span className="truncate">
                      {assignment.place ? assignment.place : '-'}
                    </span>
                  </li>
                  <li className="flex gap-2 text-sm text-neutral-700">
                    <IconEye className="shrink-0 text-neutral-400" />
                    <span>
                      {t('assignment.detail.views', {
                        count: assignment.viewsCount,
                      })}
                    </span>
                  </li>
                  <li className="flex gap-2 text-sm text-neutral-700">
                    <IconChatBubble className="text-neutral-400" />
                    <span>
                      {t('assignment.detail.comments', {
                        count: assignment.commentsCount,
                      })}
                    </span>
                  </li>
                  <li className="flex gap-2 text-sm text-neutral-700">
                    <IconClock className="text-neutral-400" />
                    <span suppressHydrationWarning>
                      {new Intl.DateTimeFormat('nl-NL', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(new Date(assignment.publishAt))}
                    </span>
                  </li>
                </ul>
                <div className="absolute bottom-8 right-8 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                  <IconArrowRight className="text-neutral-900" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {!loading && data?.search?.count !== 0 && (
        <section className="px-5 py-8 lg:p-10">
          <div className="flex w-full items-center justify-between">
            <BasePagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              resultsPerPage={resultsPerPage}
              onPageChange={handlePageChange}
              onResultsPerPageChange={handleResultsPerPageChange}
            />
          </div>
        </section>
      )}
    </>
  );
}
