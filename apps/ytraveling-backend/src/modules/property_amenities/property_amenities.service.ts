import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import {
  CreatePropertyAmenitieDto,
  UpdatePropertyAmenitieDto,
} from './dto/property_amenitie.dto';

@Injectable()
export class PropertyAmenitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPropertyAmenitieDto: CreatePropertyAmenitieDto) {
    try {
      const { roomId, ...rest } = createPropertyAmenitieDto;

      const room = await this.prisma.room.findUnique({
        where: { id: roomId },
      });

      if (!room) {
        throw new NotFoundException('Room not found.');
      }

      await this.prisma.propertyAmenity.create({
        data: {
          ...rest,
          room: {
            connect: { id: roomId },
          },
        },
      });
      return 'Property amenitie created successfully.';
    } catch (error) {
      console.error('Failed to create property amenitie:', error);
      throw new InternalServerErrorException(
        'Failed to create property amenitie.',
      );
    }
  }

  async findAll(limit: number, page: number) {
    const propertyAmenities = await this.prisma.propertyAmenity.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });
    return propertyAmenities;
  }

  async findOne(id: number) {
    const propertyAmenitie = await this.prisma.propertyAmenity.findUnique({
      where: { id },
    });
    if (!propertyAmenitie) {
      throw new NotFoundException(`Property amenitie with ID ${id} not found.`);
    }
    return propertyAmenitie;
  }

  async update(
    id: number,
    updatePropertyAmenitieDto: UpdatePropertyAmenitieDto,
  ): Promise<string> {
    try {
      await this.prisma.propertyAmenity.update({
        where: { id },
        data: {
          ...updatePropertyAmenitieDto,
        },
      });
      return 'Property amenitie updated successfully.';
    } catch (error) {
      console.error('Failed to update property amenitie:', error);
      throw new InternalServerErrorException(
        'Failed to update property amenitie.',
      );
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.propertyAmenity.delete({
        where: { id },
      });
      return 'Property amenitie deleted successfully.';
    } catch (error) {
      console.error('Failed to delete property amenitie:', error);
      throw new InternalServerErrorException(
        'Failed to delete property amenitie.',
      );
    }
  }
}
