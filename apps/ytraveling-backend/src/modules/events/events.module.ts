// src/roles/room.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { EventController } from './events.controller';
import { EventService } from './events.service';

@Module({
  controllers: [EventController],
  imports: [EventsModule],
  exports: [EventService],
  providers: [EventService, PrismaService],
})
export class EventsModule {}
