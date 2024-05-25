import { Injectable } from '@nestjs/common';
import { ShoppingListDto } from './dtos/shopping-list.dto';
import { ShoppingListRepository } from './shopping-list.repository';
import { BaseService } from '../shared/base.service';
import { ShoppingList } from './shopping-list.schema';

@Injectable()
export class ShoppingListService extends BaseService<
  ShoppingList,
  ShoppingListDto
> {
  constructor(private shoppingListRepository: ShoppingListRepository) {
    super(shoppingListRepository);
  }

  protected toDto(item: ShoppingListDto): ShoppingListDto {
    return {
      productId: item.productId,
      amount: item.amount,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}
