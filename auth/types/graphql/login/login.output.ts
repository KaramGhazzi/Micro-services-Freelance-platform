import { Field, ObjectType } from '@nestjs/graphql';
import { PermissionsByCompanyId } from '../permission/permissions-by-company-id';

@ObjectType()
export class LoginOutput {
  @Field(() => String, { nullable: false })
  idToken!: string;

  @Field(() => String, { nullable: false })
  refreshToken!: string;

  @Field(() => [PermissionsByCompanyId], { nullable: false })
  permissionsByCompany!: PermissionsByCompanyId[];
}
