import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import BaseButton from './BaseButton';
import IconStar from './icons/IconStar';
import Modal from './BaseDialog';
import BaseTextarea from './BaseTextarea';
import BaseSelect from './BaseSelect';
import BaseConfirmationIcon from './BaseConfirmationIcon';
import BaseHeading from './BaseHeading';
import BaseTippy from './BaseTippy';
import { useCreateReviewMutation } from '@/graphql/mutations/reviews/createReview.generated';
import { Assignment, ReviewType } from '@/graphql/types';
import { useCanReviewQuery } from '@/graphql/queries/reviews/canReview.generated';

interface Props {
  assignment: Assignment;
  ctaButtonText: string;
  onReviewSubmit?: () => void;
}

const BaseCreateReviewFlow = ({
  assignment,
  ctaButtonText,
  onReviewSubmit,
}: Props) => {
  const t = useTranslations();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [createReviewMutation] = useCreateReviewMutation();
  const { data, refetch } = useCanReviewQuery({
    variables: {
      companyId: Number(assignment.company.id),
      assignmentId: Number(assignment.id),
      assignmentOwnerId: Number(assignment.owner.id),
    },
  });

  const [formData, setFormData] = useState<{
    type: ReviewType;
    content: string;
  }>({
    type: ReviewType.Top,
    content: '',
  });

  const contentMinLength = 20;
  const contentMaxLength = 250;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const updateFormData = (key: string, value: unknown) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const submitReview = async () => {
    setModalIsOpen(false);

    try {
      const response = await createReviewMutation({
        variables: {
          data: {
            content: formData.content,
            company: {
              connect: {
                id: Number(assignment.company.id),
              },
            },
            assignment: {
              connect: {
                id: Number(assignment.id),
              },
            },
            receivedBy: {
              connect: {
                id: Number(assignment.owner.id),
              },
            },
            type: formData.type,
            createdBy: {},
          },
        },
      });
      if (response) {
        setConfirmationModalIsOpen(true);
        refetch();

        onReviewSubmit && onReviewSubmit();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {data?.canReview ? (
        <BaseTippy content={<span>{t('assignment.ownerHasReview')}</span>}>
          <div>
            <BaseButton
              theme="primary"
              onClick={() => setModalIsOpen(true)}
              disabled={true}
            >
              <IconStar />
              <span>{ctaButtonText}</span>
            </BaseButton>
          </div>
        </BaseTippy>
      ) : (
        <BaseButton theme="primary" onClick={() => setModalIsOpen(true)}>
          <IconStar />
          <span>{ctaButtonText}</span>
        </BaseButton>
      )}

      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        title={t('assignment.modal.review.title', {
          name: `${assignment.owner.firstName} ${assignment.owner.lastName}`,
        })}
        footer={
          <>
            <BaseButton
              onClick={() => setModalIsOpen(false)}
              theme="secondary"
              size="md"
            >
              {t('global.cancel')}
            </BaseButton>
            <BaseButton
              theme="primary"
              size="md"
              disabled={
                formData.content.length < contentMinLength ||
                formData.content.length > contentMaxLength
              }
              onClick={() => submitReview()}
            >
              {t('assignment.modal.review.save')}
            </BaseButton>
          </>
        }
      >
        <div className="grid gap-8">
          <p className="whitespace-pre-line text-neutral-700">
            {t('assignment.modal.review.description', {
              name: `${assignment.owner.firstName} ${assignment.owner.lastName}`,
            })}
          </p>

          <BaseSelect
            label={t('global.chooseOption')}
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder={t('global.chooseOption')}
            required
          >
            <option value="TOP">{t('assignment.modal.review.top')}</option>
            <option value="TIP">{t('assignment.modal.review.tip')}</option>
          </BaseSelect>
          <BaseTextarea
            label={t('assignment.modal.review.content.label')}
            placeholder={t('assignment.modal.review.content.placeholder')}
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            size="sm"
            minLength={contentMinLength}
            maxLength={contentMaxLength}
            helper={t('assignment.modal.review.content.helper', {
              min: contentMinLength,
              max: contentMaxLength,
            })}
            required
          />
        </div>
      </Modal>
      <Modal
        isOpen={confirmationModalIsOpen}
        onClose={() => setConfirmationModalIsOpen(false)}
      >
        <BaseConfirmationIcon />
        <div className="mb-8 grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('assignment.modal.review.confirm.title')}
          </BaseHeading>
          <p className="text-neutral-700">
            {t('assignment.modal.review.confirm.description')}
          </p>
        </div>
        <BaseButton
          wide
          size="lg"
          onClick={() => setConfirmationModalIsOpen(false)}
        >
          {t('assignment.modal.backToAssignment')}
        </BaseButton>
      </Modal>
    </>
  );
};

export default BaseCreateReviewFlow;
