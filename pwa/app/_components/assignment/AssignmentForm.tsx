import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useTranslations } from 'next-intl';
import { ValidationError } from 'yup';
import {
  CustomerRelation,
  RateType,
} from '@package/types/dist/class-validator/@generated/enums';
import contractOptions from '../../(dashboard)/opdracht-plaatsen/nieuwe-opdracht/_data/contractOptions';
import rateTypeOptions from '../../(dashboard)/opdracht-plaatsen/nieuwe-opdracht/_data/rateTypeOptions';
import onLocationOptions from '../../(dashboard)/opdracht-plaatsen/nieuwe-opdracht/_data/onLocationOptions';
import locationsOptions from '../../(dashboard)/_data/provinceOptions';
import customerRelationOptions from '../../(dashboard)/opdracht-plaatsen/nieuwe-opdracht/_data/customerRelationOptions';
import durationTypeOptions from '../../(dashboard)/opdracht-plaatsen/nieuwe-opdracht/_data/durationTypeOptions';
import AssignmentFormSection from './AssignmentFormSection';
import AssignmentFormExpertise from './AssignmentFormExpertise';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import BaseInput from '@/app/_components/BaseInput';
import BaseSelect from '@/app/_components/BaseSelect';
import BaseTipTap from '@/app/_components/BaseTipTap';
import BaseHeading from '@/app/_components/BaseHeading';
import BaseTippy from '@/app/_components/BaseTippy';
import BaseNumberInput from '@/app/_components/BaseNumberInput';
import IconQuestionmarkCircleFill from '@/app/_components/icons/IconQuestionmarkCircleFill';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import { ExpertiseType } from '@/graphql/types';

export interface AssignmentFormData {
  title: string;
  externalCode: string;
  description: string;
  contractType?: string;
  rateType?: string;
  rateFrom: number | null;
  rateTo: number | null;
  onLocation?: string;
  province?: string;
  place: string;
  hideInDescription: boolean;
  customerRelation?: string;
  customerRelationCompany?: string;
  customerRelationCompanyVisible: boolean;
  applicationDeadlineDate?: string;
  startAsap: boolean;
  duration: string;
  durationType?: string;
  durationExtendable: boolean;
  hoursFrom: number | null;
  hoursTo: number | null;
  startDate?: string;
  expertises: ExpertiseType[];
}

interface AssignmentFormProps {
  initialFormData?: AssignmentFormData;
  onFormDataChange: (data: any) => void;
  validationErrors: ValidationError[] | undefined;
  admin?: boolean;
  assignmentId?: number;
}

interface AssignmentFormRef {
  submitForm: () => void;
}

const AssignmentForm: React.ForwardRefRenderFunction<
  AssignmentFormRef,
  AssignmentFormProps
> = (
  {
    initialFormData,
    onFormDataChange,
    validationErrors,
    admin = false,
    assignmentId = null,
  },
  ref
) => {
  const t = useTranslations('assignment');

  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<AssignmentFormData>({
    title: '',
    externalCode: '',
    description: '',
    contractType: undefined,
    rateType: undefined,
    rateFrom: null,
    rateTo: null,
    onLocation: undefined,
    province: undefined,
    place: '',
    hideInDescription: false,
    customerRelation: undefined,
    customerRelationCompany: '',
    customerRelationCompanyVisible: true,
    applicationDeadlineDate: undefined,
    startAsap: false,
    duration: '',
    durationType: undefined,
    durationExtendable: false,
    hoursFrom: null,
    hoursTo: null,
    startDate: undefined,
    expertises: [],
  });

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData) as {
      [index: string]: string | undefined;
    }
  );

  useEffect(() => {
    setFormErrors({});
    if (validationErrors?.length && formRef.current) {
      formRef.current.reportValidity();

      const errors: { [index: string]: string | undefined } = {};
      validationErrors.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
      setFormErrors(errors);
    }
  }, [validationErrors]);

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const updateFormData = (key: string, value: unknown) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //empty startDate if startAsap is checked
    if (e.target.name === 'startAsap' && e.target.checked) {
      updateFormData('startDate', '');
    }

    updateFormData(e.target.name, e.target.checked);
  };

  const handleDescriptionChange = useCallback(
    (content: string) => {
      updateFormData('description', content);
    },
    [setFormData]
  );

  const handleExpertisesChange = useCallback(
    (expertises: ExpertiseType[]) => {
      updateFormData('expertises', expertises);
    },
    [setFormData]
  );

  useEffect(() => {
    onFormDataChange(formData);
  }, [formData]);

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (formRef.current) {
        if (formRef.current.checkValidity()) {
          formRef.current.submit();
        } else {
          formRef.current.reportValidity();
          const invalidInput = formRef.current.querySelector(':invalid');
          if (invalidInput) {
            (invalidInput as HTMLInputElement).focus();
          }
        }
      }
    },
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex-grow divide-y-4 divide-neutral-50 border-neutral-100 bg-white xl:border-r"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <AssignmentFormSection>
        <BaseHeading type="h2" size="lg">
          {t('heading.general')}
        </BaseHeading>
        <BaseInput
          label={t('name.label')}
          placeholder={t('name.placeholder')}
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          type="text"
          error={formErrors['title']}
        />
        <BaseInput
          label={t('externalCode.label')}
          placeholder={t('externalCode.placeholder')}
          name="externalCode"
          value={formData.externalCode}
          onChange={handleInputChange}
          type="text"
          error={formErrors['externalCode']}
        />
        <BaseTipTap
          label={t('description.label')}
          placeholder={t('description.placeholder')}
          onChange={handleDescriptionChange}
          initialContent={initialFormData?.description}
          error={formErrors['description']}
        />
      </AssignmentFormSection>
      {admin && assignmentId && (
        <AssignmentFormExpertise
          expertises={formData?.expertises}
          isEditable
          updateExpertises={handleExpertisesChange}
        />
      )}
      <AssignmentFormSection>
        <BaseHeading type="h2" size="lg">
          {t('heading.contract')}
        </BaseHeading>
        <div className="grid gap-6 xl:grid-cols-2">
          <div>
            <BaseSelect
              label={t('contractType.label')}
              placeholder={t('contractType.placeholder')}
              name="contractType"
              value={formData.contractType}
              onChange={handleInputChange}
              required
              error={formErrors['contractType']}
            >
              {contractOptions.map((option) => (
                <option key={option.value} value={option.value.toUpperCase()}>
                  {t('contractType.options.' + option.value.toUpperCase())}
                </option>
              ))}
            </BaseSelect>
          </div>
          <div className="grid items-start gap-6">
            <BaseSelect
              label={t('rateType.label')}
              placeholder={t('rateType.placeholder')}
              name="rateType"
              value={formData.rateType}
              onChange={handleInputChange}
              required
              error={formErrors['rateType']}
            >
              {rateTypeOptions.map((option) => (
                <option key={option.value} value={option.value.toUpperCase()}>
                  {t('rateType.options.' + option.value.toUpperCase())}
                </option>
              ))}
            </BaseSelect>
            {(formData.rateType === RateType.HOUR ||
              formData.rateType === RateType.UNIT) && (
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  {t('rate.label')}
                </label>
                <div className="grid grid-cols-2 items-start gap-3">
                  <BaseNumberInput
                    placeholder="75"
                    name="rateFrom"
                    value={formData?.rateFrom ?? ''}
                    onChange={(value) => updateFormData('rateFrom', value)}
                    prepend="Min"
                    error={formErrors['rateFrom']}
                  />
                  <BaseNumberInput
                    placeholder="95"
                    name="rateTo"
                    value={formData?.rateTo ?? ''}
                    onChange={(value) => updateFormData('rateTo', value)}
                    prepend="Max"
                    error={formErrors['rateTo']}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </AssignmentFormSection>
      <AssignmentFormSection>
        <div className="flex items-center gap-1">
          <BaseHeading type="h2" size="lg">
            {t('heading.location')}
          </BaseHeading>
          <BaseTippy
            trigger="click"
            content={<span>{t('tooltip.location')}</span>}
          >
            <div>
              <IconQuestionmarkCircleFill className="text-secondary-500 cursor-pointer" />
            </div>
          </BaseTippy>
        </div>
        <div className="grid items-start gap-6 xl:grid-cols-2">
          <BaseSelect
            label={t('onLocation.label')}
            placeholder={t('onLocation.placeholder')}
            name="onLocation"
            value={formData.onLocation}
            onChange={handleInputChange}
            required
            error={formErrors['onLocation']}
          >
            {onLocationOptions.map((option) => (
              <option key={option.value} value={option.value.toUpperCase()}>
                {t('onLocation.options.' + option.value.toUpperCase())}
              </option>
            ))}
          </BaseSelect>
          <BaseSelect
            label={t('province.label')}
            placeholder={t('province.placeholder')}
            name="province"
            value={initialFormData?.province ?? formData.province}
            onChange={handleInputChange}
            required
            error={formErrors['province']}
          >
            {locationsOptions.map((optionGroup) => (
              <optgroup label={optionGroup.label} key={optionGroup.label}>
                {optionGroup.items?.map((option) => (
                  <option key={option} value={option}>
                    {t(`location.province.${option}`)}
                  </option>
                ))}
              </optgroup>
            ))}
          </BaseSelect>
          <div className="grid gap-3">
            <BaseInput
              label={t('place.label')}
              placeholder={t('place.placeholder')}
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              type="text"
              error={formErrors['place']}
            />
            <BaseCheckbox
              label={t('hideInDescription.label')}
              name="hideInDescription"
              checked={formData.hideInDescription}
              onChange={handleCheckboxChange}
            />
          </div>
          <BaseSelect
            label={t('customerRelation.label')}
            placeholder={t('customerRelation.placeholder')}
            name="customerRelation"
            value={
              initialFormData?.customerRelation ?? formData.customerRelation
            }
            onChange={handleInputChange}
            required
            error={formErrors['customerRelation']}
          >
            {customerRelationOptions.map((option) => (
              <option key={option.value} value={option.value.toUpperCase()}>
                {t('customerRelation.options.' + option.value.toUpperCase())}
              </option>
            ))}
          </BaseSelect>
          {(formData.customerRelation === CustomerRelation.FIRST ||
            formData.customerRelation === CustomerRelation.SECOND) && (
            <div className="grid gap-3">
              <BaseInput
                label={t('customerRelationCompany.label')}
                placeholder={t('customerRelationCompany.placeholder')}
                name="customerRelationCompany"
                value={formData.customerRelationCompany}
                onChange={handleInputChange}
                type="text"
                error={formErrors['customerRelationCompany']}
              />
              <BaseCheckbox
                label={t('customerRelationCompanyVisible.label')}
                name="customerRelationCompanyVisible"
                checked={formData.customerRelationCompanyVisible}
                onChange={handleCheckboxChange}
              />
            </div>
          )}
        </div>
      </AssignmentFormSection>
      <AssignmentFormSection>
        <BaseHeading type="h2" size="lg">
          {t('heading.dates')}
        </BaseHeading>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="grid gap-3">
            <BaseInput
              label={t('startDate.label')}
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              type="date"
              disabled={formData.startAsap}
              error={formErrors['startDate']}
            />
            <BaseCheckbox
              label={t('startAsap.label')}
              name="startAsap"
              checked={formData.startAsap}
              onChange={handleCheckboxChange}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              {t('duration.label')}
            </label>

            <div className="grid grid-cols-2 items-start gap-3">
              <div className="grid gap-3">
                <BaseInput
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="0"
                  type="number"
                  error={formErrors['duration']}
                />
              </div>
              <BaseSelect
                placeholder={t('durationType.placeholder')}
                name="durationType"
                value={formData.durationType}
                onChange={handleInputChange}
                required
                error={formErrors['durationType']}
              >
                {durationTypeOptions.map((option) => (
                  <option key={option.value} value={option.value.toUpperCase()}>
                    {t('durationType.options.' + option.value.toUpperCase())}
                  </option>
                ))}
              </BaseSelect>
              <BaseCheckbox
                label={t('durationExtendable.label')}
                name="durationExtendable"
                checked={formData.durationExtendable}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              {t('hours.label')}
            </label>
            <div className="grid grid-cols-2 items-start gap-3">
              <BaseNumberInput
                placeholder="0"
                name="hoursFrom"
                value={formData.hoursFrom ? formData.hoursFrom : ''}
                onChange={(value) => updateFormData('hoursFrom', value)}
                prepend="Min"
                error={formErrors['hoursFrom']}
              />
              <BaseNumberInput
                placeholder="40"
                name="hoursTo"
                value={formData.hoursTo ? formData.hoursTo : ''}
                onChange={(value) => updateFormData('hoursTo', value)}
                prepend="Max"
                error={formErrors['hoursTo']}
              />
            </div>
          </div>
        </div>
      </AssignmentFormSection>
      <AssignmentFormSection>
        <BaseHeading type="h2" size="lg">
          {t('heading.registrationDate')}
        </BaseHeading>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="grid gap-3">
            <BaseInput
              label={t('applicationDeadlineDate.label')}
              name="applicationDeadlineDate"
              value={formData.applicationDeadlineDate}
              onChange={handleInputChange}
              type="date"
              error={formErrors['applicationDeadlineDate']}
            />
          </div>
        </div>
      </AssignmentFormSection>
    </form>
  );
};

export default forwardRef(AssignmentForm);
