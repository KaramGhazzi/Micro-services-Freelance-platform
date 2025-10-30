import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ExternalProviderCompanyWhereInput } from './external-provider-company-where.input';

@InputType()
export class ExternalProviderCompanyRelationFilter {

    @Field(() => ExternalProviderCompanyWhereInput, {nullable:true})
    is?: ExternalProviderCompanyWhereInput;

    @Field(() => ExternalProviderCompanyWhereInput, {nullable:true})
    isNot?: ExternalProviderCompanyWhereInput;
}
