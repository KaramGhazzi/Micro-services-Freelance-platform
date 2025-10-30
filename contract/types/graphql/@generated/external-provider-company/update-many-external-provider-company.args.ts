import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ExternalProviderCompanyUpdateManyMutationInput } from './external-provider-company-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ExternalProviderCompanyWhereInput } from './external-provider-company-where.input';

@ArgsType()
export class UpdateManyExternalProviderCompanyArgs {

    @Field(() => ExternalProviderCompanyUpdateManyMutationInput, {nullable:false})
    @Type(() => ExternalProviderCompanyUpdateManyMutationInput)
    data!: ExternalProviderCompanyUpdateManyMutationInput;

    @Field(() => ExternalProviderCompanyWhereInput, {nullable:true})
    @Type(() => ExternalProviderCompanyWhereInput)
    where?: ExternalProviderCompanyWhereInput;
}
