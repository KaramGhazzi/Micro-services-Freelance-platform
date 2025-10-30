import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrivateSessionInfo } from '@package/authorization';
import { CheckoutService } from '../checkout.service';

@Injectable()
export class CheckoutUserPartOfCompanyGuard implements CanActivate {
  constructor(private readonly checkoutService: CheckoutService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const {
      headers,
      user,
      args,
    }: {
      user: PrivateSessionInfo;
      args: { where?: { token?: string } };
      headers;
    } = ctx.getContext().req;

    if (args?.where?.token) {
      const companyId = Number(headers['x-company-id']);

      const companyIdsOfUser = user.userCompanies.map(
        (userCompany) => userCompany.companyId
      );

      const checkout = await this.checkoutService.findByToken(
        args.where.token,
        companyId
      ); // ? Might be unnecessary since the service uses the companyId in the where clause and thus you can't return a checkout of another company?
      if (companyIdsOfUser.includes(checkout.companyId)) return true; // if checkout is of the companyId that is provided return true
    }

    return false;
  }
}
