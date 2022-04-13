import { User, UserDocument } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    // @InjectConnection('users') private connection: Connection,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  findOne(id: string): Promise<User> {
    return this.userModel.findOne({ id: id }).exec();
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
