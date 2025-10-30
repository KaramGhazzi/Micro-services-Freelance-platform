import React, { useContext, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import BaseInput from '@/app/_components/BaseInput';
import IconSearch from '@/app/_components/icons/IconSearch';
import FeatureFlagContext from '@/app/(dashboard)/_context/FeatureFlagContext';
import { useVerificationSearchCompaniesQuery } from '@/graphql/queries/verification/searchCompanies.generated';
import { VerificationCountryCodes } from '@/graphql/types';

import BaseAlert from '@/app/_components/BaseAlert';

interface CocNumberFormNLProps {
  onSelect: (result: any) => void;
}

const CocNumberSearchNL: React.FC<CocNumberFormNLProps> = ({ onSelect }) => {
  const global = useTranslations('global');
  const t = useTranslations('complete');

  const { cocEnabled } = useContext(FeatureFlagContext);
  const [search, setSearch] = useState('');
  const [waitTimeout, setWaitTimeout] = useState<any>(null);
  const [results, setResults] = useState<any>([]);

  const { refetch: refetchSearchCompanies } =
    useVerificationSearchCompaniesQuery({
      skip: true,
    });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target?.value);
  };

  useEffect(() => {
    if (waitTimeout) {
      clearInterval(waitTimeout);
    }

    setWaitTimeout(
      setTimeout(() => {
        searchCompanies();
      }, 250)
    );
  }, [search]);

  const searchCompanies = async () => {
    setWaitTimeout(null);

    if (search.length < 3) {
      setResults([]);
      return;
    }

    const { data } = await refetchSearchCompanies({
      countryCode: 'NL' as VerificationCountryCodes,
      query: search,
      pageSize: 10,
    });

    setResults(data?.verificationSearchCompanies ?? []);
  };

  const handleClickResult = async (result: any) => {
    onSelect(result);
    setSearch('');
    setResults([]);
  };

  return (
    <div className="relative">
      <BaseInput
        label={t('labelSearch')}
        placeholder={t('placeholderSearch')}
        name="search"
        value={search}
        onChange={handleInputChange}
        type="text"
        icon={<IconSearch className="text-neutral-600" />}
        autofocus
      />

      <div className="mt-6">
        <BaseAlert
          title={global('cocServiceUnavailableTitle')}
          text={global('cocServiceUnavailableText')}
          theme="warning"
          alertDisabled={cocEnabled}
        />
      </div>

      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-[224px] overflow-hidden overflow-y-auto rounded-xl border border-neutral-100 bg-white shadow-md">
          <ul>
            {results.map((result: any, index: number) => (
              <li
                key={result.identificationNumber + index}
                className="cursor-pointer border-b border-b-neutral-100 p-4 text-sm transition-all hover:bg-neutral-50"
                onClick={() => handleClickResult(result)}
              >
                <h3 className="font-medium text-neutral-900">{result.name}</h3>
                <p className="text-neutral-700">
                  {result.identificationNumber}
                </p>
                {result?.address && result?.city && (
                  <p className="text-neutral-700">{`${result.address}, ${result.city}`}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CocNumberSearchNL;
