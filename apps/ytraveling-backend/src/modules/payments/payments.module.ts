// src/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  controllers: [PaymentsController],
  exports: [PaymentsService],
  providers: [PaymentsService, PrismaService],
})
export class PaymentsModule {}
