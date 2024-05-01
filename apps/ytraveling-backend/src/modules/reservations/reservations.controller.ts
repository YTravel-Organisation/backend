import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ReservationService } from './reservations.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/reservation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllReservations() {
    return await this.reservationService.getAllReservations();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getReservationById(@Param('id') id: number) {
    return await this.reservationService.getReservationById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    return await this.reservationService.createReservation(
      createReservationDto,
    );
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateReservation(
    @Param('id') id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return await this.reservationService.updateReservation(
      id,
      updateReservationDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReservation(@Param('id') id: number) {
    return await this.reservationService.deleteReservation(id);
  }
}
