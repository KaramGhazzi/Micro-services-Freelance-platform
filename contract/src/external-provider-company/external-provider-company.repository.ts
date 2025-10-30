import { PrismaClient } from '@freelance/contract/client';
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma/dist/custom';

@Injectable()
export class ExternalProviderCompanyRepository {
  public constructor(
    @Inject('PrismaServiceContract')
    private readonly prismaService: CustomPrismaService<PrismaClient>
  ) {}

  findUnique = this.prismaService.client.externalProviderCompany.findUnique;

  create = this.prismaService.client.externalProviderCompany.create;

  update = this.prismaService.client.externalProviderCompany.update;

  findFirstOrThrow =
    this.prismaService.client.externalProviderCompany.findFirstOrThrow;
}
