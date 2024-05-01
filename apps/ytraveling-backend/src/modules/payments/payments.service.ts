import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<string> {
    try {
      await this.prisma.payment.create({
        data: {
          ...createPaymentDto,
          status: 'PENDING',
          createdAt: new Date(),
        },
      });

      return 'Payment successfully created.';
    } catch (error) {
      console.error('Payment creation failed:', error);
      throw new InternalServerErrorException('Failed to create payment.');
    }
  }

  async findAll(page: number, limit: number) {
    const skip = limit * (page - 1);
    const payments = await this.prisma.payment.findMany({
      skip,
      take: limit,
    });

    if (payments.length === 0) {
      throw new NotFoundException('No payments found.');
    }

    return payments;
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotFoundException("Payment doesn't exist.");
    }
    return payment;
  }

  async update(id: number, updatePayment: UpdatePaymentDto): Promise<string> {
    try {
      await this.prisma.payment.update({
        where: { id },
        data: updatePayment,
      });

      return 'Payment successfully updated.';
    } catch (error) {
      console.error('Payment update failed:', error);
      throw new NotFoundException("Payment doesn't exist or update failed.");
    }
  }

  async findUserPayments(userId: number, page: number, limit: number) {
    const skip = limit * (page - 1);
    const payments = await this.prisma.payment.findMany({
      where: { userId },
      skip,
      take: limit,
    });

    if (payments.length === 0) {
      throw new NotFoundException('No payments found for this user.');
    }

    return payments;
  }

  async findReservationPayments(reservationId: number) {
    const payments = await this.prisma.payment.findMany({
      where: { reservationId },
    });

    if (payments.length === 0) {
      throw new NotFoundException('No payments found for this reservation.');
    }

    return payments;
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.payment.delete({
        where: { id },
      });

      return 'Payment successfully deleted.';
    } catch (error) {
      console.error('Payment deletion failed:', error);
      throw new NotFoundException("Payment doesn't exist or already deleted.");
    }
  }
}
