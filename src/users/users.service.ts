import { User, UserDocument } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    createUserDto.password = hash;
    const createUser = new this.userModel({
      ...createUserDto,
    });
    return createUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const res = await this.userModel.updateOne(
      { _id: id },
      { ...updateUserDto },
    );
    return res;
  }
  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
