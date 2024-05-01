// src/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  controllers: [PaymentsController],
  exports: [PaymentsService],
  providers: [PaymentsService, PrismaService],
})
export class PaymentsModule {}
