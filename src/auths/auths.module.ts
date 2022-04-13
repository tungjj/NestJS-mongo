import { UsersModule } from './../users/users.module';
import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UserSchema, User } from '../users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'thisismysecret',
      signOptions: {
        expiresIn: 3600 * 24,
      },
    }),
  ],
})
export class AuthsModule {}
