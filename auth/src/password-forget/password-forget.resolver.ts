import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Public } from '@package/authorization';
import { PasswordForgetService } from './password-forget.service';
import { PasswordResetArgs } from '../../types/graphql/password/password-reset.args';
import { PasswordResetOutput } from '../../types/graphql/password/password-reset.output';
import { PasswordForgetOutput } from '../../types/graphql/password/password-forget.output';

@Resolver()
export class PasswordForgetResolver {
  constructor(private readonly passwordForgetService: PasswordForgetService) {}

  @Mutation(() => PasswordResetOutput)
  @Public()
  async resetPassword(@Args() args: PasswordResetArgs) {
    return this.passwordForgetService.resetPassword(args.token, args.password);
  }

  @Mutation(() => PasswordForgetOutput)
  async sendPasswordResetEmail(@Args('email') email: string) {
    return this.passwordForgetService.initiatePasswordReset(email);
  }
}
