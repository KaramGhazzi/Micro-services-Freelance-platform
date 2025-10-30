import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ExternalProviderCompanyUpdateWithoutCheckoutInput } from './external-provider-company-update-without-checkout.input';
import { Type } from 'class-transformer';
import { ExternalProviderCompanyCreateWithoutCheckoutInput } from './external-provider-company-create-without-checkout.input';
import { ExternalProviderCompanyWhereInput } from './external-provider-company-where.input';

@InputType()
export class ExternalProviderCompanyUpsertWithoutCheckoutInput {

    @Field(() => ExternalProviderCompanyUpdateWithoutCheckoutInput, {nullable:false})
    @Type(() => ExternalProviderCompanyUpdateWithoutCheckoutInput)
    update!: ExternalProviderCompanyUpdateWithoutCheckoutInput;

    @Field(() => ExternalProviderCompanyCreateWithoutCheckoutInput, {nullable:false})
    @Type(() => ExternalProviderCompanyCreateWithoutCheckoutInput)
    create!: ExternalProviderCompanyCreateWithoutCheckoutInput;

    @Field(() => ExternalProviderCompanyWhereInput, {nullable:true})
    @Type(() => ExternalProviderCompanyWhereInput)
    where?: ExternalProviderCompanyWhereInput;
}
