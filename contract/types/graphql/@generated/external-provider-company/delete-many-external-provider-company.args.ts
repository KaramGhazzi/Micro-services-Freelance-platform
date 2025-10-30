import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ExternalProviderCompanyWhereInput } from './external-provider-company-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyExternalProviderCompanyArgs {

    @Field(() => ExternalProviderCompanyWhereInput, {nullable:true})
    @Type(() => ExternalProviderCompanyWhereInput)
    where?: ExternalProviderCompanyWhereInput;
}
