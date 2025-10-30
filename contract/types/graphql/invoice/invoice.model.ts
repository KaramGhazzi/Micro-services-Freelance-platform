import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Status } from '../../../src/invoice/invoice.service';

@ObjectType()
export class Invoice {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  status: Status;

  @Field(() => Date, { nullable: true })
  date: Date;

  @Field(() => Float, { nullable: true })
  priceInclVat: number;

  @Field(() => Float, { nullable: true })
  priceExVat: number;

  @Field(() => String, { nullable: true })
  downloadLink: string;

  @Field(() => String, { nullable: true })
  subscription: string;
}
