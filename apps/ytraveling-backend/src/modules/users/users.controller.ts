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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      this.userService.create(createUserDto);

      return 'UserCreated';
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
  findAll(
    @Query('page') queryPage: number,
    @Query('limit') queryLimit: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    try {
      return this.userService.findAll(limit, page);
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
