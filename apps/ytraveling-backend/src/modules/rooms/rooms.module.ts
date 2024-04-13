// src/roles/room.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { RoomController } from './rooms.controller';
import { RoomService } from './rooms.service';

@Module({
  controllers: [RoomController],
  imports: [RoomModule],
  exports:[RoomService],
  providers: [RoomService,PrismaService],
})
export class RoomModule {}