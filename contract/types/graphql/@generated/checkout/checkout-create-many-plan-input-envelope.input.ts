import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutCreateManyPlanInput } from './checkout-create-many-plan.input';
import { Type } from 'class-transformer';

@InputType()
export class CheckoutCreateManyPlanInputEnvelope {

    @Field(() => [CheckoutCreateManyPlanInput], {nullable:false})
    @Type(() => CheckoutCreateManyPlanInput)
    data!: Array<CheckoutCreateManyPlanInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
