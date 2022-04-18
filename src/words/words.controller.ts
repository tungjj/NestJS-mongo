import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@UseGuards(AuthGuard())
@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  /*
   * @param: id of lesson that word belongs to
   */
  @Post(':id')
  create(@Param('id') id: string, @Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(id, createWordDto);
  }

  @Get()
  findAll() {
    return this.wordsService.findAll();
  }
  @Get(':id')
  findByIdLesson(@Param('id') idLesson: string) {
    return this.wordsService.findByIdLesson(idLesson);
  }

  @Get(':word')
  findOne(@Param('word') word: string) {
    return this.wordsService.findOne(word);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(+id, updateWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordsService.remove(+id);
  }
}
