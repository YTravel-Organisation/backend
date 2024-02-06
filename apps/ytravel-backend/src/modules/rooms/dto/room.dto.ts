import { IsArray, IsDecimal, IsInt, IsString } from 'class-validator';

export class CreateRoomDto {

    @IsInt()
    hotelId: number;

    @IsString()
    roomType: string;

    @IsString()
    description: string;

    @IsString()
    viewType: string;

    @IsInt()
    maxOccupancy: number;

    @IsDecimal()
    pricePerNight: number;

    @IsArray()
    option: string[];

    @IsArray()
    image: string[];
  }

  export class UpdateRoomDto {

    @IsInt()
    hotelId: number;

    @IsString()
    roomType: string;

    @IsString()
    description: string;

    @IsString()
    viewType: string;

    @IsInt()
    maxOccupancy: number;

    @IsDecimal()
    pricePerNight: number;

    @IsArray()
    option: string[];

    @IsArray()
    image: string[];
  }