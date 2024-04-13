import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { EmailModule } from '../email/email.module';

@Module({
  controllers: [UserController],
  imports: [EmailModule],
  exports: [UserService],
  providers: [UserService, PrismaService],
})
export class UserModule {}
