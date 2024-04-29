// src/hotels/hotels.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';

@Module({
  controllers: [HotelsController],
  imports: [HotelsModule],
  exports: [HotelsService],
  providers: [HotelsService, PrismaService],
})
export class HotelsModule {}
