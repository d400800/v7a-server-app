import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './products.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  find() {
    return this.productModel.find().exec();
  }

  createProduct(createProductDto: CreateProductDto, userId: string) {
    const createdProduct = new this.productModel({
      ...createProductDto,
      userId,
    });

    return createdProduct.save();
  }
}
