import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    try {
      return await this.userService.verifyEmailToken(token);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
