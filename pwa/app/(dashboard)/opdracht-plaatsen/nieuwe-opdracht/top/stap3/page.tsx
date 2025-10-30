'use client';
import React, { useContext, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCheckoutCreateMutation } from '@/graphql/mutations/checkout/createCheckout.generated';
import FeatureFlagContext from '@/app/(dashboard)/_context/FeatureFlagContext';
import { ProductSlug } from '@/graphql/types';
import { usePlansQuery } from '@/graphql/queries/plans/plans.generated';
import { useAuth } from '@/app/_hooks/useAuth';
import BaseButton from '@/app/_components/BaseButton';
import BasePlanCard from '@/app/_components/BasePlanCard';
import BaseAlert from '@/app/_components/BaseAlert';
import BaseToolbar from '@/app/_components/toolbar/BaseToolbar';
import Modal from '@/app/_components/BaseDialog';
import BaseCheckbox from '@/app/_components/BaseCheckbox';
import { useCheckoutInvoiceCreateMutation } from '@/graphql/mutations/checkout-invoice/createCheckoutInvoice.generated';
import useMountOnce from '@/app/_libs/useMountOnce';
import useEventTracker, { EventName } from '@/app/_libs/eventTracker';

export default function Step3() {
  const t = useTranslations();
  const router = useRouter();
  const { googleAnalyticsEvent } = useEventTracker();
  const [createCheckout] = useCheckoutCreateMutation();
  const { stripeEnabled } = useContext(FeatureFlagContext);
  const { currentCompanyId } = useAuth();
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get('amount'));
  const [confirmModalActive, setConfirmModalActive] = useState(false);
  const [afterPayConfirmed, setAfterPayConfirmed] = useState(false);

  const [checkoutInvoiceCreateMutation] = useCheckoutInvoiceCreateMutation();

  const { data: planData } = usePlansQuery({
    variables: {
      where: {
        usageAmount: { equals: amount },
        product: {
          is: {
            slug: { equals: ProductSlug.CompanyTop },
          },
        },
      },
    },
  });

  useMountOnce(() => {
    googleAnalyticsEvent({
      event: EventName.VIEW_PAYMENT_INFO,
    });
  });

  const handleAfterPay = async () => {
    googleAnalyticsEvent({
      event: EventName.PAYMENT_SELECT,
      value: 'AfterPay',
    });

    const { data } = await checkoutInvoiceCreateMutation({
      variables: {
        checkoutInvoiceCreateInput: {
          planId: Number(planData?.plans?.[0].id),
          quantity: amount,
        },
      },
    });

    if (data?.checkoutInvoiceCreate?.token) {
      router.push(
        `/betaling/bevestiging/achteraf-betalen/${data?.checkoutInvoiceCreate?.token}`
      );
    }
  };

  const handleDirectPay = () => {
    googleAnalyticsEvent({
      event: EventName.PAYMENT_SELECT,
      value: 'DirectPay',
    });

    createTopAssignmentCheckout();
  };

  const createTopAssignmentCheckout = async () => {
    if (amount === null || currentCompanyId === undefined) {
      return;
    }

    try {
      if (planData?.plans?.[0].id) {
        const { data } = await createCheckout({
          variables: {
            data: {
              planId: Number(planData?.plans?.[0].id),
              companyId: Number(currentCompanyId),
              quantity: amount,
            },
          },
        });

        if (data?.checkoutCreate?.session?.url) {
          window.location.href = data?.checkoutCreate?.session?.url;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!amount) {
    return router.push(`/opdracht-plaatsen/nieuwe-opdracht/top`);
  }

  return (
    <>
      <BaseToolbar
        title={t('payments.pickPaymentMethod.title')}
        subtitle={t('payments.pickPaymentMethod.description')}
      />

      {!stripeEnabled && (
        <div className="pb-6">
          <BaseAlert
            title={t('global.paymentNotPossibleTitle')}
            text={t('global.providerUnavailableText')}
            theme="warning"
            alertDisabled={stripeEnabled}
          />
        </div>
      )}

      <section className="grid w-full max-w-7xl gap-6 px-5 py-5 md:grid-cols-2 md:py-16 lg:px-10 xl:grid-cols-3">
        <BasePlanCard
          title={t('payments.pickPaymentMethod.instantPay.title')}
          description={t('payments.pickPaymentMethod.instantPay.description')}
          items={[
            t('payments.pickPaymentMethod.instantPay.usp1'),
            t('payments.pickPaymentMethod.instantPay.usp2'),
          ]}
        >
          <BaseButton wide onClick={() => handleDirectPay()}>
            {t('global.purchase')}
          </BaseButton>
        </BasePlanCard>

        <BasePlanCard
          title={t('payments.pickPaymentMethod.afterPay.title')}
          description={t('payments.pickPaymentMethod.afterPay.description')}
          items={[
            t('payments.pickPaymentMethod.afterPay.usp1'),
            t('payments.pickPaymentMethod.afterPay.usp2'),
          ]}
        >
          <BaseButton wide onClick={() => setConfirmModalActive(true)}>
            {t('global.purchase')}
          </BaseButton>
        </BasePlanCard>
      </section>

      <Modal
        isOpen={confirmModalActive}
        title={t('payments.pickPaymentMethod.confirmModal.title')}
        onClose={() => setConfirmModalActive(false)}
        footer={
          <>
            <BaseButton
              onClick={() => setConfirmModalActive(false)}
              theme="secondary"
            >
              {t('global.cancel')}
            </BaseButton>
            <BaseButton
              onClick={() => handleAfterPay()}
              theme="primary"
              disabled={!afterPayConfirmed}
            >
              {t('global.confirm')}
            </BaseButton>
          </>
        }
      >
        <div>
          <p className="mb-4">
            {t('payments.pickPaymentMethod.confirmModal.description')}
          </p>

          <BaseCheckbox
            name={'afterPayConfirmed'}
            checked={afterPayConfirmed}
            onChange={() => setAfterPayConfirmed(!afterPayConfirmed)}
            label={t('payments.pickPaymentMethod.confirmModal.confirmLabel')}
          ></BaseCheckbox>
        </div>
      </Modal>
    </>
  );
}
