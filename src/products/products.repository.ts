import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './products.schema';
import { Model } from 'mongoose';
import { CreateProductDto, ProductDto } from './dtos/product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  find(companyId: string) {
    return this.productModel.find({ companyId }).exec();
  }

  createProduct(createProductDto: CreateProductDto, companyId: string) {
    const createdProduct = new this.productModel({
      ...createProductDto,
      companyId,
    });

    return createdProduct.save();
  }

  update(id: string, productDto: ProductDto) {
    return this.productModel.findOneAndUpdate({ _id: id }, productDto);
  }

  delete(id: string) {
    return this.productModel.deleteOne({ _id: id });
  }
}
