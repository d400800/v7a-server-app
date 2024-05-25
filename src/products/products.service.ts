import { Injectable } from '@nestjs/common';
import { ProductDto } from './dtos/product.dto';
import { ProductsRepository } from './products.repository';
import { BaseService } from '../shared/base.service';
import { Product } from './products.schema';

@Injectable()
export class ProductsService extends BaseService<Product, ProductDto> {
  constructor(private productRepository: ProductsRepository) {
    super(productRepository);
  }

  protected toDto(product: Product): ProductDto {
    return {
      id: product._id.toString(),
      title: product.title,
      unit: product.unit,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
