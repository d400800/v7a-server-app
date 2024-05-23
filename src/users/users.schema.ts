import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    enum: ['admin', 'regular', 'premium'],
    default(): string {
      return 'regular';
    },
  })
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
