/* eslint-disable max-classes-per-file */
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CheckoutInvoice {
  @Field(() => Boolean, {
    description: 'Indicates if the checkout invoice creation was successful',
  })
  isSuccessful: boolean;

  @Field(() => String)
  token: string;
}

@ObjectType()
export class CheckoutInvoiceDetails {
  @Field(() => String)
  invoiceId: string;

  @Field(() => Int)
  value: number;

  @Field(() => Int)
  tax: number;

  @Field(() => String)
  currency: string;

  @Field(() => String)
  itemName: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  itemId: string;

  @Field(() => String)
  productId: string;
}
