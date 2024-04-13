import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { RoleService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return this.roleService.create(createRoleDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  findAll(
    @Query('page') queryPage: number,
    @Query('limit') queryLimit: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    try {
      return this.roleService.findAll(limit, page);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.roleService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      return this.roleService.update(+id, updateRoleDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('/assign/')
  assignRole(@Body() assignRoleDto: any) {
    try {
      return this.roleService.assignRole(assignRoleDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.roleService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
