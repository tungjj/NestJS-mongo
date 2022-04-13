import { Word } from '../../words/schemas/word.schema';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose'; 
export type LessonSchema = Lesson & Document;

@Schema()
export class Lesson {
  @Prop({
    type: String,
    required: true,
  })
  lesson: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }] })
  words: Word[];
}
export const LessonSchema = SchemaFactory.createForClass(Lesson);