import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanCreateWithoutProductInput } from './plan-create-without-product.input';
import { Type } from 'class-transformer';
import { PlanCreateOrConnectWithoutProductInput } from './plan-create-or-connect-without-product.input';
import { PlanCreateManyProductInputEnvelope } from './plan-create-many-product-input-envelope.input';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';

@InputType()
export class PlanCreateNestedManyWithoutProductInput {

    @Field(() => [PlanCreateWithoutProductInput], {nullable:true})
    @Type(() => PlanCreateWithoutProductInput)
    create?: Array<PlanCreateWithoutProductInput>;

    @Field(() => [PlanCreateOrConnectWithoutProductInput], {nullable:true})
    @Type(() => PlanCreateOrConnectWithoutProductInput)
    connectOrCreate?: Array<PlanCreateOrConnectWithoutProductInput>;

    @Field(() => PlanCreateManyProductInputEnvelope, {nullable:true})
    @Type(() => PlanCreateManyProductInputEnvelope)
    createMany?: PlanCreateManyProductInputEnvelope;

    @Field(() => [PlanWhereUniqueInput], {nullable:true})
    @Type(() => PlanWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<PlanWhereUniqueInput, 'id'>>;
}
