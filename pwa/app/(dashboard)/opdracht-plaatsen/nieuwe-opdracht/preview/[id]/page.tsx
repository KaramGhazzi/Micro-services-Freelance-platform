'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import BaseButton from '@/app/_components/BaseButton';
import IconClipboardCheck from '@/app/_components/icons/IconClipboardCheck';
import IconPencilAlt from '@/app/_components/icons/IconPencilAlt';
import IconTrash from '@/app/_components/icons/IconTrash';
import BaseToolbarSub from '@/app/_components/toolbar/BaseToolbar';
import BaseAssignmentDetail from '@/app/_components/assignment/BaseAssignmentDetail';
import Modal from '@/app/_components/BaseDialog';
import BaseHeading from '@/app/_components/BaseHeading';
import IconCheckmarkMd from '@/app/_components/icons/IconCheckmarkMd';
import { useRequestAssignmentReviewMutation } from '@/graphql/mutations/assignments/requestAssignmentReview.generated';
import AssignmentDeleteModal from '@/app/_components/assignment/AssignmentDeleteModal';
import { useGetMyAssignmentQuery } from '@/graphql/queries/assignments/getMyAssignment.generated';
import { AssignmentCompanyAside } from '@/app/_components/assignment/AssignmentCompanyAside';
import TopBoxEmployers from '@/app/_components/TopBoxEmployers';

export default function Page({ params }: { params: { id: number } }) {
  //params.id is the id of the assignment
  const t = useTranslations('assignment');

  const { data } = useGetMyAssignmentQuery({
    variables: {
      where: { id: { equals: Number(params.id) } },
    },
  });

  const [saverequestAssignmentReviewMutation] =
    useRequestAssignmentReviewMutation();

  let [isOpen, setIsOpen] = useState(false);

  let [removeAssignmentModalIsOpen, setRemoveAssignmentModalIsOpen] =
    useState<boolean>(false);

  function closeConfirmModal() {
    setIsOpen(false);
  }

  function openConfirmModal() {
    saverequestAssignmentReviewMutation({
      variables: { assignmentId: Number(params.id) },
    });
    setIsOpen(true);
  }

  return (
    <>
      <BaseToolbarSub
        title={`Preview: ${data?.assignment?.title ?? ''}`}
        overtitle={t('toolbar.newAssignment')}
      >
        <BaseButton
          theme="secondary"
          square
          onClick={() => setRemoveAssignmentModalIsOpen(true)}
        >
          <IconTrash />
        </BaseButton>
        <BaseButton
          theme="secondary"
          wide
          href={`/opdracht-plaatsen/nieuwe-opdracht/bewerken/${data?.assignment?.id}`}
        >
          <IconPencilAlt className="hidden sm:flex" />
          <span>{t('toolbar.edit')}</span>
        </BaseButton>
        <BaseButton wide onClick={openConfirmModal}>
          <IconClipboardCheck className="hidden sm:flex" />
          <span>{t('toolbar.inspection')}</span>
        </BaseButton>
      </BaseToolbarSub>

      {data?.assignment && (
        <BaseAssignmentDetail
          assignment={data.assignment}
          hideViewsAndComments
          asideComponent={
            <>
              <AssignmentCompanyAside assignment={data.assignment} />
              <TopBoxEmployers />
            </>
          }
        />
      )}
      <AssignmentDeleteModal
        assignmentId={params.id}
        isOpen={removeAssignmentModalIsOpen}
        onClose={() => setRemoveAssignmentModalIsOpen(false)}
      />
      <Modal isOpen={isOpen} onClose={closeConfirmModal}>
        <div className="flex justify-center">
          <i className="bg-success-50 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="bg-success-100 flex h-14 w-14 items-center justify-center rounded-full">
              <IconCheckmarkMd className="text-success-500 h-10 w-10" />
            </span>
          </i>
        </div>
        <div className="mb-8 grid gap-1 text-center">
          <BaseHeading type="h2" size="base">
            {t('confirmModal.title')}
          </BaseHeading>
          <p>{t('confirmModal.description')}</p>
        </div>
        <BaseButton
          onClick={() => closeConfirmModal()}
          href="/opdracht-plaatsen/mijn-opdrachten"
          wide
        >
          {t('confirmModal.goToMyAssignments')}
        </BaseButton>
      </Modal>
    </>
  );
}
