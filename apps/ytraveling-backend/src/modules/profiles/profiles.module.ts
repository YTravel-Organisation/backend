import { Module } from '@nestjs/common';
import { ProfileController } from './profiles.controller';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { ProfileService } from './profiles.service';

@Module({
  controllers: [ProfileController],
  exports: [ProfileService],
  providers: [ProfileService, PrismaService],
})
export class ProfilesModule {}
