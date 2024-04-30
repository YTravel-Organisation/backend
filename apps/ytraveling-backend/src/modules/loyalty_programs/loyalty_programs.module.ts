import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { LoyaltyProgramsController } from './loyalty_programs.controller';
import { LoyaltyProgramsService } from './loyalty_programs.service';

@Module({
  controllers: [LoyaltyProgramsController],
  imports: [LoyaltyProgramsModule],
  exports: [LoyaltyProgramsService],
  providers: [LoyaltyProgramsService, PrismaService],
})
export class LoyaltyProgramsModule {}
