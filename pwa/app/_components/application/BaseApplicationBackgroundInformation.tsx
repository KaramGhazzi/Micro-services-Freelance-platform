'use client';

import { useTranslations } from 'next-intl';
import BaseContent from '@/app/_components/BaseContent';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseSection from '@/app/_components/BaseSection';
import { GetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';

type Props = {
  assignmentApplication: GetAssignmentApplicationQuery['assignmentApplication'];
};

const BackgroundInformation = ({ assignmentApplication }: Props) => {
  const t = useTranslations('assignment');

  return (
    <>
      <BaseSection>
        <div className="flex flex-col gap-4 break-words">
          <BaseHeading type="h2" size="lg">
            {t('application.backgroundInformation.title')}
          </BaseHeading>

          <div className="flex items-center gap-x-1">
            {assignmentApplication?.background &&
              assignmentApplication?.background?.length > 0 && (
                <BaseContent
                  content={assignmentApplication.background}
                  max-height={140}
                />
              )}
            {!assignmentApplication?.background && (
              <p className="text-sm text-neutral-700">-</p>
            )}
          </div>
        </div>
      </BaseSection>
    </>
  );
};

export default BackgroundInformation;
