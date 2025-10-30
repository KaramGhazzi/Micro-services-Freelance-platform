import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StripeProductMetadata {
  @Field(() => Number, { nullable: true })
  order?: number;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  source?: string;
}
