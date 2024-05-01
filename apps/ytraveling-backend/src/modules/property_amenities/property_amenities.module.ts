import { Module } from '@nestjs/common';
import { PropertyAmenitiesController } from './property_amenities.controller';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { PropertyAmenitiesService } from './property_amenities.service';

@Module({
  controllers: [PropertyAmenitiesController],
  exports: [PropertyAmenitiesService],
  providers: [PropertyAmenitiesService, PrismaService],
})
export class PropertyAmenitiesModule {}
