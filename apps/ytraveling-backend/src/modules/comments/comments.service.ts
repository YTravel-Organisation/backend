import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<string> {
    await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        createdAt: new Date(),
      },
    });

    return 'Comment created successfully.';
  }

  async findAll(limit: number, page: number) {
    const skip = limit * (page - 1);
    const comments = await this.prisma.comment.findMany({
      skip: skip,
      take: limit,
    });
    return comments.length > 0 ? comments : 'No comments found.';
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException("Comment doesn't exist.");
    }
    return comment;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<string> {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException("Comment doesn't exist.");
    }
    await this.prisma.comment.update({ where: { id }, data: updateCommentDto });
    return 'Comment updated successfully.';
  }

  async remove(id: number): Promise<string> {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException("Comment doesn't exist.");
    }
    await this.prisma.comment.delete({ where: { id } });
    return 'Comment deleted successfully.';
  }

  async getCommentsByHotelId(hotelId: number, limit: number, page: number) {
    const skip = limit * (page - 1);
    const comments = await this.prisma.comment.findMany({
      where: { hotelId },
      skip: skip,
      take: limit,
    });
    return comments.length > 0 ? comments : 'No comments found for this hotel.';
  }

  async getCommentsByUserId(userId: number, limit: number, page: number) {
    const skip = limit * (page - 1);
    const comments = await this.prisma.comment.findMany({
      where: { userId },
      skip: skip,
      take: limit,
    });
    return comments.length > 0 ? comments : 'No comments found for this user.';
  }

  async getCommentsByEventId(eventId: number, limit: number, page: number) {
    const skip = limit * (page - 1);
    const comments = await this.prisma.comment.findMany({
      where: { eventId },
      skip: skip,
      take: limit,
    });
    return comments.length > 0 ? comments : 'No comments found for this event.';
  }

  async getCommentsByRoomId(roomId: number, limit: number, page: number) {
    const skip = limit * (page - 1);
    const comments = await this.prisma.comment.findMany({
      where: { roomId },
      skip: skip,
      take: limit,
    });
    return comments.length > 0 ? comments : 'No comments found for this room.';
  }
}
