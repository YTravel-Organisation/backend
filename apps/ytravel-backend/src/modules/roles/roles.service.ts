import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../tools/database.config';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<{ status: number; message: string }> {
    try {
      await this.prisma.role.create({
        data: {
          ...createRoleDto,
          status: false,
          privilegeLevel: 0,
          createdAt: new Date(),
        },
      });

      return { status: 201, message: 'RoleCreated' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
}

  async findAll() {
    try {
        const roles = await this.prisma.role.findMany();

        if (!roles || roles.length === 0) {
            return { status: 204, message: 'No roles found' };
        }

        return { status: 200, message: 'RolesFound', data: roles };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}


  async findOne(id: number) {
    try {
        const role = await this.prisma.role.findUnique({ where: { id } });

        if (!role) {
            return { status: 404, message: "Role doesn't exist" };
        }

        return { status: 200, message: 'RoleFound', data: role };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

  async update(id: number, updateRole: UpdateRoleDto) {
    try {
        const updatedRole = await this.prisma.role.update({ where: { id }, data: updateRole });

        if (!updatedRole) {
            return { status: 204, message: 'No role found' };
        } else {
            return { status: 200, message: 'RoleUpdated', data: updatedRole };
        }
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

  async remove(id: number) {
    try {
        const deletedRole = await this.prisma.role.delete({ where: { id } });

        if (!deletedRole) {
            return { status: 204, message: 'No role found' };
        } else {
            return { status: 200, message: 'RoleDeleted', data: deletedRole };
        }
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
  }
}