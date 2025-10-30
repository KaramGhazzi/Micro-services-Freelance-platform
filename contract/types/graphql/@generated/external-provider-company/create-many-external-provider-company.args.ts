import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ExternalProviderCompanyCreateManyInput } from './external-provider-company-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyExternalProviderCompanyArgs {

    @Field(() => [ExternalProviderCompanyCreateManyInput], {nullable:false})
    @Type(() => ExternalProviderCompanyCreateManyInput)
    data!: Array<ExternalProviderCompanyCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
