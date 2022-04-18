import { UsersModule } from './../users/users.module';
import { LessonSchema, Lesson, LessonDocument } from './schemas/lesson.chema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
    UsersModule,
  ],
  exports: [LessonsModule, LessonsService],
})
export class LessonsModule {}
