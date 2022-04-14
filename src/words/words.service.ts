import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Model } from 'mongoose';
import { Word, WordDocument } from './schemas/word.schema'
@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word.name)
    private wordModel: Model<WordDocument>,
  ) {}
  create(id: string, createWordDto: CreateWordDto) {
    const newWord = new this.wordModel({
      ...createWordDto,
    });
    return newWord.save();
  }

  findAll() {
    return `This action returns all words`;
  }

  findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
