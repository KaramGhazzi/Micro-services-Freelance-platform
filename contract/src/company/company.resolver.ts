import { Resolver, ResolveReference } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { ExecutionContext } from '@nestjs/common';
import { PrismaSelect } from '@package/prisma-select';
import { ContractRepository } from '../contract/contract.repository';
import { Company } from './company.entity';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly contractRepository: ContractRepository) {}

  @ResolveReference()
  async resolveReference(
    reference: { id: string; __typename: string },
    _ctx: ExecutionContext,
    info: GraphQLResolveInfo
  ) {
    // eslint-disable-next-line no-underscore-dangle
    if (!reference.__typename || reference.__typename !== 'Company') {
      return null;
    }

    const { select } = new PrismaSelect(info).value;
    select.id = true;

    if (!select?.contracts?.select) {
      return { id: Number(reference.id), contracts: [] };
    }

    const contracts = await this.contractRepository.findMany({
      where: {
        companyId: { equals: Number(reference.id) },
      },
      select: select.contracts.select,
    });

    return { id: Number(reference.id), contracts };
  }
}
