import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@freelance/contract/client';
import { ExternalProviderCompanyWhereUniqueInput } from './external-provider-company-where-unique.input';
import { Type } from 'class-transformer';
import { ExternalProviderCompanyCreateWithoutCheckoutInput } from './external-provider-company-create-without-checkout.input';

@InputType()
export class ExternalProviderCompanyCreateOrConnectWithoutCheckoutInput {

    @Field(() => ExternalProviderCompanyWhereUniqueInput, {nullable:false})
    @Type(() => ExternalProviderCompanyWhereUniqueInput)
    where!: Prisma.AtLeast<ExternalProviderCompanyWhereUniqueInput, 'companyId' | 'externalProviderId'>;

    @Field(() => ExternalProviderCompanyCreateWithoutCheckoutInput, {nullable:false})
    @Type(() => ExternalProviderCompanyCreateWithoutCheckoutInput)
    create!: ExternalProviderCompanyCreateWithoutCheckoutInput;
}
