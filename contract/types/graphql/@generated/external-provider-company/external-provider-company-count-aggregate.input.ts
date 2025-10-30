import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ExternalProviderCompanyCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    companyId?: true;

    @Field(() => Boolean, {nullable:true})
    externalProviderId?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
