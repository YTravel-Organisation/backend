import {
  IsArray,
  IsDate,
  IsDecimal,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateEventDto {
  @ApiProperty()
  @AutoMap()
  @IsNumber()
  @IsOptional()
  hotelId?: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  description: string;

  @ApiProperty()
  @AutoMap()
  @IsDecimal()
  price: Decimal;

  @ApiProperty()
  @AutoMap()
  @IsArray()
  eventTypes: string[];

  @ApiProperty()
  @AutoMap()
  @IsDecimal()
  longitude: Decimal;

  @ApiProperty()
  @AutoMap()
  @IsDecimal()
  latitude: Decimal;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  maxCapacity: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  organizerName: string;

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
}

export class UpdateEventDto {
  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsNumber()
  hotelId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsDecimal()
  price?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  eventTypes?: string[];

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsDecimal()
  longitude?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsDecimal()
  latitude?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  maxCapacity?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  organizerName?: string;

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
}
