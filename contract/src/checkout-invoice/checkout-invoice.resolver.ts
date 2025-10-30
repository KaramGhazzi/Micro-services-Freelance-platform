import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Authorized, CurrentCompanyId } from '@package/authorization';
import { CheckoutInvoiceService } from './checkout-invoice.service';
import { CheckoutInvoiceCreateInput } from './dto/create-checkout-invoice.input';
import {
  CheckoutInvoice,
  CheckoutInvoiceDetails,
} from './entities/checkout-invoice.entity';

@Resolver()
export class CheckoutInvoiceResolver {
  constructor(
    private readonly checkoutInvoiceService: CheckoutInvoiceService
  ) {}

  @Authorized()
  @Mutation(() => CheckoutInvoice)
  checkoutInvoiceCreate(
    @CurrentCompanyId() currentCompanyId: number,
    @Args('checkoutInvoiceCreateInput')
    checkoutInvoiceCreateInput: CheckoutInvoiceCreateInput
  ) {
    return this.checkoutInvoiceService.create({
      checkoutInvoiceCreateInput,
      currentCompanyId,
    });
  }

  @Authorized()
  @Query(() => CheckoutInvoiceDetails)
  checkoutInvoice(
    @CurrentCompanyId() currentCompanyId: number,
    @Args('token') token: string
  ) {
    return this.checkoutInvoiceService.getCheckoutInvoiceByToken({
      token,
      companyId: currentCompanyId,
    });
  }
}
