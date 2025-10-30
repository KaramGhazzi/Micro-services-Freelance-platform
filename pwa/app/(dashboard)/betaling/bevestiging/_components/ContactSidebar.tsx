import React from 'react';
import { useTranslations } from 'next-intl';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseButton from '@/app/_components/BaseButton';

const ContactSidebar = () => {
  const t = useTranslations();

  return (
    <aside className="w-full xl:max-w-sm 2xl:max-w-md">
      <div className="relative border-b bg-white p-10">
        <span className="via-71% absolute left-0 top-0 h-full w-full bg-white bg-gradient-to-tl from-[#FFF] from-0% via-[#ED6655] via-[#FBAA58] via-45% to-[#EE7056] to-100% opacity-[3%]" />
        <div className="mb-2">
          <BaseHeading type="h3" size="base">
            {t('global.contactTitle')}
          </BaseHeading>
        </div>

        <p className="mb-6 text-sm text-neutral-700">
          {t('global.contactText')}
        </p>

        <BaseButton theme={'secondary'} href="https://www.freelance.nl/contact">
          {t('global.contactUs')}
        </BaseButton>
      </div>
    </aside>
  );
};

export default ContactSidebar;
