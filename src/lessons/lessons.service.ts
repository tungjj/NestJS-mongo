import { LessonDocument, Lesson } from './schemas/lesson.chema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
// import { InjectModel}
@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
  ) {}
  create(createLessonDto: CreateLessonDto) {
    console.log(createLessonDto);
    const createdLesson = new this.lessonModel({
      ...createLessonDto,
    });
    return createdLesson.save();
  }

  async findAll() {
    return await this.lessonModel.find();
  }

  async findOne(id: string) {
    return await this.lessonModel.findOne({ _id: id });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
