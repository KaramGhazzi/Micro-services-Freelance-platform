'use client';

import { useTranslations } from 'next-intl';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseSection from '@/app/_components/BaseSection';
import BaseStatus from '@/app/_components/BaseStatus';
import { GetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';

type Props = {
  assignmentApplication: GetAssignmentApplicationQuery['assignmentApplication'];
};

const Details = ({ assignmentApplication }: Props) => {
  const t = useTranslations('assignment');

  return (
    <BaseSection>
      <div className="grid gap-4">
        <BaseHeading type="h2" size="lg">
          {t(`application.details.title`)}
        </BaseHeading>
        <div className="grid grid-cols-1 content-start items-start gap-6 gap-y-2 md:grid-cols-2">
          <Row
            title={t(`application.details.applicationStatus`)}
            value={
              <div className="flex">
                <BaseStatus theme={assignmentApplication?.status}>
                  {t(`application.status.${assignmentApplication?.status}`)}
                </BaseStatus>
              </div>
            }
          />

          <Row
            title={t(`application.details.statusChanged`)}
            value={
              assignmentApplication?.updatedAt
                ? new Intl.DateTimeFormat('nl-NL', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(new Date(assignmentApplication?.updatedAt))
                : '-'
            }
          />

          <Row
            title={t(`application.details.applicationDate`)}
            value={
              assignmentApplication?.createdAt
                ? new Intl.DateTimeFormat('nl-NL', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(new Date(assignmentApplication?.createdAt))
                : '-'
            }
          />

          {/* <Row
            title={`Gegevens gedeeld`}
            value={
              assignment?.application?.dataShared
                ? 'Beschikbaar'
                : 'Niet beschikbaar'
            }
          /> */}
        </div>
      </div>
    </BaseSection>
  );
};

export default Details;

const Row: React.FC<{ title: string; value: any }> = ({ title, value }) => {
  return (
    <div className="grid grid-cols-2 content-start items-start">
      <div className="text-sm font-medium text-neutral-900">{title}</div>
      <div className="text-sm text-neutral-700">{value}</div>
    </div>
  );
};
