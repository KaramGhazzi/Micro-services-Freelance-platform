'use client';
import { useFormatter, useTranslations } from 'next-intl';
import { RateType } from '@/graphql/types';

type Props = {
  rateType?: RateType | null;
  rateFrom?: number | null;
  rateTo?: number | null;
};

const BaseFormattedRate = ({ rateType, rateFrom, rateTo }: Props) => {
  const format = useFormatter();
  const t = useTranslations('assignment');

  return (
    <span>
      {rateType !== RateType.Agreement && (
        <span>
          {!rateTo && t('application.general.from')}{' '}
          {format.number(rateFrom ?? 0, {
            style: 'currency',
            currency: 'EUR',
          })}
          {rateTo && (
            <>
              {' - '}
              {format.number(rateTo ?? 0, {
                style: 'currency',
                currency: 'EUR',
              })}
            </>
          )}{' '}
        </span>
      )}
      <span className="lowercase">
        {t('rateType.options.' + (rateType ?? ''))}
      </span>
    </span>
  );
};

export default BaseFormattedRate;
