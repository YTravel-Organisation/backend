import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
    return 'AccountCreated';
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
