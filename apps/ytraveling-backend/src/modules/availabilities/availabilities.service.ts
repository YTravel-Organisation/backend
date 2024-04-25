import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import {
  CreateAvailabilitieDto,
  AvailabilityStatus,
} from './dto/availabilitie.dto';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async create(
    createAvailabilitieDto: CreateAvailabilitieDto,
  ): Promise<string> {
    const { roomId, reservationId, ...rest } = createAvailabilitieDto;

    const searchRoom = await this.prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!searchRoom) {
      throw new NotFoundException('RoomNotFound');
    }

    const searchReservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!searchReservation) {
      throw new NotFoundException('ReservationNotFound');
    }

    await this.prisma.availability.create({
      data: {
        room: { connect: { id: roomId } },
        reservation: { connect: { id: reservationId } },
        status: AvailabilityStatus.UNAVAILABLE,
        ...rest,
      },
    });

    return 'AvailabilitieCreated';
  }

  async updateUnavailableRoomToAvailable(roomId: number) {
    await this.prisma.availability.deleteMany({
      where: {
        roomId,
      },
    });
  }

  async getRoomAvailabilities(roomId: number, limit: number, page: number) {
    const skip = limit * (page - 1);
    return this.prisma.availability.findMany({
      where: {
        roomId,
      },
      skip: skip,
      take: limit,
    });
  }

  async findAll(limit: number, page: number) {
    const skip = limit * (page - 1);
    return this.prisma.availability.findMany({
      skip: skip,
      take: limit,
    });
  }

  async checkRoomAvailability(
    roomId: number,
    startDate: string,
    endDate: string,
  ): Promise<string> {
    const overlappingBooking = await this.prisma.availability.findFirst({
      where: {
        roomId,
        NOT: [
          {
            endDate: {
              lt: new Date(startDate),
            },
          },
          {
            startDate: {
              gt: new Date(endDate),
            },
          },
        ],
      },
    });

    if (!overlappingBooking) {
      throw new NotFoundException('AvailabilitieNotFound');
    }

    return 'RoomAvailable';
  }

  async setRoomToMaintenance(
    roomId: number,
    startDate: string,
    endDate: string,
  ) {
    const searchRoom = await this.prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!searchRoom) {
      throw new NotFoundException('RoomNotFound');
    }

    await this.prisma.availability.create({
      data: {
        room: { connect: { id: roomId } },
        reservation: null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: AvailabilityStatus.MAINTENANCE,
      },
    });

    return 'RoomInMaintenance';
  }
}
