import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    try {
      return this.commentService.create(createCommentDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  findAll(
    @Query('limit') queryLimit: number,
    @Query('page') queryPage: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    try {
      return this.commentService.findAll(limit, page);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.commentService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    try {
      return this.commentService.update(+id, updateCommentDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.commentService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('hotel/:id')
  findByHotelId(
    @Param('id') id: string,
    @Query('limit') queryLimit: number,
    @Query('page') queryPage: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    try {
      return this.commentService.getCommentsByHotelId(+id, limit, page);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('user/:id')
  findByUserId(
    @Param('id') id: string,
    @Query('limit') queryLimit: number,
    @Query('page') queryPage: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    try {
      return this.commentService.getCommentsByUserId(+id, limit, page);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('event/:id')
  findByEventId(
    @Param('id') id: string,
    @Query('limit') queryLimit: number,
    @Query('page') queryPage: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    try {
      return this.commentService.getCommentsByEventId(+id, limit, page);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
