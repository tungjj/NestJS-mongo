import { WordsModule } from './words/words.module';
import { LessonsModule } from './lessons/lessons.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { FilesModule } from './files/files.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UsersModule,
    LessonsModule,
    WordsModule,
    CoursesModule,
    FilesModule,
  ],
})
export class AppModule {}
