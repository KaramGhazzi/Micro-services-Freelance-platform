import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@freelance/contract/client';
import { CustomPrismaService } from 'nestjs-prisma/dist/custom';

@Injectable()
export class ProductRepository {
  private products = [];

  public constructor(
    @Inject('PrismaServiceContract')
    private readonly prismaService: CustomPrismaService<PrismaClient>
  ) {}

  findUnique = this.prismaService.client.product.findUnique;

  findMany = this.prismaService.client.product.findMany;

  create = this.prismaService.client.product.create;

  update = this.prismaService.client.product.update;
}
