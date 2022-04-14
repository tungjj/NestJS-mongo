import { UsersService } from './users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
// import { UsersService}
interface Payload {
  email: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'thisismysecret',
    });
  }

  async validate(payload: Payload) {
    // console.log(payload);
    const foundUser = this.usersService.findOne(payload.email);
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return foundUser;
  }
}
