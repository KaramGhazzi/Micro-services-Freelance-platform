import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductSlug } from '@freelance/contract/client';

@ObjectType()
export class Credit {
  @Field(() => String, { nullable: false })
  usageType?: string;

  @Field(() => Int, { nullable: false })
  amount: number;

  @Field(() => Date, { nullable: true })
  refreshDate?: Date | string;

  @Field(() => Int, { nullable: false })
  contractAmount: number;

  @Field(() => String, { nullable: true })
  productSlug?: ProductSlug;

  @Field(() => Date, { nullable: true })
  contractStartDate?: Date | string;

  @Field(() => Date, { nullable: true })
  contractEndDate?: Date | string;
}
