import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PrivacySettings {
  @Field(() => Boolean, { nullable: false })
  informEmployersAnonymouslyWhenMatched!: boolean;

  @Field(() => Boolean, { nullable: false })
  provideEmployersWithCvWhenMatched!: boolean;

  @Field(() => Boolean, { nullable: false })
  informAboutProductsAndServices!: boolean;

  @Field(() => Boolean, { nullable: false })
  shareWithMotherAndSisterCompanies!: boolean;

  @Field(() => Boolean, { nullable: false })
  sendNewsletter!: boolean;

  @Field(() => Boolean, { nullable: false })
  askForFeedback!: boolean;

  @Field(() => Boolean, { nullable: false })
  sendContent!: boolean;
}
