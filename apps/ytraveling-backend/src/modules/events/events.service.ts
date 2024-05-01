import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateHotelExistence(hotelId: number): Promise<void> {
    const hotelExists = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
    });
    if (!hotelExists) {
      throw new NotFoundException(`Hotel with ID ${hotelId} not found.`);
    }
  }

  private validateDates(startDate: Date, endDate: Date): void {
    if (startDate > endDate) {
      throw new BadRequestException('Start date must be before end date.');
    }
  }

  async create(createEventDto: CreateEventDto) {
    this.validateDates(createEventDto.startDate, createEventDto.endDate);
    await this.validateHotelExistence(createEventDto.hotelId);

    const { hotelId, ...rest } = createEventDto;
    try {
      const event = await this.prisma.event.create({
        data: {
          ...rest,
          hotel: { connect: { id: hotelId } },
        },
      });
      return event;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create event.');
    }
  }

  async update(eventId: number, updateEventDto: UpdateEventDto) {
    this.validateDates(updateEventDto.startDate, updateEventDto.endDate);
    await this.validateHotelExistence(updateEventDto.hotelId);

    const { hotelId, ...rest } = updateEventDto;
    try {
      const event = await this.prisma.event.update({
        where: { id: eventId },
        data: {
          ...rest,
          hotel: { connect: { id: hotelId } },
        },
      });
      return event;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update event.');
    }
  }

  async findAll() {
    const events = await this.prisma.event.findMany();
    if (events.length === 0) {
      throw new NotFoundException('No events found.');
    }
    return events;
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException("Event doesn't exist.");
    }
    return event;
  }

  async remove(id: number) {
    try {
      await this.prisma.event.delete({ where: { id } });
      return 'Event successfully deleted.';
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Event to delete does not exist.');
    }
  }
}
