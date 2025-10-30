import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PlanCreateManyProductInput } from './plan-create-many-product.input';
import { Type } from 'class-transformer';

@InputType()
export class PlanCreateManyProductInputEnvelope {

    @Field(() => [PlanCreateManyProductInput], {nullable:false})
    @Type(() => PlanCreateManyProductInput)
    data!: Array<PlanCreateManyProductInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
