import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import IconUserEmployer from './IconUserEmployer';
import IconUserFreelancer from './IconUserFreelancer';
import Modal from '@/app/_components/BaseDialog';
import BaseButton from '@/app/_components/BaseButton';
import BaseRadio from '@/app/_components/BaseRadio';
import { CompanyType } from '@/graphql/types';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';

interface UserTypeModalProps {
  isOpen: boolean;
  setType: (type: CompanyType) => void;
  onClose: () => void;
}

let error = false;

const UserTypeModal: React.FC<UserTypeModalProps> = ({
  isOpen,
  onClose,
  setType,
}) => {
  const t = useTranslations('complete');
  const { googleAnalyticsEvent, handleHubspotMutation } = useEventTracker();

  const [userType, setUserType] = useState('');
  const [userTypeSub, setUserTypeSub] = useState(CompanyType.Client);

  const userTypeOptions = [
    {
      label: t('labelFreelancer'),
      value: 'FREELANCER',
      icon: IconUserFreelancer,
    },
    {
      label: t('labelCompany'),
      value: 'COMPANY',
      icon: IconUserEmployer,
    },
  ];

  const userTypeSubOptions = [
    {
      label: t('labelEndUser'),
      value: CompanyType.Client,
    },
    {
      label: t('labelIntermediary'),
      value: CompanyType.Intermediar,
    },
    {
      label: t('labelSecondment'),
      value: CompanyType.Seconder,
    },
  ];

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };

  async function confirm() {
    const typeValue: CompanyType =
      userType !== CompanyType.Freelancer
        ? userTypeSub
        : CompanyType.Freelancer;

    googleAnalyticsEvent({
      event: EventName.SIGN_UP_ACCOUNTTYPE_DONE,
      category: 'Registratieflow',
    });
    handleHubspotMutation(EventName.SIGN_UP_ACCOUNTTYPE_DONE);
    setType(typeValue);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('setUserType')}
      footer={
        <>
          <BaseButton onClick={onClose} theme="secondary" size="md">
            {t('cancel')}
          </BaseButton>
          <BaseButton
            onClick={confirm}
            size="md"
            disabled={userType.length === 0}
          >
            {t('confirmType')}
          </BaseButton>
        </>
      }
    >
      <div className="grid">
        <p className="mb-6 font-medium text-neutral-700">
          {t('setUserTypeDescription')}
        </p>
        {error && (
          <div className="">
            <p className="w-auto font-medium text-red-500">
              {t('unknownError')}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {userTypeOptions.map((option) => (
            <label
              key={option.value}
              className={`relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border px-4 py-5 shadow-sm transition-all ${
                userType === option.value
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-neutral-200'
              } text-xs font-medium`}
            >
              <input
                type="radio"
                name="userType"
                value={option.value}
                checked={userType === option.value}
                onChange={handleUserTypeChange}
                className="absolute inset-0 opacity-0"
              />

              <div className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center">
                <span
                  className={classNames({
                    'h-4 w-4 rounded-full border shadow-sm transition-all':
                      true,
                    'bg-primary-600 ring-primary-500/20 border-transparent ring-2':
                      userType === option.value,
                    'border-neutral-200': userType !== option.value,
                  })}
                >
                  <i className="absolute inset-[3px] rounded-full border-[3px] border-white"></i>
                </span>
              </div>

              <option.icon active={userType === option.value} />
              <div>{option.label}</div>
            </label>
          ))}
        </div>

        <AnimatePresence>
          {userType === 'COMPANY' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid gap-1">
                {userTypeSubOptions.map((option) => (
                  <BaseRadio
                    key={option.value}
                    name="userTypeSub"
                    value={option.value}
                    checked={userTypeSub === option.value}
                    onChange={() => setUserTypeSub(option.value)}
                    label={option.label}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default UserTypeModal;
