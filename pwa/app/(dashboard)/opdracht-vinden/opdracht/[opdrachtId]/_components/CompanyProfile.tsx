import { useTranslations, useFormatter } from 'next-intl';
import { CurrentCompany } from '@/app/(dashboard)/_context/CurrentUserContext';
import BaseButton from '@/app/_components/BaseButton';
import BaseHeading from '@/app/_components/BaseHeading';
import IconBuilding from '@/app/_components/icons/IconBuilding';
import IconRocket from '@/app/_components/icons/IconRocket';
import IconArrowDiagonalOut from '@/app/_components/icons/IconArrowDiagonalOut';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';
import { Company, AssignmentNotVisibleReason } from '@/graphql/types';
import { getSlugFromString } from '@/app/(dashboard)/_utils/getSlugFromString';
import { useHasCompanyProfileQuery } from '@/graphql/queries/contracts/hasCompanyProfile.generated';
import { useAuth } from '@/app/_hooks/useAuth';

type PreviewEditCompanyImages = {
  coverImageUrl?: string;
  logoImageUrl?: string;
};

type CompanyProfileProps = {
  isVisible?: boolean;
  isNotVisibleReason?: AssignmentNotVisibleReason;
  company: CurrentCompany | Company;
  previewEditCompanyImages?: PreviewEditCompanyImages;
  onClick?: () => void;
};

const CompanyProfile = ({
  isVisible,
  isNotVisibleReason,
  company,
  previewEditCompanyImages,
  onClick,
}: CompanyProfileProps) => {
  const t = useTranslations('assignment');
  const format = useFormatter();
  const { currentCompany } = useAuth();

  const isCurrentUsersCompany = currentCompany?.id === company?.id;

  const { data: { hasCompanyProfile } = {} } = useHasCompanyProfileQuery({
    variables: {
      companyId: Number(company.id),
    },
  });

  let coverImageFileUrl;
  if (previewEditCompanyImages?.coverImageUrl !== undefined) {
    coverImageFileUrl = previewEditCompanyImages?.coverImageUrl;
  } else if (company?.coverImageFile) {
    coverImageFileUrl = getImageUrl(
      company?.coverImageFile.container,
      company?.coverImageFile.blobName
    );
  }

  let logoImageFileUrl;
  if (previewEditCompanyImages?.logoImageUrl !== undefined) {
    logoImageFileUrl = previewEditCompanyImages?.logoImageUrl;
  } else if (company?.logoImageFile) {
    logoImageFileUrl = getImageUrl(
      company?.logoImageFile.container,
      company?.logoImageFile.blobName
    );
  }

  return (
    <article className="relative">
      {!isVisible && (
        <div className="absolute inset-0 z-20 flex items-center bg-white/60 backdrop-blur">
          <div className="mx-auto flex flex-col gap-8 p-10 text-center">
            <BaseHeading type="h1" size="xl">
              {t('detail.trigger')}
            </BaseHeading>
            <div className="flex justify-center">
              <BaseButton
                theme="primary"
                size="lg"
                onClick={onClick}
                href={
                  isNotVisibleReason ===
                  AssignmentNotVisibleReason.FreelancerBasic
                    ? '/pro'
                    : '/offerte-aanvragen'
                }
              >
                {isNotVisibleReason ===
                AssignmentNotVisibleReason.FreelancerBasic ? (
                  <>
                    <IconRocket />
                    <span>{t('detail.notProBlock.button')}</span>
                  </>
                ) : (
                  <span>{t('detail.marketMonitorNoCredits.button')}</span>
                )}
              </BaseButton>
            </div>
          </div>
        </div>
      )}
      {!hasCompanyProfile && isCurrentUsersCompany && (
        <div className="border-b border-neutral-100 p-6">
          <BaseHeading type="h2" size="base">
            {t('companyProfile.title')}
          </BaseHeading>
          <p className="mb-4 mt-2 text-sm font-medium text-neutral-500">
            {t('companyProfile.description')}
          </p>
          <BaseButton href="/offerte-aanvragen" size="md">
            {t('companyProfile.button')}
          </BaseButton>
        </div>
      )}

      {(hasCompanyProfile || !isVisible) && (
        <figure className="relative aspect-[1200/380] bg-neutral-100">
          {coverImageFileUrl && (
            <img
              className="absolute left-0 top-0 h-full w-full object-cover"
              src={coverImageFileUrl}
              width={1200}
              height={380}
              alt=""
            />
          )}
        </figure>
      )}
      <div className="grid gap-6 border-b bg-white  p-6">
        {hasCompanyProfile && (
          <header className="relative z-10 -mt-12 flex items-end gap-4">
            <figure className="h-20 w-20 rounded-xl border border-neutral-200 bg-white p-0.5 shadow-sm">
              <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-white">
                <IconBuilding className="mx-auto h-6 w-6" />
                {logoImageFileUrl && (
                  <img
                    className="absolute left-0 top-0 h-full w-full rounded-lg bg-white object-contain"
                    src={logoImageFileUrl}
                    width={100}
                    height={100}
                    alt=""
                  />
                )}
              </div>
            </figure>

            <h4 className="font-heading mb-4 font-bold tracking-tight">
              {company.name}
            </h4>
          </header>
        )}
        {!hasCompanyProfile && (
          <header className="flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-neutral-200 shadow-sm">
              <figure className="absolute inset-0 flex items-center rounded-lg border border-white bg-white ">
                <i className="absolute inset-0 rounded-lg"></i>
                <IconBuilding className="mx-auto" />
                {logoImageFileUrl && (
                  <img
                    className="absolute left-0 top-0 h-full w-full rounded-md bg-white object-contain"
                    src={logoImageFileUrl}
                    width={100}
                    height={100}
                    alt=""
                  />
                )}
              </figure>
            </div>
            <h4 className="font-heading font-bold tracking-tight">
              {company.name}
            </h4>
          </header>
        )}
        <dl className="grid gap-4 text-sm">
          <div className="flex gap-6">
            <dt className="w-32 shrink-0 truncate font-medium">
              Geregistreerd sinds
            </dt>
            <dd className="text-neutral-600">
              {company?.createdAt &&
                format.dateTime(new Date(company?.createdAt), {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
            </dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 shrink-0 truncate font-medium">Recruiters</dt>
            <dd className="text-neutral-600">
              {company?.recruiterCount ?? '-'}
            </dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 shrink-0 truncate font-medium">Opdrachten</dt>
            <dd className="text-neutral-600">
              {`${company?.openAssignmentCount ?? 0}/${
                company?.assignmentCount ?? 0
              }`}
            </dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 shrink-0 truncate font-medium">
              Laatste review
            </dt>
            <dd className="hyphens-auto text-neutral-600 [word-break:break-word]">
              {company?.latestTopReviewText ?? '-'}
            </dd>
          </div>
          {hasCompanyProfile && (
            <div className="flex gap-6">
              <dt className="w-32 shrink-0 truncate font-medium">Over</dt>
              <dd className="line-clamp-4 hyphens-auto text-neutral-600 [word-break:break-word]">
                {company?.about ?? '-'}
              </dd>
            </div>
          )}
        </dl>
        <BaseButton
          size="md"
          wide
          theme="secondary"
          onClick={() =>
            window.open(
              `https://freelance.nl/profiel/${getSlugFromString(
                `${company.id}-${company.name}`
              )}`,
              '_blank'
            )
          }
        >
          <span>{t('companyProfile.showCompanyProfile')}</span>
          <IconArrowDiagonalOut />
        </BaseButton>
      </div>
    </article>
  );
};

export default CompanyProfile;
