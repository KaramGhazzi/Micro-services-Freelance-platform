import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import BaseButton from '../BaseButton';
import IconCheckmarkSm from '../icons/IconCheckmarkSm';
import Modal from '../BaseDialog';
import { User } from '@/graphql/types';

type DeleteUserProps = {
  user: User | undefined;
};

const DeleteUser = ({}: DeleteUserProps) => {
  const t = useTranslations('delete-user');
  const [success] = useState(false);
  const [deleteUserModalActive, setDeleteUserModalActive] = useState(false);

  const deleteUser = async () => {
    setDeleteUserModalActive(false);
    // TODO: add the call to the backend to remove the user
    return false;
  };

  return (
    <section className="p-10">
      <Modal
        isOpen={deleteUserModalActive}
        onClose={() => setDeleteUserModalActive(false)}
        size="md"
        title={t('modal.title')}
        footer={
          <>
            <BaseButton onClick={deleteUser} theme="secondary" size="md">
              {t('button')}
            </BaseButton>

            <BaseButton
              onClick={() => setDeleteUserModalActive(false)}
              size="md"
            >
              {t('modal.cancel')}
            </BaseButton>
          </>
        }
      >
        <p className="text-neutral-500">{t('modal.description')}</p>
      </Modal>

      <div className="grid max-w-4xl gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
        <div className="col-span-1 grid h-fit gap-1">
          <div>
            <h1 className="font-semibold text-neutral-900">{t('title')}</h1>
          </div>
        </div>
        <div className="col-span-2 grid gap-6 lg:grid lg:grid-cols-1 lg:gap-6">
          <p className="text-sm text-neutral-700">{t('description')}</p>
          <div className="flex">
            <BaseButton
              size="md"
              theme="warning"
              onClick={() => setDeleteUserModalActive(true)}
            >
              {t('button')}
            </BaseButton>
            {success && (
              <div className="text-success-400 flex flex-nowrap items-center px-4 text-sm">
                <IconCheckmarkSm />
                <p className="text-xs">{t('success')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteUser;
