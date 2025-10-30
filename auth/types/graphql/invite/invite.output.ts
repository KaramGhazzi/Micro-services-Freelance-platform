import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InviteOutput {
  @Field(() => String, { nullable: false })
  success!: boolean;
}
