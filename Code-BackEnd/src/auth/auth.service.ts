import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      username: user.username,
      userId: user.userId,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
