import { User, UserDocument } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

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
  async signIn(user: UserEntity) {
    const { email, password } = user;
    const foundUser = await this.userModel.findOne({ email }).exec();
    if (!foundUser) {
      return new Error('Invalid email.');
    }
    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (checkPassword) {
      // const payload = username;
      const access_token: string = await this.jwtService.sign({ email });
      return `jwt: ${access_token}`;
    }
    return 'This action adds a new auth';
  }
}
