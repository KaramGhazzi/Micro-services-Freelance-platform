import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Authorized, CurrentCompanyId } from '@package/authorization';
import { InviteService } from './invite.service';

import { InviteOutput } from '../../types/graphql/invite/invite.output';
import { InviteArgs } from '../../types/graphql/invite/invite.args';
import { ConfirmInviteArgs } from '../../types/graphql/invite/confirm-invite.args';
import { ConfirmInviteOutput } from '../../types/graphql/invite/confirm-invite.output';
import { CheckTokenOutput } from '../../types/graphql/invite/check-token.output';

@Resolver()
export class InviteResolver {
  constructor(private readonly inviteService: InviteService) {}

  @Authorized({ permissions: ['user:invite'] })
  @Mutation(() => InviteOutput)
  async invite(
    @Args() args: InviteArgs,
    @CurrentCompanyId() companyId?: number
  ) {
    return this.inviteService.invite(args, companyId);
  }

  @Authorized({ permissions: ['admin:user:invite'] })
  @Mutation(() => InviteOutput)
  async inviteAdmin(@Args() args: InviteArgs) {
    return this.inviteService.invite(args, args.companyId);
  }

  @Mutation(() => ConfirmInviteOutput)
  async confirmInvite(@Args() args: ConfirmInviteArgs) {
    return this.inviteService.confirmInvite(args);
  }

  @Query(() => CheckTokenOutput)
  async checkInvite(@Args('inviteToken') inviteToken: string) {
    return this.inviteService.checkInvite(inviteToken);
  }
}
