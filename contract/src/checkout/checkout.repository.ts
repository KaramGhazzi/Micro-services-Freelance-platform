import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@freelance/contract/client';
import { CustomPrismaService } from 'nestjs-prisma/dist/custom';

@Injectable()
export class CheckoutRepository {
  public constructor(
    @Inject('PrismaServiceContract')
    private readonly prismaService: CustomPrismaService<PrismaClient>
  ) {}

  create = this.prismaService.client.checkout.create;

  findFirstOrThrow = this.prismaService.client.checkout.findFirstOrThrow;

  findUnique = this.prismaService.client.checkout.findUnique;

  findUniqueOrThrow = this.prismaService.client.checkout.findUniqueOrThrow;

  delete = this.prismaService.client.checkout.delete;
}
