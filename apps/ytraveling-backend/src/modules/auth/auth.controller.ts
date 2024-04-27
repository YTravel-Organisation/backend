import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      return this.authService.login(email, password);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
