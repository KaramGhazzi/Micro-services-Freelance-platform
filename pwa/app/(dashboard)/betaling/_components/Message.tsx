'use client';
import { useTranslations } from 'next-intl';
import IconXMd from '@/app/_components/icons/IconXMd';
import BaseButton from '@/app/_components/BaseButton';
import BaseHeading from '@/app/_components/BaseHeading';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';

interface MessageProps {
  prefix?: string;
  success?: boolean;
  amount?: number | null;
}

export default function Message({ prefix, success, amount }: MessageProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-grow flex-col items-center border-b bg-white py-[100px] xl:border-b-0 xl:border-r">
      <div className="flex">
        {success ? (
          <i className="bg-success-50 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="bg-success-100 flex h-14 w-14 items-center justify-center rounded-full">
              <IconCheckmarkMd className="text-success-500 h-10 w-10" />
            </span>
          </i>
        ) : (
          <i className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <span className=" flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <IconXMd className="text-error-600 h-8  w-8" />
            </span>
          </i>
        )}
      </div>

      <div className="mb-1 grid gap-1 text-center">
        <BaseHeading type="h2" size="base">
          {success
            ? t(
                `payments.${prefix}.confirmationTitle`,
                prefix === 'top' ? { count: amount } : {}
              )
            : t(`payments.failedTitle`)}
        </BaseHeading>
      </div>
      <div className="mb-8 grid">
        <p className="text-center text-sm text-neutral-700">
          {success
            ? t(`payments.${prefix}.confirmationText`)
            : t(`payments.failedText`)}
        </p>
      </div>

      {success ? (
        <BaseButton
          href={
            prefix === 'pro'
              ? '/opdracht-vinden/zoeken'
              : '/opdracht-plaatsen/nieuwe-opdracht'
          }
        >
          {prefix === 'pro'
            ? t('global.projectsSearch')
            : t('payments.top.toNewAssignment')}
        </BaseButton>
      ) : (
        <BaseButton href={'/dashboard'}>{t('dashboard.back')}</BaseButton>
      )}
    </div>
  );
}
