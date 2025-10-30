import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutCreateManyCompanyInput } from './checkout-create-many-company.input';
import { Type } from 'class-transformer';

@InputType()
export class CheckoutCreateManyCompanyInputEnvelope {

    @Field(() => [CheckoutCreateManyCompanyInput], {nullable:false})
    @Type(() => CheckoutCreateManyCompanyInput)
    data!: Array<CheckoutCreateManyCompanyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
