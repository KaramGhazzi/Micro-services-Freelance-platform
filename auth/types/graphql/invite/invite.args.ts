import { ArgsType, Field } from '@nestjs/graphql';
import { UserCompanyRole } from '@package/types/dist/class-validator/@generated/enums';

@ArgsType()
export class InviteArgs {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  userCompanyRole!: UserCompanyRole;

  @Field(() => Number, { nullable: true })
  companyId: number;

  @Field(() => String, { nullable: true })
  message: string;
}
