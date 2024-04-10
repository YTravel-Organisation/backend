import { IsInt, IsOptional, IsString, IsDate } from 'class-validator';
import { BookingType, ReservationStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class CreateReservationDto {

  @ApiProperty()
  @AutoMap()
  @IsInt()
  bookingType: BookingType;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  userId: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  roomId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  paymentId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  eventId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  transportId?: number;

  @ApiProperty()
  @AutoMap()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @AutoMap()
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  reservationStatus: ReservationStatus;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  specialRequest?: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  uniqueBookingCode: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  internalNotes?: string;
}

export class UpdateReservationDto {

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  bookingType?: BookingType;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  roomId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  paymentId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  eventId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  transportId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  reservationStatus?: ReservationStatus;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  specialRequest?: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  uniqueBookingCode?: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  internalNotes?: string;
}
