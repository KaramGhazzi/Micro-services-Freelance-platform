import { PrismaClient } from '@freelance/contract/client';
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma/dist/custom';

@Injectable()
export class PlanRepository {
  public constructor(
    @Inject('PrismaServiceContract')
    private readonly prismaService: CustomPrismaService<PrismaClient>
  ) {}

  findFirst = this.prismaService.client.plan.findFirst;

  findUnique = this.prismaService.client.plan.findUnique;

  findUniqueOrThrow = this.prismaService.client.plan.findUniqueOrThrow;

  findMany = this.prismaService.client.plan.findMany;

  update = this.prismaService.client.plan.update;

  updateMany = this.prismaService.client.plan.updateMany;
}
