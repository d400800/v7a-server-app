import { Injectable } from '@nestjs/common';
import { CreateProductDto, ProductDto } from './dtos/product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductsRepository) {}

  async getAllProducts(): Promise<ProductDto[]> {
    const products = await this.productRepository.find();

    return products.map((product) => ({
      id: product._id,
      title: product.title,
      unit: product.unit,
    }));
  }

  createProduct(createProductDto: CreateProductDto, userId: string) {
    return this.productRepository.createProduct(createProductDto, userId);
  }
}
