// src/prisma/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './database.config';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
