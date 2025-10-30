import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutCreateWithoutCompanyInput } from './checkout-create-without-company.input';
import { Type } from 'class-transformer';
import { CheckoutCreateOrConnectWithoutCompanyInput } from './checkout-create-or-connect-without-company.input';
import { CheckoutUpsertWithWhereUniqueWithoutCompanyInput } from './checkout-upsert-with-where-unique-without-company.input';
import { CheckoutCreateManyCompanyInputEnvelope } from './checkout-create-many-company-input-envelope.input';
import { Prisma } from '@freelance/contract/client';
import { CheckoutWhereUniqueInput } from './checkout-where-unique.input';
import { CheckoutUpdateWithWhereUniqueWithoutCompanyInput } from './checkout-update-with-where-unique-without-company.input';
import { CheckoutUpdateManyWithWhereWithoutCompanyInput } from './checkout-update-many-with-where-without-company.input';
import { CheckoutScalarWhereInput } from './checkout-scalar-where.input';

@InputType()
export class CheckoutUpdateManyWithoutCompanyNestedInput {

    @Field(() => [CheckoutCreateWithoutCompanyInput], {nullable:true})
    @Type(() => CheckoutCreateWithoutCompanyInput)
    create?: Array<CheckoutCreateWithoutCompanyInput>;

    @Field(() => [CheckoutCreateOrConnectWithoutCompanyInput], {nullable:true})
    @Type(() => CheckoutCreateOrConnectWithoutCompanyInput)
    connectOrCreate?: Array<CheckoutCreateOrConnectWithoutCompanyInput>;

    @Field(() => [CheckoutUpsertWithWhereUniqueWithoutCompanyInput], {nullable:true})
    @Type(() => CheckoutUpsertWithWhereUniqueWithoutCompanyInput)
    upsert?: Array<CheckoutUpsertWithWhereUniqueWithoutCompanyInput>;

    @Field(() => CheckoutCreateManyCompanyInputEnvelope, {nullable:true})
    @Type(() => CheckoutCreateManyCompanyInputEnvelope)
    createMany?: CheckoutCreateManyCompanyInputEnvelope;

    @Field(() => [CheckoutWhereUniqueInput], {nullable:true})
    @Type(() => CheckoutWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>>;

    @Field(() => [CheckoutWhereUniqueInput], {nullable:true})
    @Type(() => CheckoutWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>>;

    @Field(() => [CheckoutWhereUniqueInput], {nullable:true})
    @Type(() => CheckoutWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>>;

    @Field(() => [CheckoutWhereUniqueInput], {nullable:true})
    @Type(() => CheckoutWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CheckoutWhereUniqueInput, 'id' | 'token' | 'sessionId'>>;

    @Field(() => [CheckoutUpdateWithWhereUniqueWithoutCompanyInput], {nullable:true})
    @Type(() => CheckoutUpdateWithWhereUniqueWithoutCompanyInput)
    update?: Array<CheckoutUpdateWithWhereUniqueWithoutCompanyInput>;

    @Field(() => [CheckoutUpdateManyWithWhereWithoutCompanyInput], {nullable:true})
    @Type(() => CheckoutUpdateManyWithWhereWithoutCompanyInput)
    updateMany?: Array<CheckoutUpdateManyWithWhereWithoutCompanyInput>;

    @Field(() => [CheckoutScalarWhereInput], {nullable:true})
    @Type(() => CheckoutScalarWhereInput)
    deleteMany?: Array<CheckoutScalarWhereInput>;
}
