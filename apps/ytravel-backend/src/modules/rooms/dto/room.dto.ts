import { IsArray, IsDecimal, IsInt, IsOptional, IsString } from 'class-validator';
import { isTypedArray } from 'util/types';

export class CreateRoomDto {

    @IsOptional()
    @IsInt()
    hotelId?: number;

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

    @IsOptional()
    @IsInt()
    hotelId?: number;

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