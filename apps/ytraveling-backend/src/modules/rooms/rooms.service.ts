import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hotelId, ...rest } = createRoomDto;

      const SearchHotel = await this.prisma.hotel.findUnique({
        where: { id: createRoomDto.hotelId },
      });

      return await this.prisma.room.create({
        data: {
          hotel: { connect: { id: SearchHotel.id } },
          ...rest,
        },
      });
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

  async update(RoomId: number, updateRoomDto: UpdateRoomDto) {
    try {
      const {
       hotelId,
       ...rest
      } = updateRoomDto;

      return await this.prisma.room.update({
        where: { id: RoomId },
        data: {
          hotel: { connect: { id: updateRoomDto.hotelId } },
          ...rest,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
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