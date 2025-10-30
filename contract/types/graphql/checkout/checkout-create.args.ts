import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { CheckoutCreateInput } from './checkout-create.input';

@ArgsType()
export class CheckoutCreateArgs {
  @Field(() => Object, { nullable: true })
  select?: Prisma.CheckoutSelect | null;

  @Field(() => CheckoutCreateInput, { nullable: false })
  data: CheckoutCreateInput;
}
