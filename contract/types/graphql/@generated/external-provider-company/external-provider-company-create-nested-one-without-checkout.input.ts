import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ExternalProviderCompanyCreateWithoutCheckoutInput } from './external-provider-company-create-without-checkout.input';
import { Type } from 'class-transformer';
import { ExternalProviderCompanyCreateOrConnectWithoutCheckoutInput } from './external-provider-company-create-or-connect-without-checkout.input';
import { Prisma } from '@freelance/contract/client';
import { ExternalProviderCompanyWhereUniqueInput } from './external-provider-company-where-unique.input';

@InputType()
export class ExternalProviderCompanyCreateNestedOneWithoutCheckoutInput {

    @Field(() => ExternalProviderCompanyCreateWithoutCheckoutInput, {nullable:true})
    @Type(() => ExternalProviderCompanyCreateWithoutCheckoutInput)
    create?: ExternalProviderCompanyCreateWithoutCheckoutInput;

    @Field(() => ExternalProviderCompanyCreateOrConnectWithoutCheckoutInput, {nullable:true})
    @Type(() => ExternalProviderCompanyCreateOrConnectWithoutCheckoutInput)
    connectOrCreate?: ExternalProviderCompanyCreateOrConnectWithoutCheckoutInput;

    @Field(() => ExternalProviderCompanyWhereUniqueInput, {nullable:true})
    @Type(() => ExternalProviderCompanyWhereUniqueInput)
    connect?: Prisma.AtLeast<ExternalProviderCompanyWhereUniqueInput, 'companyId' | 'externalProviderId'>;
}
