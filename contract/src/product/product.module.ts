import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';

@Module({
  providers: [ProductResolver, ProductService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {
  constructor(private readonly productService: ProductService) {}

  onModuleInit() {
    this.productService.seed();
  }
}
