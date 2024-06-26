import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { NotificationService } from '../notifications/notifications.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private notificationService: NotificationService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    const verificationToken = uuidv4();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        verificationToken,
        verified: false,
        createdAt: new Date(),
      },
    });

    await this.emailService.sendVerificationEmail(createUserDto.email);

    return 'AccountCreated';
  }

  async findAll(limit, page) {
    const skip = limit * (page - 1);
    return this.prisma.user.findMany({
      skip: skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);

    const response = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        password: hashedPassword,
      },
    });

    if (response) {
      this.notificationService.create({
        userId: id,
        type: 'SUCCESS',
        title: 'Utilisateur mis à jour',
        message: 'Vos informations ont été mises à jour avec succès',
      });
    }

    return 'UserUpdated';
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }
    await this.prisma.user.delete({ where: { id } });
    return 'UserDeleted';
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }
    return user;
  }

  async verifyEmailToken(token: string) {
    if (!token) {
      throw new NotFoundException("Token doesn't exist");
    }
    const user = await this.prisma.user.findUnique({
      where: { verificationToken: token },
    });
    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }
    await this.prisma.user.update({
      where: { id: user.id },
      data: { verified: true, verificationToken: null },
    });
    return 'VerificationSucceeded';
  }

  async getByRole(role: number) {
    return this.prisma.user.findMany({
      where: {
        roleId: role,
      },
    });
  }

  async updateStatus(id: number, status: boolean) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }
    await this.prisma.user.update({
      where: { id },
      data: { verified: status },
    });
    return 'UserStatusUpdated';
  }

  async export(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }
    return 'UserExported';
  }
}
