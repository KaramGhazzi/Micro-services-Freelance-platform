import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ExternalProviderCompanyWhereInput } from './external-provider-company-where.input';
import { Type } from 'class-transformer';
import { ExternalProviderCompanyUpdateWithoutCheckoutInput } from './external-provider-company-update-without-checkout.input';

@InputType()
export class ExternalProviderCompanyUpdateToOneWithWhereWithoutCheckoutInput {

    @Field(() => ExternalProviderCompanyWhereInput, {nullable:true})
    @Type(() => ExternalProviderCompanyWhereInput)
    where?: ExternalProviderCompanyWhereInput;

    @Field(() => ExternalProviderCompanyUpdateWithoutCheckoutInput, {nullable:false})
    @Type(() => ExternalProviderCompanyUpdateWithoutCheckoutInput)
    data!: ExternalProviderCompanyUpdateWithoutCheckoutInput;
}
