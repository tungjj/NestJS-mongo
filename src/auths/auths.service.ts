import { UserDocument } from './../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from './../users/users.service';
import { User } from './../users/entities/user.entity';
import { Injectable, Inject } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthsService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  async signIn(user: User) {
    const { email, password } = user;
    const foundUser = await this.userModel.findOne({ email }).exec();
    if (!foundUser) {
      return new Error('');
    }
    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (checkPassword) {
      // const payload = username;
      const access_token: string = await this.jwtService.sign({ email });
      return `jwt: ${access_token}`;
    }
    return 'This action adds a new auth';
  }

  // findAll() {
  //   return `This action returns all auths`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
