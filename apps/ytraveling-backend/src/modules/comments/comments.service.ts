import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    this.prisma.comment.create({
      data: {
        ...createCommentDto,
        createdAt: new Date(),
      },
    });

    return 'CommentCreated';
  }

  findAll(limit: number, page: number) {
    const skip = limit * (page - 1);
    return this.prisma.comment.findMany({
      skip: skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException("Comment doesn't exist");
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException("Comment doesn't exist");
    }
    await this.prisma.comment.update({ where: { id }, data: updateCommentDto });
    return 'CommentUpdated';
  }

  async remove(id: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException("Comment doesn't exist");
    }
    await this.prisma.comment.delete({ where: { id } });
    return 'CommentDeleted';
  }

  async getCommentsByHotelId(hotelId: number, limit: number, page: number) {
    const skip = limit * (page - 1);
    return this.prisma.comment.findMany({
      where: { hotelId },
      skip: skip,
      take: limit,
    });
  }

  async getCommentsByUserId(userId: number, limit: number, page: number) {
    const skip = limit * (page - 1);
    return this.prisma.comment.findMany({
      where: { userId },
      skip: skip,
      take: limit,
    });
  }

  async getCommentsByEventId(eventId: number, limit: number, page: number) {
    const skip = limit * (page - 1);
    return this.prisma.comment.findMany({
      where: { eventId },
      skip: skip,
      take: limit,
    });
  }

  async getCommentsByRoomId(roomId: number, limit: number, page: number) {
    const skip = limit * (page - 1);
    return this.prisma.comment.findMany({
      where: { roomId },
      skip: skip,
      take: limit,
    });
  }
}
