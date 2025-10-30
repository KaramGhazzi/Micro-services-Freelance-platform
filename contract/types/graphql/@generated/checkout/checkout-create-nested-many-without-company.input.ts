import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutCreateWithoutCompanyInput } from './checkout-create-without-company.input';
import { Type } from 'class-transformer';
import { CheckoutCreateOrConnectWithoutCompanyInput } from './checkout-create-or-connect-without-company.input';
import { CheckoutCreateManyCompanyInputEnvelope } from './checkout-create-many-company-input-envelope.input';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';

@InputType()
export class CheckoutCreateNestedManyWithoutCompanyInput {

    @Field(() => [CheckoutCreateWithoutCompanyInput], {nullable:true})
    @Type(() => CheckoutCreateWithoutCompanyInput)
    create?: Array<CheckoutCreateWithoutCompanyInput>;

    @Field(() => [CheckoutCreateOrConnectWithoutCompanyInput], {nullable:true})
    @Type(() => CheckoutCreateOrConnectWithoutCompanyInput)
    connectOrCreate?: Array<CheckoutCreateOrConnectWithoutCompanyInput>;

    @Field(() => CheckoutCreateManyCompanyInputEnvelope, {nullable:true})
    @Type(() => CheckoutCreateManyCompanyInputEnvelope)
    createMany?: CheckoutCreateManyCompanyInputEnvelope;

    @Field(() => [CheckoutWhereUniqueInput], {nullable:true})
    @Type(() => CheckoutWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>>;
}
