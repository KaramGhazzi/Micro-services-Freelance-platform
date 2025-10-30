import { Prisma } from '@freelance/contract/client';
import { PrismaSelect } from '@package/prisma-select';
import { GraphQLResolveInfo } from 'graphql';
import { DMMF } from '@prisma/generator-helper';

/**
 * DMMF document from Prisma Client
 */
const dmmf = Prisma.dmmf as DMMF.Document;

/**
 * generates Prisma select based on graphql field selection
 * @param info
 * @returns <T>
 */
export function graphqlSelect<T>(
  info: GraphQLResolveInfo,
  modelName: string = null
): T {
  if (modelName) {
    return new PrismaSelect(info, {
      dmmf: [dmmf],
    }).valueWithFilter(modelName).select;
  }

  return new PrismaSelect(info, { dmmf: [dmmf] }).value.select;
}
