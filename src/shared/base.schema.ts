import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class BaseSchema extends Document {
  @Prop({ required: true })
  companyId: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}
