import { RoomType } from '@prisma/client';
import { IsArray, IsDecimal, IsInt, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class CreateRoomDto {

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    hotelId: number;

    @ApiProperty()
    @AutoMap()
    @IsString()
    roomType: RoomType;

    @ApiProperty()
    @AutoMap()
    @IsString()
    description: string;

    @ApiProperty()
    @AutoMap()
    @IsString()
    viewType: string;

    @ApiProperty()
    @AutoMap()
    @IsInt()
    maxOccupancy: number;

    @ApiProperty()
    @AutoMap()
    @IsDecimal()
    pricePerNight: number;

    @ApiProperty()
    @AutoMap()
    @IsArray()
    option: string[];

    @ApiProperty()
    @AutoMap()
    @IsArray()
    image: string[];
  }

  export class UpdateRoomDto {

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    hotelId: number;

    @ApiProperty()
    @AutoMap()
    @IsString()
    roomType: RoomType;

    @ApiProperty()
    @AutoMap()
    @IsString()
    description: string;

    @ApiProperty()
    @AutoMap()
    @IsString()
    viewType: string;

    @ApiProperty()
    @AutoMap()
    @IsInt()
    maxOccupancy: number;

    @ApiProperty()
    @AutoMap()
    @IsDecimal()
    pricePerNight: number;

    @ApiProperty()
    @AutoMap()
    @IsArray()
    option: string[];

    @ApiProperty()
    @AutoMap()
    @IsArray()
    image: string[];
    static id: any;
  }