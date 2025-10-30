import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ValidationError } from 'yup';

import { getDeclineAssignmentSchema } from '@package/types/dist/yup/core/assignment/decline-assignment.schema';
import Modal from '@/app/_components/BaseDialog';
import BaseButton from '@/app/_components/BaseButton';
import BaseRadio from '@/app/_components/BaseRadio';
import BaseSelect from '@/app/_components/BaseSelect';
import { copyObjectWithNullValues } from '@/app/_libs/copyObjectWithNullValues';
import BaseTextarea from '@/app/_components/BaseTextarea';
import { useDeclineAssignmentReviewMutation } from '@/graphql/mutations/assignments/declineAssignmentReview.generated';
import { useApproveAssignmentReviewMutation } from '@/graphql/mutations/assignments/approveAssignmentReview.generated';
import { DeclineAssignment } from '@/graphql/types';

interface ChangeAssignmentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  assignmentId: number;
}

const ChangeAssignmentStatusModal: React.FC<
  ChangeAssignmentStatusModalProps
> = ({ isOpen, onClose, onConfirm, assignmentId }) => {
  const t = useTranslations();
  const validationSchema = getDeclineAssignmentSchema();
  const [declineAssignment, { loading }] = useDeclineAssignmentReviewMutation();
  const [approveAssignment, { loading: load }] =
    useApproveAssignmentReviewMutation();
  const [formData, setFormData] = useState<DeclineAssignment>({
    assignmentId: assignmentId,
    declineReason: '',
  });

  const [formErrors, setFormErrors] = useState(
    copyObjectWithNullValues(formData) as {
      [index: string]: string | undefined;
    }
  );

  const declineReasons = [
    {
      reasonTitle: 'general',
    },
    {
      reasonTitle: 'contact',
    },
    {
      reasonTitle: 'duration',
    },
    {
      reasonTitle: 'services',
    },
    {
      reasonTitle: 'double',
    },
    {
      reasonTitle: 'unclear',
    },
    {
      reasonTitle: 'formatting',
    },
    {
      reasonTitle: 'call',
    },
    {
      reasonTitle: 'permanent',
    },
    {
      reasonTitle: 'provision',
    },
    {
      reasonTitle: 'doublepremium',
    },
    {
      reasonTitle: 'expansion',
    },
    {
      reasonTitle: 'rate',
    },
    {
      reasonTitle: 'traineeship',
    },
    {
      reasonTitle: 'enrichment',
    },
  ];

  const [assignmentStatus, setAssignmentStatus] = useState('PENDING_REVIEW');
  const [declineReason, setDeclineReason] = useState('GENERAL');
  const [declineReasonText, setDeclineReasonText] = useState(
    'De opdrachtomschrijving of titel is te algemeen. Maak deze zo specifiek mogelijk en geef een duidelijke omschrijving van de werkzaamheden en de benodigde vaardigheden.'
  );

  const handleDeclineReasonChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDeclineReason(e.target.value);
  };

  const handleDeclineReasonTextChange = (reasonText: string) => {
    setDeclineReasonText(reasonText);
  };

  useEffect(() => {
    setDeclineReasonText(
      t(`assignment.declineReasons.${declineReason.toLowerCase()}.description`)
    );
  }, [declineReason]);

  async function approve() {
    if (!load) {
      setFormErrors({});
      try {
        await approveAssignment({
          variables: {
            assignmentId: formData.assignmentId,
          },
        });

        onConfirm();
      } catch (e) {
        console.log('could not approve the assignment:', e);
        throw e;
      }
    }
  }

  async function decline() {
    if (!loading) {
      setFormErrors({});
      try {
        await validationSchema.validate(formData, { abortEarly: false });

        await declineAssignment({
          variables: {
            data: formData,
          },
        });
        onConfirm();
      } catch (e) {
        if (e instanceof ValidationError) {
          const errors: { [index: string]: string | undefined } = {};
          e.inner.forEach((error) => {
            if (error.path && Object.keys(formData).includes(error.path)) {
              errors[error.path] = error.message;
            }
          });
          setFormErrors(errors);
        } else {
          throw e;
        }
      }
    }
  }

  useEffect(() => {
    setFormData({
      assignmentId: assignmentId,
      declineReason: declineReasonText,
    });
  }, [declineReasonText]);

  function confirm() {
    if (assignmentStatus === 'APPROVED') {
      approve();
    } else {
      decline();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('global.changeStatus')}
      footer={
        <>
          <BaseButton onClick={onClose} theme="secondary" size="lg">
            {t('global.cancel')}
          </BaseButton>
          <BaseButton
            onClick={confirm}
            theme="primary"
            size="lg"
            disabled={assignmentStatus === 'PENDING_REVIEW'}
          >
            {t('global.changeStatus')}
          </BaseButton>
        </>
      }
    >
      <form>
        <div className="mb-4 grid gap-1">
          <BaseRadio
            label={t('global.approveAndPublish')}
            name="quarterly"
            checked={assignmentStatus === 'APPROVED'}
            onChange={() => setAssignmentStatus('APPROVED')}
          />
          <BaseRadio
            label={t('admin.assignments.check.decline')}
            name="annual"
            checked={assignmentStatus === 'DECLINED'}
            onChange={() => setAssignmentStatus('DECLINED')}
          />
        </div>

        {assignmentStatus === 'DECLINED' && (
          <>
            <div className="mb-4 text-sm font-medium text-neutral-700">
              <BaseSelect
                label={t('assignment.declineReasonHeader')}
                name="reason"
                value={declineReason}
                onChange={(e) => handleDeclineReasonChange(e)}
              >
                {declineReasons.map((reason, index) => (
                  <option key={index} value={reason.reasonTitle.toUpperCase()}>
                    {t(`assignment.declineReasons.${reason.reasonTitle}.title`)}
                  </option>
                ))}
              </BaseSelect>
            </div>
            <div className="text-sm font-medium text-neutral-700">
              <BaseTextarea
                label={t('global.explanation')}
                placeholder={t('global.explanationOfDeclineReason')}
                name="declineReason"
                value={declineReasonText}
                onChange={(e) => handleDeclineReasonTextChange(e.target.value)}
                size="sm"
                required
                error={formErrors['declineReason']}
              />
            </div>
          </>
        )}
      </form>
    </Modal>
  );
};

export default ChangeAssignmentStatusModal;
