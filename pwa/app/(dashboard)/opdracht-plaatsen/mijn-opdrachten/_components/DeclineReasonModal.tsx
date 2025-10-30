import React from 'react';
import { useTranslations } from 'next-intl';
import { Assignment } from '@/graphql/types';

interface DeclineReasonModalProps {
  assignment?: Assignment;
}

const DeclineReasonModal: React.FC<DeclineReasonModalProps> = ({
  assignment,
}) => {
  const t = useTranslations('assignment');

  return (
    <div>
      <p className="mb-4">
        {t('yourAssignment')}
        <span className=" font-bold"> {assignment?.title} </span>
        {t('declinedBecause')}
      </p>
      <div>{assignment?.currentStatus?.description}</div>
    </div>
  );
};

export default DeclineReasonModal;
