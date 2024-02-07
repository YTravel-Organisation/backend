import { Controller, Get, Post, Body, Param, Put, Delete, InternalServerErrorException } from '@nestjs/common';
import { RoomService } from './rooms.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    try {
      return this.roomService.create(createRoomDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  findAll() {
    try {
      return this.roomService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.roomService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    try {
      return this.roomService.update(+id, updateRoomDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.roomService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
