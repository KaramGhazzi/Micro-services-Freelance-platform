'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import UserTypeModal from './_components/UserTypeModal';
import RegisterCompanyModal from './_components/RegisterCompanyModal';
import RegistrationConfirmedModal from './_components/RegistrationConfirmedModal';
import RequestInviteConfirmedModal from './_components/RequestInviteConfirmedModal';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseButton from '@/app/_components/BaseButton';
import IconCheckmarkCircleFill from '@/app/_components/icons/IconCheckmarkCircleFill';
import { CompanyType } from '@/graphql/types';
import { CurrentCompany } from '@/app/(dashboard)/_context/CurrentUserContext';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';
import { useAuth } from '@/app/_hooks/useAuth';

export default function Dashboard() {
  const t = useTranslations('complete');
  const router = useRouter();
  const { googleAnalyticsEvent, handleHubspotMutation } = useEventTracker();

  const [userTypeModalIsOpen, setUserTypeModalIsOpen] = useState(false);
  const [registerCompanyModalIsOpen, setRegisterCompanyModalIsOpen] =
    useState(false);
  const [registerCompleteModalIsOpen, setRegisterCompleteModalIsOpen] =
    useState(false);
  const [requestInviteModalIsOpen, setRequestInviteModalIsOpen] =
    useState(false);

  const { currentUser, currentCompany, refetchMe } = useAuth();
  const [userTypeSuccess, setUserTypeSuccess] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(CompanyType.Unknown);
  const [registerCompanySuccess, setRegisterCompanySuccess] = useState(false);
  const [requestInviteSuccess, setRequestInviteSuccess] = useState(false);

  const confirmUserType = () => {
    setUserTypeModalIsOpen(false);
    setUserTypeSuccess(true);
  };

  const confirmRegisterCompany = () => {
    setRegisterCompanyModalIsOpen(false);
    refetchMe();
  };

  const onRequestInvite = (success: boolean) => {
    setRequestInviteSuccess(success);
    setRequestInviteModalIsOpen(true);
  };

  const openUserTypeModal = () => {
    googleAnalyticsEvent({
      event: EventName.SIGN_UP_ACCOUNTTYPE,
      category: 'Registratieflow',
    });
    handleHubspotMutation(EventName.SIGN_UP_ACCOUNTTYPE);
    setUserTypeModalIsOpen(true);
  };

  const openSetRegisterCompanyModal = () => {
    googleAnalyticsEvent({
      event: EventName.SIGN_UP_COMPANYINFO,
      category: 'Registratieflow',
    });
    handleHubspotMutation(EventName.SIGN_UP_COMPANYINFO);
    setRegisterCompanyModalIsOpen(true);
  };

  // On page load, check if the user has a company and if the company has a cocNumber and name
  useEffect(() => {
    // If the user has a company, set userTypeSuccess to true
    if (
      currentUser?.userCompanies?.length &&
      currentCompany &&
      currentCompany?.type !== CompanyType.Unknown
    ) {
      setUserTypeSuccess(true);
    }

    // If the user has a company and the company has a cocNumber and name, set registerCompanySuccess to true
    if (isCompanyFilled(currentCompany)) {
      setRegisterCompleteModalIsOpen(true);
      setRegisterCompanySuccess(true);
    }
  }, [currentUser]);

  // If both userTypeSuccess and registerCompanySuccess are true, redirect to dashboard
  useEffect(() => {
    if (
      userTypeSuccess &&
      registerCompanySuccess &&
      !registerCompleteModalIsOpen
    ) {
      router.push('/dashboard');
    }
  }, [registerCompanySuccess, registerCompleteModalIsOpen]);

  // Check if the company has a cocNumber and name
  const isCompanyFilled = (obj?: CurrentCompany) => {
    return ['cocNumber', 'name'].every((field) => {
      return obj?.[field as keyof CurrentCompany];
    });
  };

  const contactLink = (chunks: React.ReactNode) => (
    <Link
      href="https://www.freelance.nl/contact"
      target="_blank"
      className="font-semibold underline hover:no-underline"
    >
      {chunks}
    </Link>
  );

  return (
    <div className="flex min-h-[calc(100dvh-64px)] items-center justify-center py-6 lg:bg-white">
      <div className="flex w-full flex-col gap-10 px-5 lg:px-10">
        <header className="mx-auto flex max-w-xl flex-col items-center gap-1 text-center">
          <BaseHeading type="h1" size="2xl">
            {t('title')}
          </BaseHeading>
          <p className="text-neutral-700">{t('paragraph')}</p>
        </header>
        <div className="mx-auto grid w-full max-w-3xl gap-6 sm:grid-cols-2">
          <Card
            title={t('setUserType')}
            description={t('setUserTypeDescription')}
            number={1}
            buttonText={t('setUserType')}
            successState={userTypeSuccess}
            onClick={() => openUserTypeModal()}
          />
          <UserTypeModal
            isOpen={userTypeModalIsOpen}
            onClose={() => {
              setUserTypeModalIsOpen(false);
              setSelectedUserType(CompanyType.Unknown); // Resetting the selected type on close (if appropriate)
            }}
            setType={(type) => {
              setSelectedUserType(type); // Update the state with the selected type
              confirmUserType();
            }}
          />
          <Card
            title={t('registerCompany')}
            description={t('registerCompanyDescription')}
            number={2}
            buttonText={t('registerCompany')}
            successState={registerCompanySuccess}
            onClick={() => openSetRegisterCompanyModal()}
            disabled={!userTypeSuccess}
          />
          <RegisterCompanyModal
            isOpen={registerCompanyModalIsOpen}
            onClose={() => setRegisterCompanyModalIsOpen(false)}
            onConfirm={() => confirmRegisterCompany()}
            onRequestInvite={(success) => onRequestInvite(success)}
            user={currentUser}
            type={selectedUserType}
          />
          <RequestInviteConfirmedModal
            isOpen={requestInviteModalIsOpen}
            onClose={() => setRequestInviteModalIsOpen(false)}
            success={requestInviteSuccess}
          />
          <RegistrationConfirmedModal
            isOpen={registerCompleteModalIsOpen}
            onClose={() => setRegisterCompleteModalIsOpen(false)}
          />
        </div>
        <footer className="text-center text-sm">
          <p>
            {t.rich('footer', {
              link: contactLink,
            })}
          </p>
        </footer>
      </div>
    </div>
  );
}

const Card: React.FC<{
  number: number;
  title: string;
  description: any;
  buttonText: string;
  successState?: boolean;
  disabled?: boolean;
  onClick: () => void;
}> = ({
  number,
  title,
  description,
  buttonText,
  onClick,
  successState,
  disabled,
}) => {
  const t = useTranslations('complete');

  return (
    <article
      className={classNames({
        'flex flex-col gap-6 rounded-2xl border bg-white p-6 shadow-sm': true,
        'border-neutral-100': !successState,
        'border-success-400': successState,
      })}
    >
      <header className="grow">
        <div className="flex justify-between">
          <span className="font-heading mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 text-xl font-bold text-neutral-900">
            {number}
          </span>
          {successState && (
            <IconCheckmarkCircleFill className="text-success-400" />
          )}
        </div>
        <div className="font-heading mb-2 font-bold tracking-tight text-neutral-900">
          {title}
        </div>
        <div className="text-sm text-neutral-700">{description}</div>
      </header>
      <footer>
        {!successState && (
          <BaseButton wide onClick={onClick} disabled={disabled}>
            {buttonText}
          </BaseButton>
        )}
        {successState && (
          <div className="bg-success-50 text-success-600 flex h-12 items-center justify-center rounded-xl px-6 text-sm font-medium">
            {t('stepCompleted')}
          </div>
        )}
      </footer>
    </article>
  );
};
