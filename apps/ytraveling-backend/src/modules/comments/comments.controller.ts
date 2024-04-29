import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(createCommentDto);
  }

  @Get()
  async findAll(
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return await this.commentService.findAll(limit, page);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.commentService.remove(id);
  }

  @Get('hotel/:id')
  async findByHotelId(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return await this.commentService.getCommentsByHotelId(id, limit, page);
  }

  @Get('user/:id')
  async findByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return await this.commentService.getCommentsByUserId(id, limit, page);
  }

  @Get('event/:id')
  async findByEventId(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return await this.commentService.getCommentsByEventId(id, limit, page);
  }
}
