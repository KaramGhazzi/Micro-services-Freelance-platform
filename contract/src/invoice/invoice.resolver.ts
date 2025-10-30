import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Authorized, CurrentCompanyId } from '@package/authorization';
import { InvoiceService } from './invoice.service';
import { Invoice } from '../../types/graphql/invoice/invoice.model';
import { FindManyArgs } from '../../types/graphql/invoice/find-many-args.args';

@Resolver()
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Authorized({ permissions: ['subscription:get-collection'] })
  @Query(() => [Invoice], { nullable: false })
  async invoices(
    @Args() args: FindManyArgs,
    @CurrentCompanyId() companyId: number
  ) {
    return this.invoiceService.invoices(companyId, args?.take);
  }

  @Authorized({ permissions: ['admin:subscription:get-collection'] })
  @Query(() => [Invoice], { nullable: false })
  async invoicesAdmin(
    @Args() args: FindManyArgs,
    @Args('companyId', { nullable: true, type: () => Int })
    companyId: number | undefined
  ) {
    return this.invoiceService.invoices(companyId, args?.take);
  }
}
