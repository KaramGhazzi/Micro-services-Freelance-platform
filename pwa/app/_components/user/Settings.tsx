'use client';
import { useTranslations } from 'next-intl';
import React, { ReactElement, useEffect, useState } from 'react';
import { ValidationError } from 'yup';
import { userSettingsCreateSchema } from '@package/types/dist/yup/pwa/user-settings.schema';
import { PrivacyFormData } from './BasePrivacyToggleList';
import IconCheckmarkSm from '@/app/_components/icons/IconCheckmarkSm';
import { SettingType, User } from '@/graphql/types';
import { EmailFormData } from '@/app/_components/user/BaseEmailToggleList';

type SettingsFormProps<T> = {
  title: string;
  intro: string;
  user: User | undefined;
  upsert: (settingsData: any) => any;
  loading: boolean;
  formData: T;
  children: React.ReactNode;
};

export default function Settings<T extends EmailFormData | PrivacyFormData>({
  title,
  intro,
  user,
  upsert,
  loading,
  formData,
  children,
}: Readonly<SettingsFormProps<T>>) {
  const t = useTranslations();
  const validationSchema = userSettingsCreateSchema();
  const [internalFormData, setInternalFormData] = useState<T>({ ...formData });
  const [success, setSuccess] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const [settingIds, setSettingIds] = useState(new Map());

  useEffect(() => {
    if (user?.settings) {
      const formData = user.settings.reduce((emailFormData, obj) => {
        setSettingIds(settingIds.set(obj.key, Number.parseInt(obj.id)));
        emailFormData[obj.key] = obj.value === 'true';
        return emailFormData;
      }, {} as T);

      setInternalFormData(formData);
    }
  }, [user]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    let updatedFormData = {
      [name]: inputValue,
    };

    setInternalFormData((prevFormData: T) => ({
      ...prevFormData,
      ...updatedFormData,
    }));

    if (!loading) {
      setUnknownError(false);

      let settingId = -1;
      let settingKey: string | undefined;
      let settingValue: string = 'false';
      Object.keys(updatedFormData).forEach((key) => {
        settingId = settingIds.get(key);
        settingKey = key;
        settingValue = (!!updatedFormData[key]).toString();
      });

      if (!settingKey) {
        return;
      }

      const upsertData = {
        variables: {
          key: settingKey,
          type: SettingType.Communication,
          value: settingValue,
          settingId: settingId,
          userId: Number(user?.id ?? '-1'),
        },
      };

      try {
        await validationSchema.validate(internalFormData, {
          abortEarly: false,
        });

        const settingData = await upsert(upsertData);
        if (settingData?.data?.settingUpsert) {
          const setting = settingData?.data?.settingUpsert;
          setSettingIds(
            settingIds.set(setting.key, Number.parseInt(setting.id))
          );
          setSuccess(true);
        }
      } catch (e: any) {
        setSuccess(false);
        if (e instanceof ValidationError) {
          const errors: { [index: string]: string | undefined } = {};
          e.inner.forEach((error) => {
            if (
              error.path &&
              Object.keys(internalFormData).includes(error.path)
            ) {
              errors[error.path] = error.message;
            }
          });
        } else {
          setUnknownError(true);
        }
      }
    }
  };

  return (
    <form className="flex-grow divide-y-4 divide-neutral-50 border-neutral-100 bg-white xl:border-r">
      <div className="divide-y divide-gray-200 p-10">
        <section>
          <div className="grid max-w-4xl gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
            <div className="col-span-1 grid h-fit gap-1">
              <div>
                <h1 className="font-semibold text-neutral-900">{t(title)}</h1>
              </div>
              <div>
                <p className="text-xs leading-5 text-neutral-500">{t(intro)}</p>
              </div>
            </div>
            <div className="col-span-2 grid gap-6 lg:grid lg:grid-cols-1 lg:gap-6">
              {
                // Retrieve every child and attach the onchange handler and the formData object.
                // Because this component has the handleInputChange function defined, this is a
                // way to add the onChange function to the child.
                React.Children.map(children, (child) => {
                  return React.cloneElement(child as ReactElement, {
                    onChange: handleInputChange,
                    formData: internalFormData,
                  });
                })
              }
              {success && (
                <div className="text-success-400 flex flex-nowrap items-center text-sm">
                  <IconCheckmarkSm />
                  <p className="text-xs">{t('account.successMessage')}</p>
                </div>
              )}
              <div className="flex h-4 flex-nowrap items-center text-sm text-red-500">
                {unknownError && (
                  <p className="text-error-600 text-xs font-medium">
                    {t('account.errorMessage')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}
