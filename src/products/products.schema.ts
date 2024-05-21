import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
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
  userId: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
