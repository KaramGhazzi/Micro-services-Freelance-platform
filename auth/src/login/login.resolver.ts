import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Authorized, Public } from '@package/authorization';
import { RefreshSessionArgs } from '../../types/graphql/auth/refresh-session.args';
import { LoginArgs } from '../../types/graphql/login/login.args';
import { LoginOutput } from '../../types/graphql/login/login.output';
import { LoginService } from './login.service';

@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => LoginOutput)
  @Public()
  async login(@Args() args: LoginArgs) {
    return this.loginService.authenticateThroughFirebase(
      args.email,
      args.password
    );
  }

  @Authorized({ permissions: ['auth:refresh-session'] })
  @Mutation(() => LoginOutput)
  async refreshSession(@Args() args: RefreshSessionArgs) {
    return this.loginService.refresh(args?.refreshToken);
  }
}
