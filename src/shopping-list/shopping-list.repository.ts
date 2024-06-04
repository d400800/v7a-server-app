import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingList } from './shopping-list.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { BaseRepository } from '../shared/base.repository';
import { Product } from '../products/products.schema';

@Injectable()
export class ShoppingListRepository extends BaseRepository<ShoppingList> {
  constructor(
    @InjectModel(ShoppingList.name)
    private shoppingListModel: Model<ShoppingList>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {
    super(shoppingListModel);
  }

  async find(query: any): Promise<ShoppingList[]> {
    return this.shoppingListModel
      .aggregate([
        {
          $set: {
            productId: {
              $toObjectId: '$productId',
            },
          },
        },
        {
          $match: {
            companyId: query.companyId,
          },
        },
        {
          $lookup: {
            from: 'products', // Name of the products collection
            localField: 'productId', // Field in the shopping list collection
            foreignField: '_id', // Field in the products collection
            as: 'product', // Alias for the result array
          },
        },
        {
          $unwind: '$product', // Unwind the product array (optional, if you want to work with individual product documents)
        },
        {
          $addFields: {
            productTitle: '$product.title', // Include the product title in the output
            productUnit: '$product.unit',
          },
        },
        {
          $project: {
            _id: 1,
            productId: 1,
            amount: 1,
            createdAt: 1,
            updatedAt: 1,
            productTitle: 1,
            productUnit: 1,
          },
        },
      ])
      .exec();
  }

  async update(
    productId: string,
    updateData: UpdateQuery<ShoppingList>,
  ): Promise<ShoppingList> {
    return this.shoppingListModel
      .findOneAndUpdate({ productId }, updateData, { new: true })
      .exec();
  }

  async delete(productId: string): Promise<{ deletedCount?: number }> {
    return this.shoppingListModel
      .deleteOne({ productId } as FilterQuery<ShoppingList>)
      .exec();
  }
}
