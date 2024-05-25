import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../shared/base.schema';

@Schema({ timestamps: true })
export class Product extends BaseSchema {
  @Prop({ required: true })
  title: string;

  @Prop({
    enum: ['kilogram', 'litre', 'none'],
    default(): string {
      return 'none';
    },
  })
  unit: string;

  @Prop({ required: true })
  category: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
