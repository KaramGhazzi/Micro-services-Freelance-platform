import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class CheckoutScalarWhereInput {

    @Field(() => [CheckoutScalarWhereInput], {nullable:true})
    AND?: Array<CheckoutScalarWhereInput>;

    @Field(() => [CheckoutScalarWhereInput], {nullable:true})
    OR?: Array<CheckoutScalarWhereInput>;

    @Field(() => [CheckoutScalarWhereInput], {nullable:true})
    NOT?: Array<CheckoutScalarWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    planId?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    companyId?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    token?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    sessionId?: StringFilter;
}
