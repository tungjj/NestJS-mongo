import { Word } from '../../words/schemas/word.schema';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop({
    type: String,
    required: true,
    lowercase: true,
  })
  lesson: string;
}
export const LessonSchema = SchemaFactory.createForClass(Lesson);
