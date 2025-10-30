import { ObjectType, Field } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function StripeApiList<T>(ItemType: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class ApiListClass {
    @Field(() => String, { nullable: false })
    object: 'list';

    @Field(() => [ItemType])
    data: T[];

    @Field(() => Boolean, { nullable: false })
    has_more: boolean;

    @Field(() => String, { nullable: false })
    url: string;
  }

  return ApiListClass;
}
