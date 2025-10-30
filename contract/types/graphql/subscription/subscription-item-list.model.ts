import { ObjectType } from '@nestjs/graphql';
import { StripeSubscriptionItem } from './subscription-item.model';
import { StripeApiList } from '../shared/api-list.model';

@ObjectType()
export class StripeSubscriptionItemList extends StripeApiList(
  StripeSubscriptionItem
) {}
