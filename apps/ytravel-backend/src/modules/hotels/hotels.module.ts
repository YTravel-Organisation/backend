// src/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { AwsService } from '../aws/aws.service';

@Module({
  controllers: [HotelsController],
  imports: [HotelsModule, AwsService],
  exports:[HotelsService],
  providers: [HotelsService,PrismaService],
})
export class HotelsModule {}