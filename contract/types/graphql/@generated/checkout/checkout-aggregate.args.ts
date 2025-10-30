import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CheckoutWhereInput } from './checkout-where.input';
import { Type } from 'class-transformer';
import { CheckoutOrderByWithRelationInput } from './checkout-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CheckoutCountAggregateInput } from './checkout-count-aggregate.input';
import { CheckoutAvgAggregateInput } from './checkout-avg-aggregate.input';
import { CheckoutSumAggregateInput } from './checkout-sum-aggregate.input';
import { CheckoutMinAggregateInput } from './checkout-min-aggregate.input';
import { CheckoutMaxAggregateInput } from './checkout-max-aggregate.input';

@ArgsType()
export class CheckoutAggregateArgs {

    @Field(() => CheckoutWhereInput, {nullable:true})
    @Type(() => CheckoutWhereInput)
    where?: CheckoutWhereInput;

    @Field(() => [CheckoutOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<CheckoutOrderByWithRelationInput>;

    @Field(() => CheckoutWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => CheckoutCountAggregateInput, {nullable:true})
    _count?: CheckoutCountAggregateInput;

    @Field(() => CheckoutAvgAggregateInput, {nullable:true})
    _avg?: CheckoutAvgAggregateInput;

    @Field(() => CheckoutSumAggregateInput, {nullable:true})
    _sum?: CheckoutSumAggregateInput;

    @Field(() => CheckoutMinAggregateInput, {nullable:true})
    _min?: CheckoutMinAggregateInput;

    @Field(() => CheckoutMaxAggregateInput, {nullable:true})
    _max?: CheckoutMaxAggregateInput;
}
