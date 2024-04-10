import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { CreateReservationDto, UpdateReservationDto } from './dto/reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getAllReservations() {
    try {
      const result = await this.reservationService.getReservations();
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message };
    }
  }

  @Get(':id')
  async getReservationById(@Param('id') id: number) {
    try {
      const result = await this.reservationService.getReservationById(id);
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message };
    }
  }

  @Post()
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    try {
      const reservation = await this.reservationService.createReservation(createReservationDto);
      return { status: HttpStatus.CREATED, message: 'Reservation created successfully', data: reservation };
    } catch (error) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message };
    }
  }

  @Put(':id')
  async updateReservation(@Param('id') id: number, @Body() updateReservationDto: UpdateReservationDto) {
    try {
      const reservation = await this.reservationService.updateReservation(id, updateReservationDto);
      return { status: HttpStatus.OK, message: 'Reservation updated successfully', data: reservation };
    } catch (error) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message };
    }
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: number) {
    try {
      const result = await this.reservationService.deleteReservation(id);
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message };
    }
  }
}
