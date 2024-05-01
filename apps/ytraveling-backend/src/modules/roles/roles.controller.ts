import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './roles.service';
import {
  AssignRoleDto,
  CreateRoleDto,
  RevokeRoleDto,
  UpdateRoleDto,
} from './dto/role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return await this.roleService.findAll(limit, page);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.roleService.update(id, updateRoleDto);
  }

  @Patch('/assign/')
  @HttpCode(HttpStatus.OK)
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return await this.roleService.assignRole(assignRoleDto);
  }

  @Patch('/revoke/')
  @HttpCode(HttpStatus.OK)
  async revokeRole(@Body() revokeRoleDto: RevokeRoleDto) {
    return await this.roleService.revokeRole(revokeRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.roleService.remove(id);
  }
}
