import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanCreateWithoutProductInput } from './plan-create-without-product.input';
import { Type } from 'class-transformer';
import { PlanCreateOrConnectWithoutProductInput } from './plan-create-or-connect-without-product.input';
import { PlanUpsertWithWhereUniqueWithoutProductInput } from './plan-upsert-with-where-unique-without-product.input';
import { PlanCreateManyProductInputEnvelope } from './plan-create-many-product-input-envelope.input';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';
import { PlanUpdateWithWhereUniqueWithoutProductInput } from './plan-update-with-where-unique-without-product.input';
import { PlanUpdateManyWithWhereWithoutProductInput } from './plan-update-many-with-where-without-product.input';
import { PlanScalarWhereInput } from './plan-scalar-where.input';

@InputType()
export class PlanUpdateManyWithoutProductNestedInput {

    @Field(() => [PlanCreateWithoutProductInput], {nullable:true})
    @Type(() => PlanCreateWithoutProductInput)
    create?: Array<PlanCreateWithoutProductInput>;

    @Field(() => [PlanCreateOrConnectWithoutProductInput], {nullable:true})
    @Type(() => PlanCreateOrConnectWithoutProductInput)
    connectOrCreate?: Array<PlanCreateOrConnectWithoutProductInput>;

    @Field(() => [PlanUpsertWithWhereUniqueWithoutProductInput], {nullable:true})
    @Type(() => PlanUpsertWithWhereUniqueWithoutProductInput)
    upsert?: Array<PlanUpsertWithWhereUniqueWithoutProductInput>;

    @Field(() => PlanCreateManyProductInputEnvelope, {nullable:true})
    @Type(() => PlanCreateManyProductInputEnvelope)
    createMany?: PlanCreateManyProductInputEnvelope;

    @Field(() => [PlanWhereUniqueInput], {nullable:true})
    @Type(() => PlanWhereUniqueInput)
    set?: Array<Prisma.AtLeast<PlanWhereUniqueInput, 'id'>>;

    @Field(() => [PlanWhereUniqueInput], {nullable:true})
    @Type(() => PlanWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<PlanWhereUniqueInput, 'id'>>;

    @Field(() => [PlanWhereUniqueInput], {nullable:true})
    @Type(() => PlanWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<PlanWhereUniqueInput, 'id'>>;

    @Field(() => [PlanWhereUniqueInput], {nullable:true})
    @Type(() => PlanWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<PlanWhereUniqueInput, 'id'>>;

    @Field(() => [PlanUpdateWithWhereUniqueWithoutProductInput], {nullable:true})
    @Type(() => PlanUpdateWithWhereUniqueWithoutProductInput)
    update?: Array<PlanUpdateWithWhereUniqueWithoutProductInput>;

    @Field(() => [PlanUpdateManyWithWhereWithoutProductInput], {nullable:true})
    @Type(() => PlanUpdateManyWithWhereWithoutProductInput)
    updateMany?: Array<PlanUpdateManyWithWhereWithoutProductInput>;

    @Field(() => [PlanScalarWhereInput], {nullable:true})
    @Type(() => PlanScalarWhereInput)
    deleteMany?: Array<PlanScalarWhereInput>;
}
