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

    const room = await this.prisma.room.findUnique({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found.`);
    }

    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId },
    });
    if (!reservation) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} not found.`,
      );
    }

    await this.prisma.availability.create({
      data: {
        room: { connect: { id: roomId } },
        reservation: { connect: { id: reservationId } },
        status: AvailabilityStatus.UNAVAILABLE,
        ...rest,
      },
    });

    return 'Availability created successfully.';
  }

  async updateUnavailableRoomToAvailable(roomId: number): Promise<string> {
    const deleteCount = await this.prisma.availability.deleteMany({
      where: { roomId },
    });
    if (deleteCount.count === 0) {
      throw new NotFoundException(
        `No unavailable rooms with ID ${roomId} found to update.`,
      );
    }
    return `Updated ${deleteCount.count} rooms to available.`;
  }

  async getRoomAvailabilities(roomId: number, limit: number, page: number) {
    const skip = limit * (page - 1);
    const availabilities = await this.prisma.availability.findMany({
      where: { roomId },
      skip: skip,
      take: limit,
    });

    if (!availabilities.length) {
      throw new NotFoundException(
        `No availabilities found for room ID ${roomId}.`,
      );
    }
    return availabilities;
  }

  async findAll(limit: number, page: number) {
    const skip = limit * (page - 1);
    const availabilities = await this.prisma.availability.findMany({
      skip: skip,
      take: limit,
    });

    if (!availabilities.length) {
      throw new NotFoundException('No availabilities found.');
    }
    return availabilities;
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
          { endDate: { lt: new Date(startDate) } },
          { startDate: { gt: new Date(endDate) } },
        ],
      },
    });

    if (overlappingBooking) {
      return 'Room is unavailable.';
    }
    return 'Room is available.';
  }

  async setRoomToMaintenance(
    roomId: number,
    startDate: string,
    endDate: string,
  ): Promise<string> {
    const room = await this.prisma.room.findUnique({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found.`);
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

    return 'Room set to maintenance successfully.';
  }
}
