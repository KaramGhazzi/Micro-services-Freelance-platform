import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrivateSessionInfo } from '@package/authorization';
import { UserRole } from '@package/types/dist/class-validator';
import { ContractRepository } from '../../contract/contract.repository';

@Injectable()
export class SubscriptionUserIsPartOfCompanyGuard implements CanActivate {
  constructor(private readonly contractRepository: ContractRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const { headers, user }: { user: PrivateSessionInfo; headers: unknown } =
      ctx.getContext().req; // new eslint rules? make stuff weird but sure.

    if (user.role === UserRole.ADMIN) return true;

    const companyId = Number(headers['x-company-id']);
    if (Number.isNaN(companyId)) return false; // if x-company-id is not set or is not convertible to a number we can't compare it to an int.

    const companyIdsOfUser = user.userCompanies.map(
      (userCompany) => userCompany.companyId
    );
    if (!companyIdsOfUser.includes(companyId)) return false; // if the companyId in the session does not match a companyId in the user's companies don't pass.

    const { contractId } = ctx.getArgs();
    const contract = await this.contractRepository.findUnique({
      where: { id: contractId },
    });

    if (!contract) return false; // TODO: throw an 400 error that will be caught by an exception filter or something?

    const userIsPartOfCompanyOnContract = companyIdsOfUser.includes(
      Number(contract?.companyId)
    );

    return userIsPartOfCompanyOnContract;
  }
}
