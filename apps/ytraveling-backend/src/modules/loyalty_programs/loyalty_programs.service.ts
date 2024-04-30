import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import {
  CreateLoyaltyProgramDto,
  UpdateLoyaltyProgramDto,
  Program,
} from './dto/loyalty_program.dto';

@Injectable()
export class LoyaltyProgramsService {
  constructor(private prisma: PrismaService) {}

  async createLoyaltyProgram(createLoyaltyProgramDto: CreateLoyaltyProgramDto) {
    const { userId, ...rest } = createLoyaltyProgramDto;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const loyaltyProgram = await this.prisma.loyaltyProgram.create({
      data: {
        ...rest,
        user: {
          connect: { id: userId },
        },
      },
    });

    return loyaltyProgram;
  }

  async getLoyaltyPrograms() {
    const loyaltyPrograms = this.prisma.loyaltyProgram.findMany();
    return loyaltyPrograms;
  }

  async getLoyaltyProgramById(id: number) {
    const loyaltyProgram = this.prisma.loyaltyProgram.findUnique({
      where: {
        id: id,
      },
    });
    return loyaltyProgram;
  }

  async getLoyaltyProgramByUserId(userId: number) {
    const loyaltyProgram = this.prisma.loyaltyProgram.findFirst({
      where: {
        userId: userId,
      },
    });
    return loyaltyProgram;
  }

  async getLoyaltyProgramByProgramName(programName: string) {
    const loyaltyProgram = this.prisma.loyaltyProgram.findFirst({
      where: {
        programName: programName as Program,
      },
    });
    return loyaltyProgram;
  }

  async getLoyaltyProgramByPromotionCode(promotionCode: string) {
    const loyaltyProgram = this.prisma.loyaltyProgram.findFirst({
      where: {
        promotionCode: promotionCode,
      },
    });
    return loyaltyProgram;
  }

  async updateLoyaltyProgram(
    id: number,
    updateLoyaltyProgramDto: UpdateLoyaltyProgramDto,
  ) {
    const loyaltyProgram = await this.prisma.loyaltyProgram.findUnique({
      where: {
        id: id,
      },
    });

    if (!loyaltyProgram) {
      throw new Error('Loyalty program not found');
    }

    const updatedLoyaltyProgram = await this.prisma.loyaltyProgram.update({
      where: {
        id: id,
      },
      data: updateLoyaltyProgramDto,
    });

    return updatedLoyaltyProgram;
  }

  async deleteLoyaltyProgram(id: number) {
    const loyaltyProgram = await this.prisma.loyaltyProgram.findUnique({
      where: {
        id: id,
      },
    });

    if (!loyaltyProgram) {
      throw new Error('Loyalty program not found');
    }

    await this.prisma.loyaltyProgram.delete({
      where: {
        id: id,
      },
    });

    return 'Loyalty program deleted';
  }
}
