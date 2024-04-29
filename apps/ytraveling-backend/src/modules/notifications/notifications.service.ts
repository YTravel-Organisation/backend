import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';
import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService, private socketGateway: SocketGateway) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const notification = await this.prisma.notification.create({
        data: createNotificationDto,
      });
      this.socketGateway.emitNotification(notification);
      return notification;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create notification');
    }
  }

  async update(notificationId: number, updateNotificationDto: UpdateNotificationDto) {
    try {
      const notification = await this.prisma.notification.update({
        where: { id: notificationId },
        data: updateNotificationDto,
      });
      if (!notification) throw new NotFoundException('Notification not found');
      this.socketGateway.emitNotification(notification);
      return notification;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update notification');
    }
  }

  async findAll(page: number, limit: number) {
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      throw new BadRequestException('Invalid page or limit value');
    }
    const skip = (page - 1) * limit;
    const notifications = await this.prisma.notification.findMany({
      skip,
      take: limit,
    });
    if (!notifications || notifications.length === 0) {
      return { status: 204, message: 'No notifications found' };
    }
    return { status: 200, message: 'Notifications found', data: notifications };
  }

  async findOne(id: number) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) {
      throw new NotFoundException("Notification not found");
    }
    return { status: 200, message: 'Notification found', data: notification };
  }

  async remove(id: number) {
    const deletedNotification = await this.prisma.notification.delete({ where: { id } });
    if (!deletedNotification) {
      throw new NotFoundException('Notification not found');
    }
    return { status: 200, message: 'Notification deleted', data: deletedNotification };
  }
}
