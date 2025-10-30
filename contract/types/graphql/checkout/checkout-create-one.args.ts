import { ArgsType, Field } from '@nestjs/graphql';
import { CheckoutCreateInput } from './checkout-create.input';

@ArgsType()
export class CheckoutCreateOneArgs {
  @Field(() => CheckoutCreateInput, { nullable: false })
  data!: CheckoutCreateInput;
}
