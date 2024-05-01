// src/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { RoleController } from './roles.controller';
import { RoleService } from './roles.service';

@Module({
  controllers: [RoleController],
  imports: [RolesModule],
  exports: [RoleService],
  providers: [RoleService, PrismaService],
})
export class RolesModule {}
