import { Field, ObjectType } from '@nestjs/graphql';
import { RegisterOutput } from '../register/register.output';

@ObjectType()
export class CheckTokenOutput extends RegisterOutput {
  @Field(() => Boolean, { nullable: true })
  confirmed!: boolean;
}
