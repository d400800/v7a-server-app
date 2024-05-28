import { Module } from '@nestjs/common';
import { ShoppingListController } from './shopping-list.controller';
import { ShoppingListService } from './shopping-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingList, ShoppingListSchema } from './shopping-list.schema';
import { ShoppingListRepository } from './shopping-list.repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingList.name, schema: ShoppingListSchema },
    ]),
    ProductsModule,
  ],
  controllers: [ShoppingListController],
  providers: [ShoppingListService, ShoppingListRepository],
  exports: [MongooseModule],
})
export class ShoppingListModule {}
