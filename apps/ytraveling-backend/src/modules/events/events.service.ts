import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateHotelExistence(hotelId: number): Promise<void> {
    const exists = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
    });
    if (!exists) {
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

    const { hotelId, ...rest } = createEventDto;
    const data: any = { ...rest };

    if (hotelId) {
      await this.validateHotelExistence(hotelId);
      data.hotel = { connect: { id: hotelId } };
    }

    try {
      return await this.prisma.event.create({ data });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create event.');
    }
  }

  async update(eventId: number, updateEventDto: UpdateEventDto) {
    this.validateDates(updateEventDto.startDate, updateEventDto.endDate);

    const { hotelId, ...rest } = updateEventDto;
    const data: any = { ...rest };

    if (hotelId) {
      await this.validateHotelExistence(hotelId);
      data.hotel = { connect: { id: hotelId } };
    }

    try {
      return await this.prisma.event.update({
        where: { id: eventId },
        data,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update event.');
    }
  }

  async findAll() {
    const events = await this.prisma.event.findMany();
    return events.length > 0
      ? { status: 200, message: 'Events Found', data: events }
      : { status: 204, message: 'No event found' };
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException("Event doesn't exist.");
    }
    return { status: 200, message: 'Event Found', data: event };
  }

  async remove(id: number) {
    try {
      const deletedEvent = await this.prisma.event.delete({ where: { id } });
      return { status: 200, message: 'Event Deleted', data: deletedEvent };
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Event to delete does not exist.');
    }
  }
}
