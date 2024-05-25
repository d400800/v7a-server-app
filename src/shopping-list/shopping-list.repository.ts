import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingList } from './shopping-list.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { BaseRepository } from '../shared/base.repository';

@Injectable()
export class ShoppingListRepository extends BaseRepository<ShoppingList> {
  constructor(
    @InjectModel(ShoppingList.name)
    private shoppingListModel: Model<ShoppingList>,
  ) {
    super(shoppingListModel);
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
