'use client';

// Global components
import { useTranslations } from 'next-intl';
import BaseSection from '@/app/_components/BaseSection';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseTag from '@/app/_components/BaseTag';
import { GetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';
import { parseTags } from '@/app/_libs/Tags';

type Props = {
  assignmentApplication: GetAssignmentApplicationQuery['assignmentApplication'];
};

const Expertise = ({ assignmentApplication }: Props) => {
  const t = useTranslations('assignment');
  const expertises = () => {
    return parseTags(assignmentApplication?.expertises);
  };

  return (
    <BaseSection>
      <div className="flex flex-col gap-4 break-words">
        <BaseHeading type="h2" size="lg">
          {t('application.expertise.title')}
        </BaseHeading>

        {expertises().length === 0 && (
          <p className="text-sm text-neutral-700">-</p>
        )}
        {expertises().length > 0 && (
          <div className="flex flex-wrap items-center gap-1 ">
            {expertises().map((e: any, index: number) => (
              <BaseTag key={index}>{e}</BaseTag>
            ))}
          </div>
        )}
      </div>
    </BaseSection>
  );
};

export default Expertise;
