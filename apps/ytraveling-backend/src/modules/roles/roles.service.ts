import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import {
  AssignRoleDto,
  CreateRoleDto,
  RevokeRoleDto,
  UpdateRoleDto,
} from './dto/role.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<string> {
    try {
      await this.prisma.role.create({
        data: {
          ...createRoleDto,
          status: false,
          privilegeLevel: 0,
          createdAt: new Date(),
        },
      });
      return 'Role created successfully.';
    } catch (error) {
      console.error('Error creating role:', error);
      throw new InternalServerErrorException('Failed to create role.');
    }
  }

  async findAll(limit: number, page: number) {
    const skip = limit * (page - 1);
    const roles = await this.prisma.role.findMany({
      skip,
      take: limit,
    });
    if (roles.length === 0) {
      throw new NotFoundException('No roles found.');
    }
    return roles;
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) {
      throw new NotFoundException("Role doesn't exist.");
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<string> {
    try {
      await this.prisma.role.update({
        where: { id },
        data: updateRoleDto,
      });
      return 'Role updated successfully.';
    } catch (error) {
      console.error('Error updating role:', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException("Role doesn't exist.");
      }
      throw new InternalServerErrorException('Failed to update role.');
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.role.delete({ where: { id } });
      return 'Role deleted successfully.';
    } catch (error) {
      console.error('Error deleting role:', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException("Role doesn't exist.");
      }
      throw new InternalServerErrorException('Failed to delete role.');
    }
  }

  async assignRole(assignRoleDto: AssignRoleDto): Promise<void> {
    const role = await this.prisma.role.findUnique({
      where: { id: assignRoleDto.roleId },
    });
    if (!role) throw new NotFoundException("Role doesn't exist.");

    const user = await this.prisma.user.findUnique({
      where: { id: assignRoleDto.userId },
    });
    if (!user) throw new NotFoundException("User doesn't exist.");

    await this.prisma.user.update({
      where: { id: assignRoleDto.userId },
      data: { roleId: assignRoleDto.roleId },
    });
  }

  async revokeRole(revokeRoleDto: RevokeRoleDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: revokeRoleDto.userId },
    });
    if (!user) throw new NotFoundException("User doesn't exist.");

    await this.prisma.user.update({
      where: { id: revokeRoleDto.userId },
      data: { roleId: null },
    });
  }
}
