// src/roles/notification.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { NotificationController } from './notifications.controller';
import { NotificationService } from './notifications.service';
import { SocketModule } from '../socket/socket.module';

@Module({
  controllers: [NotificationController],
  imports: [SocketModule],
  exports: [NotificationService],
  providers: [NotificationService, PrismaService],
})
export class NotificationsModule {}
