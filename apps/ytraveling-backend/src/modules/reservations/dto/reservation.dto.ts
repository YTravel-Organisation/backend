import { IsInt, IsOptional, IsString, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';
import { Type } from 'class-transformer';

export enum BookingType {
  ROOM = 'ROOM',
  EVENT = 'EVENT',
  TRANSPORT = 'TRANSPORT',
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
}

export class CreateReservationDto {
  @ApiProperty()
  @AutoMap()
  @IsEnum(BookingType)
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
  @Type(() => Date)
  startDate: Date;

  @ApiProperty()
  @AutoMap()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty()
  @AutoMap()
  @IsEnum(ReservationStatus)
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
  @IsEnum(BookingType)
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
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsEnum(ReservationStatus)
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
