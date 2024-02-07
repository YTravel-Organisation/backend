import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}
  private validateDates(startDate: Date, endDate: Date) {
    if (startDate > endDate) {
      throw new BadRequestException('Start date must be before end date');
    }
  }

  async create(createEventDto: CreateEventDto) {
    try {
      this.validateDates(createEventDto.startDate, createEventDto.endDate);

      const { hotelId, ...rest } = createEventDto;

      const SearchHotel = await this.prisma.hotel.findUnique({
        where: { id: createEventDto.hotelId },
      });

      return await this.prisma.event.create({
        data: {
          hotel: { connect: { id: SearchHotel.id } },
          ...rest,
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async update(EventId: number, updateEventDto: UpdateEventDto) {
    try {
      this.validateDates(updateEventDto.startDate, updateEventDto.endDate);

      const { hotelId, ...rest } = updateEventDto;

      return await this.prisma.event.update({
        where: { id: EventId },
        data: {
          hotel: { connect: { id: updateEventDto.hotelId } },
          ...rest,
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async findAll() {
    try {
      const events = await this.prisma.event.findMany();

      if (!events || events.length === 0) {
        return { status: 204, message: 'No event found' };
      }

      return { status: 200, message: 'EventsFound', data: events };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }

  async findOne(id: number) {
    try {
      const event = await this.prisma.event.findUnique({ where: { id } });

      if (!event) {
        return { status: 404, message: "Event doesn't exist" };
      }

      return { status: 200, message: 'EventFound', data: event };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }

  async remove(id: number) {
    try {
      const deletedEvent = await this.prisma.event.delete({ where: { id } });

      if (!deletedEvent) {
        return { status: 204, message: 'No event found' };
      } else {
        return { status: 200, message: 'Eventeleted', data: deletedEvent };
      }
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }
}