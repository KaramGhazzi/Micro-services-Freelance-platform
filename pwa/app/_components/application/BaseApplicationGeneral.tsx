'use client';

import { useTranslations, useFormatter } from 'next-intl';
import { Availability, File, RateType } from '../../../graphql/types';
import BaseContent from '@/app/_components/BaseContent';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseSection from '@/app/_components/BaseSection';
import IconArrowDiagonalOut from '@/app/_components/icons/IconArrowDiagonalOut';
import IconDocument from '@/app/_components/icons/IconDocument';
import { useFileDownloadLinkLazyQuery } from '@/graphql/queries/storage/getDownloadLink.generated';
import { GetAssignmentApplicationQuery } from '@/graphql/queries/assignments/getAssignmentApplication.generated';

type BaseApplicationGeneralProps = {
  assignmentApplication: GetAssignmentApplicationQuery['assignmentApplication'];
};

const BaseApplicationGeneral = ({
  assignmentApplication,
}: BaseApplicationGeneralProps) => {
  const t = useTranslations('assignment');
  const f = useFormatter();
  const [getDownloadLink] = useFileDownloadLinkLazyQuery();

  const downloadFile = async (file?: File) => {
    if (!file) {
      return;
    }

    const { data } = await getDownloadLink({
      variables: {
        containerName: file.container,
        blobName: file.blobName,
      },
    });

    if (data?.fileDownloadLink.url) {
      window.open(data?.fileDownloadLink.url, '_blank')?.focus();
    }
  };

  const bytesToMB = (bytes: number) => {
    return (bytes / Math.pow(1024, 2)).toFixed(2) + ' ' + ' MB';
  };

  return (
    <BaseSection>
      <div className="flex flex-col gap-4 break-words">
        <BaseHeading type="h2" size="lg">
          {t('application.general.title')}
        </BaseHeading>

        <h5 className="text-sm font-semibold text-neutral-900">
          {t('application.general.subTitleMotivation')}
        </h5>

        <div className="-mt-2">
          <BaseContent
            content={assignmentApplication?.motivation ?? ''}
            max-height={140}
          />
        </div>

        <dl className="mt-2 divide-y divide-neutral-100 rounded-xl bg-neutral-50 text-sm">
          <Row
            title={t('application.general.availabilityWeek')}
            value={
              assignmentApplication?.availableHours
                ? `${assignmentApplication?.availableHours} uur`
                : '-'
            }
          />
          <Row
            title={t('application.general.readilyAvailable')}
            value={
              assignmentApplication?.availability === Availability.Immediately
                ? 'Ja'
                : 'Nee'
            }
          />
          <Row
            title={t('application.general.rate')}
            value={
              <div className="lowercase">
                {assignmentApplication?.rateType === RateType.Agreement ? (
                  t(
                    'rateType.options.' +
                      (assignmentApplication?.rateType ?? '')
                  )
                ) : (
                  <>
                    {!assignmentApplication?.rateTo &&
                      t('application.general.from')}{' '}
                    {f.number(assignmentApplication?.rateFrom ?? 0, {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                    {assignmentApplication?.rateTo && (
                      <>
                        {' - '}
                        {f.number(assignmentApplication?.rateTo ?? 0, {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </>
                    )}{' '}
                    {t(
                      'rateType.options.' +
                        (assignmentApplication?.rateType ?? '')
                    )}
                  </>
                )}
              </div>
            }
          />

          <Row
            title={t('application.general.city')}
            value={assignmentApplication?.city ?? '-'}
          />
          <Row
            title={t('application.general.email')}
            value={assignmentApplication?.email ?? '-'}
          />
          <Row
            title={t('application.general.phone')}
            value={assignmentApplication?.phoneNumber ?? '-'}
          />
          <Row
            title={t('application.general.linkedin')}
            value={
              assignmentApplication?.linkedInURL ? (
                <a
                  href={assignmentApplication?.linkedInURL}
                  target="_blank"
                  className="text-primary-600 inline-flex items-center gap-x-1 text-sm font-semibold"
                >
                  <span>{t('application.general.visit')}</span>
                  <IconArrowDiagonalOut />
                </a>
              ) : (
                '-'
              )
            }
          />
          <Row
            title={t('application.general.website')}
            value={
              assignmentApplication?.websiteURL ? (
                <a
                  href={assignmentApplication?.websiteURL}
                  target="_blank"
                  className="text-primary-600 inline-flex items-center gap-x-1 text-sm font-semibold"
                >
                  <span>{t('application.general.visit')}</span>
                  <IconArrowDiagonalOut />
                </a>
              ) : (
                '-'
              )
            }
          />
        </dl>

        <h5 className="mt-6 text-sm font-semibold text-neutral-900">
          {t('application.general.subTitleFiles')}
        </h5>

        <div className="-mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          {assignmentApplication?.documents?.map((document) => {
            return (
              <Document
                key={`${document.file.name}-${document.file.size}`}
                title={document.file.name}
                size={document.file.size ? bytesToMB(document.file.size) : '-'}
                onClick={() => downloadFile(document.file as File)}
              />
            );
          })}
        </div>
      </div>
    </BaseSection>
  );
};

export default BaseApplicationGeneral;

const Row: React.FC<{ title: string; value: any }> = ({ title, value }) => {
  return (
    <div className="grid gap-1 py-[10px] md:grid-cols-2 md:gap-6">
      <dt className="px-3 font-medium text-neutral-900">{title}</dt>
      <dd className="px-3 text-sm text-neutral-700">{value}</dd>
    </div>
  );
};

const Document: React.FC<{
  title: string;
  size: string;
  onClick: () => void;
}> = ({ title, size, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-x-3 rounded-lg border border-neutral-100 bg-white p-3 shadow-sm "
    >
      <div className="rounded-lg border border-neutral-100 p-1.5">
        <IconDocument />
      </div>
      <div className="overflow-hidden">
        <div className="truncate text-xs font-semibold text-neutral-900">
          {title}
        </div>
        <div className="text-xs text-neutral-500">{size}</div>
      </div>
    </div>
  );
};
