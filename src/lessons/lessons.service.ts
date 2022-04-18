import { Word } from './../words/schemas/word.schema';
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

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const update = await this.lessonModel.update(
      { _id: id },
      { ...updateLessonDto },
    );
    return update;
  }
  // async addWord(id: string, word: Word) {
    // const updatedLesson = await this.lessonModel.findOneAndUpdate(
    //   { _id: id },
    //   {
    //     $push: { words: word },
    //   },
    // );
    // const updatedLesson = await this.lessonModel.findById(id);
    // updatedLesson.words.push(word);
    // console.log(updatedLesson);
    // return updatedLesson.save();
  // }
  async findAllWordOfLesson(id: string) {
    const foundLesson = await this.findOne(id);
    // const array = 
    return foundLesson;
  }
  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
