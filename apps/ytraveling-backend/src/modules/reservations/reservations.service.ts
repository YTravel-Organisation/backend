import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
  BookingType,
} from './dto/reservation.dto';
import { NotificationService } from '../notifications/notifications.service';

@Injectable()
export class ReservationService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}

  private validateDate(startDate: Date, endDate: Date) {
    if (startDate > endDate) {
      throw new BadRequestException('startDate must be before endDate');
    }
  }

  async createReservation(createReservationDto: CreateReservationDto) {
    this.validateDate(
      createReservationDto.startDate,
      createReservationDto.endDate,
    );

    try {
      const { userId, roomId, transportId, eventId, bookingType, ...rest } =
        createReservationDto;

      if (
        ![BookingType.ROOM, BookingType.EVENT, BookingType.TRANSPORT].includes(
          bookingType,
        )
      ) {
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
            throw new BadRequestException(
              'eventId is required for EVENT bookingType',
            );
          }
          toot = { event: { connect: { id: eventId } } };
          break;
        }
        case BookingType.TRANSPORT: {
          if (!transportId) {
            throw new BadRequestException(
              'transportId is required for TRANSPORT bookingType',
            );
          }
          toot = { transport: { connect: { id: transportId } } };
          break;
        }
      }

      const response = await this.prisma.reservation.create({
        data: {
          user: { connect: { id: userId } },
          ...toot,
          ...rest,
          bookingType: bookingType,
        },
      });

      if (response) {
        this.notificationService.create({
          userId: userId,
          type: 'SUCCESS',
          title: 'Réservation confirmée',
          message: `Votre réservation avec le numéro ${response.uniqueBookingCode} a été confirmée avec succès`,
        });
      }

      return 'Reservation created successfully';
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getAllReservations() {
    try {
      const reservations = await this.prisma.reservation.findMany();

      if (!reservations || reservations.length === 0) {
        throw new NotFoundException('No reservations found');
      }

      return reservations;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getReservationById(id: number) {
    try {
      const reservation = await this.prisma.reservation.findUnique({
        where: { id },
      });

      if (!reservation) {
        throw new NotFoundException('No reservation found');
      }

      return reservation;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async updateReservation(
    reservationId: number,
    updateReservationDto: UpdateReservationDto,
  ) {
    try {
      const { userId, roomId, transportId, eventId, bookingType, ...rest } =
        updateReservationDto;

      if (
        ![BookingType.ROOM, BookingType.EVENT, BookingType.TRANSPORT].includes(
          bookingType,
        )
      ) {
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
            throw new BadRequestException(
              'eventId is required for EVENT bookingType',
            );
          }
          toot = { event: { connect: { id: eventId } } };
          break;
        }
        case BookingType.TRANSPORT: {
          if (!transportId) {
            throw new BadRequestException(
              'transportId is required for TRANSPORT bookingType',
            );
          }
          toot = { transport: { connect: { id: transportId } } };
          break;
        }
      }

      const response = await this.prisma.reservation.update({
        where: { id: reservationId },
        data: {
          user: { connect: { id: userId } },
          ...toot,
          ...rest,
        },
      });

      if (response) {
        this.notificationService.create({
          userId: userId,
          type: 'SUCCESS',
          title: 'Réservation modifiée',
          message: `Votre réservation avec le numéro ${response.uniqueBookingCode} a été modifiée avec succès`,
        });
      }

      return 'Reservation updated successfully';
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async deleteReservation(id: number) {
    try {
      const reservation = await this.prisma.reservation.findUnique({
        where: { id },
      });

      if (!reservation) {
        throw new NotFoundException('No reservation found');
      }

      const response = await this.prisma.reservation.delete({ where: { id } });

      if (response) {
        this.notificationService.create({
          userId: reservation.userId,
          type: 'SUCCESS',
          title: 'Réservation annulée',
          message: `Votre réservation avec le numéro ${reservation.uniqueBookingCode} a été annulée avec succès`,
        });
      }

      return 'Reservation deleted successfully';
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
