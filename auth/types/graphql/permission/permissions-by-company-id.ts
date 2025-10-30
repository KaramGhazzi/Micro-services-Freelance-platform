import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PermissionsByCompanyId {
  @Field(() => Number, { nullable: false })
  companyId: number;

  @Field(() => [String], { nullable: false })
  permissions: string[];
}
