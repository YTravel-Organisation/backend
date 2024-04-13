import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      await this.prisma.role.create({
        data: {
          ...createRoleDto,
          status: false,
          privilegeLevel: 0,
          createdAt: new Date(),
        },
      });

      return 'RoleCreated';
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findAll(limit: number, page: number) {
    try {
      const skip = limit * (page - 1);
      return this.prisma.role.findMany({
        skip: skip,
        take: limit,
      });
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) {
      throw new NotFoundException("Role doesn't exist");
    }
    return role;
  }

  async update(id: number, updateRole: UpdateRoleDto) {
    try {
      const updatedRole = await this.prisma.role.update({
        where: { id },
        data: updateRole,
      });

      if (!updatedRole) {
        throw new NotFoundException("Role doesn't exist");
      } else {
        return 'RoleUpdated';
      }
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async remove(id: number) {
    try {
      const deletedRole = await this.prisma.role.delete({ where: { id } });

      if (!deletedRole) {
        throw new NotFoundException("Role doesn't exist");
      } else {
        return 'RoleDeleted';
      }
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async assignRole(assignRoleDto: any) {
    try {
      const role = await this.prisma.role.findUnique({
        where: { id: assignRoleDto.roleId },
      });
      if (!role) {
        throw new NotFoundException("Role doesn't exist");
      }
      const user = await this.prisma.user.findUnique({
        where: { id: assignRoleDto.userId },
      });
      if (!user) {
        throw new NotFoundException("User doesn't exist");
      }
      this.prisma.user.update({
        where: { id: assignRoleDto.userId },
        data: {
          roleId: assignRoleDto.roleId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async revokeRole(revokeRoleDto: any) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: revokeRoleDto.userId },
      });
      if (!user) {
        throw new NotFoundException("User doesn't exist");
      }
      this.prisma.user.update({
        where: { id: revokeRoleDto.userId },
        data: {
          roleId: null,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
