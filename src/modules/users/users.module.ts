import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaService } from '../../tools/database.config';
import { EmailModule } from '../email/email.module';

@Module({
  controllers: [UserController],
  imports: [EmailModule],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
