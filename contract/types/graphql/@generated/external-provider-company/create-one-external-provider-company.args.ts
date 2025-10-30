import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ExternalProviderCompanyCreateInput } from './external-provider-company-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneExternalProviderCompanyArgs {

    @Field(() => ExternalProviderCompanyCreateInput, {nullable:false})
    @Type(() => ExternalProviderCompanyCreateInput)
    data!: ExternalProviderCompanyCreateInput;
}
