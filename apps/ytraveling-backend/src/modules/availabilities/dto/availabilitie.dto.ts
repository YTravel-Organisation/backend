import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityStatus } from '@prisma/client';
import { IsDateString, IsNumber, IsString } from 'class-validator';

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
  @IsString()
  @AutoMap()
  status: AvailabilityStatus;
}
