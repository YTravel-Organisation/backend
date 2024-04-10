// src/roles/reservations.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { ReservationController } from './reservations.controller';
import { ReservationService } from './reservations.service';

@Module({
  controllers: [ReservationController],
  imports: [ReservationModule],
  exports: [ReservationService],
  providers: [ReservationService, PrismaService],
})
export class ReservationModule {}
