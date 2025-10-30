'use client';
import TagManager from 'react-gtm-module';
import { getCookie } from 'cookies-next';
import { useHubSpotEventMutation } from '@/graphql/mutations/hubspot/hubSpotEvent.generated';

export enum EventName {
  SIGN_UP_ACCOUNTINFO = 'sign_up_accountinfo',
  SIGN_UP = 'sign_up',
  SIGN_UP_CONFIRM = 'sign_up_confirm',
  SIGN_UP_CONFIRMED = 'sign_up_confirmed',
  SIGN_UP_ACCOUNTTYPE = 'sign_up_accounttype',
  SIGN_UP_ACCOUNTTYPE_DONE = 'sign_up_accounttype_done',
  SIGN_UP_COMPANYINFO = 'sign_up_companyinfo',
  SIGN_UP_FINALIZED = 'sign_up_finalized',

  VIEW_ITEM_LIST = 'view_item_list',
  SELECT_ITEM = 'select_item',
  VIEW_ITEM = 'view_item',
  ADD_TO_CART = 'add_to_cart',
  BEGIN_CHECKOUT = 'begin_checkout',
  VIEW_PAYMENT_INFO = 'view_payment_info',
  PAYMENT_SELECT = 'payment_select',
  BEGIN_PAYMENT = 'begin_payment',
  PURCHASE = 'purchase',
  VIEW_QUOTE = 'view_quote',
  QUOTE_SUBMIT = 'quote_submit',
}

export default function useEventTracker() {
  const [hubspotMutation] = useHubSpotEventMutation();
  const hubspotUTK = getCookie('hubspotutk');

  const handleHubspotMutation = (eventName: string | null | undefined) => {
    if (eventName && hubspotUTK) {
      hubspotMutation({
        variables: {
          eventName,
          utk: hubspotUTK,
        },
      });
    }
  };

  const googleAnalyticsEvent = (data?: object) => {
    const tagManagerArgs = {
      dataLayer: {
        ...data,
      },
    };

    TagManager.dataLayer(tagManagerArgs);
  };

  return {
    handleHubspotMutation,
    googleAnalyticsEvent,
  };
}
