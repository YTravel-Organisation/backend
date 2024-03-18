import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      return await this.prisma.notification.create({
        data: createNotificationDto,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findAll() {
    try {
      const notifications = await this.prisma.notification.findMany();

      if (!notifications || notifications.length === 0) {
        return { status: 204, message: 'No notifications found' };
      }

      return { status: 200, message: 'Notifications Found', data: notifications };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }

  async findOne(id: number) {
    try {
      const notification = await this.prisma.notification.findUnique({ where: { id } });

      if (!notification) {
        return { status: 404, message: "Notification doesn't exist" };
      }

      return { status: 200, message: 'Notification Found', data: notification };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }

  async update(notificationId: number, updateNotificationDto: UpdateNotificationDto) {
    try {
      return await this.prisma.notification.update({
        where: { id: notificationId },
        data: updateNotificationDto,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async remove(id: number) {
    try {
      const deletedNotification = await this.prisma.notification.delete({ where: { id } });

      if (!deletedNotification) {
        return { status: 204, message: 'No notification found' };
      } else {
        return { status: 200, message: 'Notification Deleted', data: deletedNotification };
      }
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }
}
