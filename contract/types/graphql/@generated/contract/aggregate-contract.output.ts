import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ContractCountAggregate } from './contract-count-aggregate.output';
import { ContractAvgAggregate } from './contract-avg-aggregate.output';
import { ContractSumAggregate } from './contract-sum-aggregate.output';
import { ContractMinAggregate } from './contract-min-aggregate.output';
import { ContractMaxAggregate } from './contract-max-aggregate.output';

@ObjectType()
export class AggregateContract {

    @Field(() => ContractCountAggregate, {nullable:true})
    _count?: ContractCountAggregate;

    @Field(() => ContractAvgAggregate, {nullable:true})
    _avg?: ContractAvgAggregate;

    @Field(() => ContractSumAggregate, {nullable:true})
    _sum?: ContractSumAggregate;

    @Field(() => ContractMinAggregate, {nullable:true})
    _min?: ContractMinAggregate;

    @Field(() => ContractMaxAggregate, {nullable:true})
    _max?: ContractMaxAggregate;
}
