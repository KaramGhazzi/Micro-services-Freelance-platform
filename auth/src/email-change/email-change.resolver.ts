import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { EmailChangeService } from './email-change.service';
import { RequestEmailChangeOutput } from '../../types/graphql/email-change/request-email-change-output';
import { LoginOutput } from '../../types/graphql/login/login.output';

@Resolver()
export class EmailChangeResolver {
  constructor(private readonly emailChangeService: EmailChangeService) {}

  @Query(() => RequestEmailChangeOutput)
  async checkEmailChange(
    @Args({ name: 'token', type: () => String }) token: string
  ) {
    return this.emailChangeService.checkEmailChange(token);
  }

  @Mutation(() => LoginOutput)
  async verifyEmailChange(
    @Args({ name: 'token', type: () => String }) token: string,
    @Args({ name: 'password', type: () => String }) password: string
  ) {
    return this.emailChangeService.verifyEmailChange(token, password);
  }
}
