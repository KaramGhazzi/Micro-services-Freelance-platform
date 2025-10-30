import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class CheckoutScalarWhereWithAggregatesInput {

    @Field(() => [CheckoutScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<CheckoutScalarWhereWithAggregatesInput>;

    @Field(() => [CheckoutScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<CheckoutScalarWhereWithAggregatesInput>;

    @Field(() => [CheckoutScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<CheckoutScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    planId?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    companyId?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    token?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    sessionId?: StringWithAggregatesFilter;
}
