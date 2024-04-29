import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateHotelDto, UpdateHotelDto } from './dto/hotel.dto';
import { HotelsService } from './hotels.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  async createHotel(@Body() createHotelDto: CreateHotelDto) {
    try {
      return await this.hotelsService.createHotel(createHotelDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async getHotels() {
    try {
      return await this.hotelsService.getHotels();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async getHotelById(@Param('id') id: number) {
    try {
      return await this.hotelsService.getHotelById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async deleteHotel(@Param('id') id: number) {
    try {
      return await this.hotelsService.deleteHotel(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  async updateHotel(
    @Param('id') id: number,
    @Body() updateHotelDto: UpdateHotelDto,
  ) {
    try {
      return await this.hotelsService.updateHotel(id, updateHotelDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
