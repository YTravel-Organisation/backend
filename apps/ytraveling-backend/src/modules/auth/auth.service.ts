import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email address');
    }

    const passwordIsValid = await bcrypt.compare(pass, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return { id: user.id, username: user.username };
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);

    const payload = { userId: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
