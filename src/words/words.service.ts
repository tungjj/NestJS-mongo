import { LessonsService } from './../lessons/lessons.service';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Model } from 'mongoose';
import { Word, WordDocument } from './schemas/word.schema';
// import { Lesson,}
@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word.name)
    private wordModel: Model<WordDocument>,
    private lessonsService: LessonsService,
  ) {}
  async create(id: string, createWordDto: CreateWordDto) {
    const newWord = new this.wordModel({ ...createWordDto, lesson: id });
    newWord.save();
    console.log(newWord);
    // const updatedLesson = await this.lessonsService.addWord(id, newWord);
    return newWord;
    // return newWord.save();
  }

  findAll() {
    return `This action returns all words`;
  }
  findByIdLesson(id: string) {
    return this.wordModel.find({ id_lesson: id });
  }

  async findOne(word: string) {
    const foundWord = await this.wordModel.findOne({ word });
    return foundWord;
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
