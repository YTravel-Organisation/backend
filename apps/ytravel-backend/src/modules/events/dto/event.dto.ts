import { IsDate, IsDecimal, IsInt, IsNumber, IsString } from 'class-validator';
import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {

    @ApiProperty()
    @AutoMap()
    @IsNumber()
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
    price: number;

    @ApiProperty()
    @AutoMap()
    @IsString()
    eventTypes: string[];

    @ApiProperty()
    @AutoMap()
    @IsDecimal()
    longitude: number;

    @ApiProperty()
    @AutoMap()
    @IsDecimal()
    latitude: number;

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
    startDate : Date;

    @ApiProperty()
    @AutoMap()
    @IsDate()
    endDate: Date;

  }

  export class UpdateEventDto {

    @ApiProperty()
    @AutoMap()
    @IsNumber()
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
    price: number;

    @ApiProperty()
    @AutoMap()
    @IsString()
    eventTypes: string[];

    @ApiProperty()
    @AutoMap()
    @IsDecimal()
    longitude: number;

    @ApiProperty()
    @AutoMap()
    @IsDecimal()
    latitude: number;

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
    startDate : Date;

    @ApiProperty()
            @AutoMap()
    @IsDate()
    endDate: Date;
  }