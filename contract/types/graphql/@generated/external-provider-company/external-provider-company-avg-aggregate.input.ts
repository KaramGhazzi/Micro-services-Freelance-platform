import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ExternalProviderCompanyAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    companyId?: true;
}
