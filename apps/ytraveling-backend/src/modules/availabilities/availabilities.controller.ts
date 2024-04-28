import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AvailabilityService } from './availabilities.service';
import { CreateAvailabilitieDto } from './dto/availabilitie.dto';

@ApiTags('availabilities')
@Controller('availabilities')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAvailabilitieDto: CreateAvailabilitieDto) {
    return await this.availabilityService.create(createAvailabilitieDto);
  }

  @Get()
  async findAll(
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return await this.availabilityService.findAll(limit, page);
  }

  @Get(':roomId')
  async getRoomAvailabilities(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return await this.availabilityService.getRoomAvailabilities(
      roomId,
      limit,
      page,
    );
  }

  @Put(':roomId')
  @HttpCode(HttpStatus.OK)
  async updateUnavailableRoomToAvailable(
    @Param('roomId', ParseIntPipe) roomId: number,
  ) {
    return await this.availabilityService.updateUnavailableRoomToAvailable(
      roomId,
    );
  }

  @Put(':roomId/:startDate/:endDate')
  @HttpCode(HttpStatus.OK)
  async setRoomToMaintenance(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return await this.availabilityService.setRoomToMaintenance(
      roomId,
      startDate,
      endDate,
    );
  }
}
