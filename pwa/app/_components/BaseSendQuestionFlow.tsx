import React, { useContext, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getImageUrl } from '../(dashboard)/_utils/getImageUrl';
import FeatureFlagContext from '../(dashboard)/_context/FeatureFlagContext';
import BaseButton from './BaseButton';
import Modal from './BaseDialog';
import BaseTextarea from './BaseTextarea';
import BaseConfirmationIcon from './BaseConfirmationIcon';
import BaseHeading from './BaseHeading';
import BaseUserAvatar from './BaseUserAvatar';
import BaseAlert from './BaseAlert';
import { Assignment } from '@/graphql/types';
import { useCreateQuestionAssignmentApplicationMutation } from '@/graphql/mutations/assignment-applications/createQuestionAssignmentApplication.generated';

type Props = Readonly<{
  assignment: Assignment | undefined;
  isCreateQuestionModalOpen: boolean;
  onError?: (error: unknown) => unknown;
  setCreateQuestionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>;

const BaseSendQuestionFlow = ({
  assignment,
  isCreateQuestionModalOpen,
  onError,
  setCreateQuestionModalOpen,
}: Props) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [createQuestionAssignmentApplicationMutation] =
    useCreateQuestionAssignmentApplicationMutation();

  const { talkjsEnabled } = useContext(FeatureFlagContext);
  const [content, setContent] = useState<string>('');

  const contentMinLength = 10;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value } = e.target;
    setContent(value);
  };

  const submitQuestion = async () => {
    try {
      setLoading(true);
      const response = await createQuestionAssignmentApplicationMutation({
        variables: {
          assignmentId: Number(assignment?.id),
          questionText: content,
        },
      });

      if (response?.data?.createQuestionAssignmentApplication) {
        setConfirmationModalIsOpen(true);
        setCreateQuestionModalOpen(false);
      }
    } catch (e) {
      console.error(e);
      onError?.(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isCreateQuestionModalOpen}
        onClose={() => setCreateQuestionModalOpen(false)}
        title={t('assignment.modal.askQuestion.title', {
          name: `${assignment?.owner.firstName} ${assignment?.owner.lastName}`,
        })}
        footer={
          <>
            <BaseButton
              onClick={() => setCreateQuestionModalOpen(false)}
              theme="secondary"
              size="md"
            >
              {t('global.cancel')}
            </BaseButton>
            <BaseButton
              theme="primary"
              size="md"
              loading={loading}
              disabled={content.length < contentMinLength || loading}
              onClick={submitQuestion}
            >
              {t('assignment.modal.askQuestion.save')}
            </BaseButton>
          </>
        }
      >
        <div className="grid gap-8">
          <BaseAlert
            alertDisabled={talkjsEnabled}
            title={t('chat.questionInactive.title')}
            text={t('chat.questionInactive.description')}
            theme="warning"
          />
          <div className="flex">
            <div className="mr-4">
              <BaseUserAvatar
                url={
                  assignment?.owner.profilePhoto
                    ? getImageUrl(
                        assignment?.owner.profilePhoto.container,
                        assignment?.owner.profilePhoto.blobName
                      )
                    : null
                }
                size="md"
              />
            </div>
            <div className="flex flex-col justify-center">
              <strong className="text-sm font-semibold text-neutral-900">
                {`${assignment?.owner.firstName} ${assignment?.owner.lastName}`}
              </strong>
              <p className="text-sm text-neutral-700">
                {`${assignment?.company.name}`}
              </p>
            </div>
          </div>

          <BaseTextarea
            label={t('assignment.modal.askQuestion.content.label')}
            placeholder={t('assignment.modal.askQuestion.content.placeholder')}
            name="content"
            value={content}
            onChange={handleInputChange}
            size="sm"
            minLength={contentMinLength}
            helper={t('assignment.modal.askQuestion.content.helper', {
              min: contentMinLength,
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
            {t('assignment.modal.askQuestion.confirm.title')}
          </BaseHeading>
          <p className="text-neutral-700">
            {t('assignment.modal.askQuestion.confirm.description')}
          </p>
        </div>
        <div className="grid gap-4">
          <BaseButton
            wide
            size="lg"
            onClick={() => setConfirmationModalIsOpen(false)}
          >
            {t('assignment.modal.askQuestion.backToAssignment')}
          </BaseButton>
          <div className="text-center">
            <Link
              href="/chat"
              className="font-medium text-neutral-900 hover:underline"
            >
              {t('assignment.modal.askQuestion.toChat')}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BaseSendQuestionFlow;
