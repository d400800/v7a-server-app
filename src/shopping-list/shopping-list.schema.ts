import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../shared/base.schema';

@Schema({ timestamps: true })
export class ShoppingList extends BaseSchema {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  amount: number;
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);
