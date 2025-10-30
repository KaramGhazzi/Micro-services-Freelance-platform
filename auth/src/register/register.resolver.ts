import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { RegisterService } from './register.service';
import { RegisterArgs } from '../../types/graphql/register/register.args';
import { RegisterOutput } from '../../types/graphql/register/register.output';
import { ConfirmOutput } from '../../types/graphql/register/confirm.output';

@Resolver()
export class RegisterResolver {
  constructor(private readonly registerService: RegisterService) {}

  @Mutation(() => RegisterOutput)
  async register(@Args() args: RegisterArgs) {
    return this.registerService.register(args);
  }

  @Mutation(() => ConfirmOutput)
  async confirm(@Args('token') token: string) {
    return this.registerService.confirm(token);
  }
}
