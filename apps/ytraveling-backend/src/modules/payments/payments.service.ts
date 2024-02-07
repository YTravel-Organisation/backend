import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      await this.prisma.payment.create({
        data: {
          ...createPaymentDto,
          status: 'PENDING',
          createdAt: new Date(),
        },
      });

      return 'PaymentCreated';
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findAll(page: number, limit: number) {
    try {
      const skip = limit * (page - 1);
      return this.prisma.payment.findMany({
        skip: skip,
        take: limit,
      });
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotAcceptableException("Payment doesn't exist");
    }
    return payment;
  }

  async update(id: number, updatePayment: UpdatePaymentDto) {
    try {
      const updatedPayment = await this.prisma.payment.update({
        where: { id },
        data: updatePayment,
      });

      if (!updatedPayment) {
        throw new NotAcceptableException("Payment doesn't exist");
      } else {
        return 'PaymentUpdated';
      }
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findUserPayments(userId: number, page: number, limit: number) {
    try {
      const skip = limit * (page - 1);
      return this.prisma.payment.findMany({
        where: { userId },
        skip: skip,
        take: limit,
      });
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findReservationPayments(reservationId: number) {
    try {
      return this.prisma.payment.findMany({ where: { reservationId } });
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async remove(id: number) {
    try {
      const deletedPayment = await this.prisma.payment.delete({
        where: { id },
      });

      if (!deletedPayment) {
        throw new NotAcceptableException("Payment doesn't exist");
      } else {
        return 'PaymentDeleted';
      }
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
