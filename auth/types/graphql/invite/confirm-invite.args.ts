import { ArgsType, Field } from '@nestjs/graphql';
import { PrivacySettings } from '../register/privacy-settings.input';

@ArgsType()
export class ConfirmInviteArgs {
  @Field(() => String, { nullable: false })
  inviteToken!: string;

  @Field(() => String, { nullable: false })
  firstName!: string;

  @Field(() => String, { nullable: false })
  lastName!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: false })
  phoneNumber!: string;

  @Field(() => Number, { nullable: true })
  companyId!: number;

  @Field(() => PrivacySettings, { nullable: false })
  privacySettings!: PrivacySettings;
}
