import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { BookingType } from '@prisma/client';
import { PrismaService } from '../../tools/database.config';
import { CreateReservationDto, UpdateReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  findAll() {
      throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  async createReservation(createReservationDto: CreateReservationDto) {
    try {
      const { userId, roomId, transportId, paymentId, eventId, bookingType, ...rest} = createReservationDto;

      if (![BookingType.ROOM, BookingType.EVENT, BookingType.TRANSPORT].includes(bookingType)) {
        throw new BadRequestException('Invalid bookingType');
      }

      let toot;

      switch (bookingType) {
        case BookingType.ROOM: {
          toot = { room: { connect: { id: roomId } } };
          break;
        }
        case BookingType.EVENT: {
          if (!eventId) {
            throw new BadRequestException('eventId is required for EVENT bookingType');
          }
          toot = { event: { connect: { id: eventId } } };
          break;
        }
        case BookingType.TRANSPORT: {
          if (!transportId) {
            throw new BadRequestException('transportId is required for TRANSPORT bookingType');
          }
          toot = { transport: { connect: { id: transportId } } };
          break;
        }
      }

      const reservation = await this.prisma.reservation.create({
        data: {
          user: { connect: { id: userId } },
          ...toot,
          ...rest
        }
      });

      return reservation;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getReservations() {
    try {
      const reservations = await this.prisma.reservation.findMany();
      if (!reservations || reservations.length === 0) {
        return { status: 204, message: 'No reservations found' };
      }
      return { status: 200, message: 'Reservations found', data: reservations };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getReservationById(id: number) {
    try {
      const reservation = await this.prisma.reservation.findUnique({ where: { id } });
      if (!reservation) {
        throw new NotFoundException("Reservation not found");
      }
      return { status: 200, message: 'Reservation found', data: reservation };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async updateReservation(reservationId: number, updateReservationDto: UpdateReservationDto) {
    try {
      const reservation = await this.prisma.reservation.update({
        where: { id: reservationId },
        data: updateReservationDto,
      });
      return reservation;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async deleteReservation(id: number) {
    try {
      const deletedReservation = await this.prisma.reservation.delete({ where: { id } });
      if (!deletedReservation) {
        return { status: 204, message: 'No reservation found' };
      }
      return { status: 200, message: 'Reservation deleted', data: deletedReservation };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
