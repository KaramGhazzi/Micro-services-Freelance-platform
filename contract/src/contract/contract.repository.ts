import { PrismaClient } from '@freelance/contract/client';
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma/dist/custom';

@Injectable()
export class ContractRepository {
  public constructor(
    @Inject('PrismaServiceContract')
    private readonly prismaService: CustomPrismaService<PrismaClient>
  ) {}

  findFirstOrThrow = this.prismaService.client.contract.findFirstOrThrow;

  findFirst = this.prismaService.client.contract.findFirst;

  create = this.prismaService.client.contract.create;

  createMany = this.prismaService.client.contract.createMany;

  findUnique = this.prismaService.client.contract.findUnique;

  update = this.prismaService.client.contract.update;

  findMany = this.prismaService.client.contract.findMany;
}
