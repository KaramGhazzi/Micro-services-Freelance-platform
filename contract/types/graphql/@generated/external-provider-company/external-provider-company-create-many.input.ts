import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class ExternalProviderCompanyCreateManyInput {

    @Field(() => Int, {nullable:false})
    companyId!: number;

    @Field(() => String, {nullable:true})
    externalProviderId?: string;
}
