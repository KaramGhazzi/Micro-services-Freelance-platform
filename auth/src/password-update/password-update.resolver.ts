import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { PasswordUpdateService } from './password-update.service';
import { PasswordUpdateArgs } from '../../types/graphql/password/password-update.args';
import { PasswordUpdateOutput } from '../../types/graphql/password/password-update.output';

@Resolver()
export class PasswordUpdateResolver {
  constructor(private readonly passwordUpdateService: PasswordUpdateService) {}

  @Mutation(() => PasswordUpdateOutput)
  async updatePassword(@Args() args: PasswordUpdateArgs) {
    return this.passwordUpdateService.updatePassword(
      args.email,
      args.currentPassword,
      args.password
    );
  }

  // TODO: in later cases we will need to send an email to the user when their password is updated

  //   @Mutation(() => PasswordUpdateOutput)
  //   async sendPasswordUpdateEmail(@Args('email') email: string) {
  //     return this.passwordUpdateService.initiatePasswordUpdate(email);
  //   }
}
