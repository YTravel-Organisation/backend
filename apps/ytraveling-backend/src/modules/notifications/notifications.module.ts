// src/roles/notification.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { NotificationController } from './notifications.controller';
import { NotificationService } from './notifications.service';

@Module({
  controllers: [NotificationController],
  imports: [NotificationsModule],
  exports:[NotificationService],
  providers: [NotificationService,PrismaService],
})
export class NotificationsModule {}