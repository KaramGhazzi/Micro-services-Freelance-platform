import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@freelance/contract/client';
import { CustomPrismaService } from 'nestjs-prisma/dist/custom';

@Injectable()
export class UsageRepository {
  public constructor(
    @Inject('PrismaServiceContract')
    private readonly prismaService: CustomPrismaService<PrismaClient>
  ) {}

  aggregate = this.prismaService.client.usage.aggregate;

  create = this.prismaService.client.usage.create;

  findFirst = this.prismaService.client.usage.findFirst;

  company = async (companyId: number, usageType, since: Date) => {
    const {
      _sum: { amount },
    } = await this.prismaService.client.usage.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        companyId,
        type: usageType,
        created: {
          gte: since,
        },
      },
    });

    return amount ?? 0;
  };
}
