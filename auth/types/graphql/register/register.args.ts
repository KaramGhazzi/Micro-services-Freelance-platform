import { ArgsType, Field } from '@nestjs/graphql';
import { CreateUserEventUserRole } from '@package/types/dist/events';
import { PrivacySettings } from './privacy-settings.input';

@ArgsType()
export class RegisterArgs {
  @Field(() => String, { nullable: false })
  firstName!: string;

  @Field(() => String, { nullable: false })
  lastName!: string;

  @Field(() => String, { nullable: false })
  phoneNumber!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => PrivacySettings, { nullable: false })
  privacySettings!: PrivacySettings;

  @Field(() => String, { nullable: false })
  role: CreateUserEventUserRole;
}
