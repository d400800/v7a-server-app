import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  DeleteProductDto,
  ProductDto,
} from './dtos/product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductsRepository) {}

  async getAllProducts(companyId: string): Promise<ProductDto[]> {
    const products = await this.productRepository.find(companyId);

    return products.map((product) => ({
      id: product._id,
      title: product.title,
      unit: product.unit,
      category: product.category,
    }));
  }

  createProduct(createProductDto: CreateProductDto, companyId: string) {
    return this.productRepository.createProduct(createProductDto, companyId);
  }

  update(id: string, productDto: ProductDto) {
    return this.productRepository.update(id, productDto);
  }

  delete(id: string) {
    return this.productRepository.delete(id);
  }
}
