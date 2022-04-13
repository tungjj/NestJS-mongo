import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
// import { Prop, Schema, SchemaFactory, Prop}
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    lowercase: true,
    unique: true,
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
