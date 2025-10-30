import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PlanWhereInput } from './plan-where.input';
import { Type } from 'class-transformer';
import { PlanOrderByWithRelationInput } from './plan-order-by-with-relation.input';
import { Prisma } from '@freelance/contract/client';
import { PlanWhereUniqueInput } from './plan-where-unique.input';
import { Int } from '@nestjs/graphql';
import { PlanScalarFieldEnum } from './plan-scalar-field.enum';

@ArgsType()
export class FindManyPlanArgs {

    @Field(() => PlanWhereInput, {nullable:true})
    @Type(() => PlanWhereInput)
    where?: PlanWhereInput;

    @Field(() => [PlanOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<PlanOrderByWithRelationInput>;

    @Field(() => PlanWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<PlanWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [PlanScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof PlanScalarFieldEnum>;
}
