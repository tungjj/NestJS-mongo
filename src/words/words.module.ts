import {
  LessonSchema,
  Lesson,
  LessonDocument,
} from './../lessons/schemas/lesson.chema';
import { LessonsService } from './../lessons/lessons.service';
import { LessonsModule } from './../lessons/lessons.module';
import { UsersModule } from './../users/users.module';
import { WordSchema, Word } from './schemas/word.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]),
    UsersModule,
    LessonsModule,
  ],
})
export class WordsModule {}
