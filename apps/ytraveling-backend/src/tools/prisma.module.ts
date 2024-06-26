// src/prisma/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../lib/prisma-shared/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
