import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      await this.prisma.room.create({
        data: {
          ...createRoomDto,
          hotelId: createRoomDto.hotelId,
        },
      });

      return { status: 201, message: 'RoomCreated' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findAll() {
    try {
      const rooms = await this.prisma.room.findMany();

      if (!rooms || rooms.length === 0) {
        return { status: 204, message: 'No rooms found' };
      }

      return { status: 200, message: 'RoomsFound', data: rooms };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }

  async findOne(id: number) {
    try {
      const room = await this.prisma.room.findUnique({ where: { id } });

      if (!room) {
        return { status: 404, message: "Room doesn't exist" };
      }

      return { status: 200, message: 'RoomFound', data: room };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }

  async update(id: number, updateRoom: UpdateRoomDto) {
    try {
      const updatedRoom = await this.prisma.room.update({ where: { id }, data: updateRoom });

      if (!updatedRoom) {
        return { status: 204, message: 'No room found' };
      } else {
        return { status: 200, message: 'RoomUpdated', data: updatedRoom };
      }
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }

  async remove(id: number) {
    try {
      const deletedRoom = await this.prisma.room.delete({ where: { id } });

      if (!deletedRoom) {
        return { status: 204, message: 'No room found' };
      } else {
        return { status: 200, message: 'RoomDeleted', data: deletedRoom };
      }
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }
}
