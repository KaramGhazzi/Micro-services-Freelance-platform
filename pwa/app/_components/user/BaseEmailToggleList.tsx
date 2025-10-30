import React from 'react';
import { useTranslations } from 'next-intl';
import BaseToggle from '@/app/_components/BaseToggle';

export class EmailFormData {
  [key: string]: any;
  assignmentPublished: boolean = true;
  assignmentDeclined: boolean = true;
  assignmentTransferred: boolean = true;
  assignmentClosed: boolean = true;
  assignmentArchived: boolean = true;
}

interface Props {
  formData?: EmailFormData;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  gap: number;
}

const EmailToggle: React.FC<Props> = ({ formData, onChange, gap }) => {
  const t = useTranslations();

  return (
    <div
      className={`col-span-2 grid gap-${gap} lg:grid lg:grid-cols-1 lg:gap-${gap}`}
    >
      {Object.keys(new EmailFormData()).map((key) => (
        <BaseToggle
          key={key}
          label={t(`auth.emailSettingsLabels.${key}`)}
          name={key}
          checked={formData?.[key] ?? false}
          onChange={onChange}
          withBackgroundColor
          required
        />
      ))}
    </div>
  );
};

export default EmailToggle;
