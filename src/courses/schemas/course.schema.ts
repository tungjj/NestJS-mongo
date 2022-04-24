import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({
    type: String,
    required: true,
    lowercase: true,
  })
  course: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
