import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AvailabilityService } from './availabilities.service';
import { CreateAvailabilitieDto } from './dto/availabilitie.dto';

@ApiTags('availabilities')
@Controller('availabilities')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  create(@Body() createAvailabilitieDto: CreateAvailabilitieDto) {
    try {
      return this.availabilityService.create(createAvailabilitieDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  findAll(
    @Query('limit') queryLimit: number,
    @Query('page') queryPage: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    try {
      return this.availabilityService.findAll(limit, page);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':roomId')
  getRoomAvailabilities(
    @Param('roomId') roomId: number,
    @Query('limit') queryLimit: number,
    @Query('page') queryPage: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    try {
      return this.availabilityService.getRoomAvailabilities(
        roomId,
        limit,
        page,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put(':roomId')
  updateUnavailableRoomToAvailable(@Param('roomId') roomId: string) {
    try {
      return this.availabilityService.updateUnavailableRoomToAvailable(+roomId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put(':roomId/:startDate/:endDate')
  setRoomToMaintenance(
    @Param('roomId') roomId: number,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    try {
      return this.availabilityService.setRoomToMaintenance(
        roomId,
        startDate,
        endDate,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
