'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import IconArrowRight from '@/app/_components/icons/IconArrowRight';
import { useAuth } from '@/app/_hooks/useAuth';

export const AssignmentFormHelpAside = () => {
  const t = useTranslations('assignment');
  const { isCompany } = useAuth();

  const links = [
    {
      href: isCompany
        ? 'https://helpcenter.freelance.nl/organisatie/welke-richtlijnen-hanteert-freelance.nl-voor-opdrachten'
        : 'https://helpcenter.freelance.nl/freelancer/welke-richtlijnen-hanteert-freelance.nl-voor-opdrachten',
      text: t('help.links.link1.text'),
      target: '_blank',
    },
  ];

  const steps = [
    {
      title: t('help.steps.step1.title'),
      text: t('help.steps.step1.text'),
    },
    {
      title: t('help.steps.step2.title'),
      text: t('help.steps.step2.text'),
    },
    {
      title: t('help.steps.step3.title'),
      text: t('help.steps.step3.text'),
    },
    {
      title: t('help.steps.step4.title'),
      text: t('help.steps.step4.text'),
    },
  ];

  return (
    <>
      <section className="grid gap-6 border-b border-neutral-100 bg-white px-5 py-10 lg:p-10">
        <h3 className="font-heading text-base font-bold tracking-tight">
          {t('help.links.heading')}
        </h3>

        <ul className="grid gap-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                target={link.target}
                className="text-primary-600 hover:text-primary-700 group flex gap-2 text-sm font-semibold"
              >
                <IconArrowRight className="shrink-0 transition-all group-hover:translate-x-0.5" />
                <span>{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="relative grid gap-6 border-b border-neutral-100 bg-white px-5 py-10 lg:p-10">
        <i className="from-primary-500 via-primary-300 to-primary-50 absolute inset-0 bg-gradient-to-b from-10% via-30% to-90% opacity-[0.05]"></i>
        <div className="relative">
          <h3 className="font-heading text-base font-bold tracking-tight">
            {t('help.steps.heading')}
          </h3>
          <div className="prose prose-sm">
            <ul>
              {steps.map((step, index) => (
                <li key={index}>
                  <strong className="block">{step.title}</strong>
                  <p>{step.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
