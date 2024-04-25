import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum AvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  MAINTENANCE = 'MAINTENANCE',
}

export class CreateAvailabilitieDto {
  @ApiProperty()
  @IsNumber()
  @AutoMap()
  roomId: number;

  @ApiProperty()
  @IsNumber()
  @AutoMap()
  reservationId: number;

  @ApiProperty()
  @IsDateString()
  @AutoMap()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  @AutoMap()
  endDate: string;

  @ApiProperty()
  @AutoMap()
  @IsEnum(AvailabilityStatus)
  status: AvailabilityStatus;
}

export class UpdateAvailabilitieDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @AutoMap()
  roomId?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @AutoMap()
  reservationId?: number;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  @AutoMap()
  startDate?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  @AutoMap()
  endDate?: string;

  @ApiProperty()
  @IsEnum(AvailabilityStatus)
  @IsOptional()
  @AutoMap()
  status?: AvailabilityStatus;
}
