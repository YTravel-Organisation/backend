// src/roles/room.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { RoomController } from './rooms.controller';
import { RoomService } from './rooms.service';

@Module({
  controllers: [RoomController],
  imports: [RoomModule],
  exports:[RoomService],
  providers: [RoomService,PrismaService],
})
export class RoomModule {}