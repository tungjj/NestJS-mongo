import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
// import {Schema, SchemaFactory, Prop}
import { Document } from 'mongoose';

export type WordDocument = Word & Document;

@Schema()
export class Word {
  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  })
  word: string;

  @Prop({
    type: String,
    required: true,
  })
  meaning: string;

  @Prop({
    type: String,
    required: true,
  })
  type: string;

  @Prop({
    type: String,
    required: true,
  })
  example: string;

  @Prop({
    type: String,
    required: true,
  })
  pronunciation: string;

  @Prop({
    type: String,
    required: true,
  })
  image_link: string;

  // @Prop({
  //   type: String,
  //   required: true,
  // })
  // lesson: Lesson;
}
export const WordSchema = SchemaFactory.createForClass(Word);
