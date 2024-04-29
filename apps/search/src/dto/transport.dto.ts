import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AirportCode {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

class Connection {
  @IsString()
  @IsNotEmpty()
  departureDate: string;

  @IsOptional()
  @IsString()
  arrivalDate?: string;

  @ValidateNested()
  @Type(() => AirportCode)
  origin: AirportCode;

  @ValidateNested()
  @Type(() => AirportCode)
  destination: AirportCode;
}

export class SearchTransportDto {
  @IsString()
  @IsNotEmpty()
  searchType: string;

  @IsString()
  @IsNotEmpty()
  sortType: string;

  @IsString()
  @IsNotEmpty()
  bookingFlow: string;

  @ValidateNested()
  @Type(() => Connection)
  connection: Connection;

  @IsOptional()
  @IsNumber()
  maximumNumberOfSegments?: number;

  @IsString({ each: true })
  @IsOptional()
  airlines?: string[];

  // Nouveaux champs ajoutés
  @IsNumber()
  numberOfPassengers: number;

  @IsString()
  transportClass: string;

  @IsNumber({}, { each: true })
  priceRange: number[];

  @IsString({ each: true })
  @IsOptional()
  company?: string[];

  @IsNumber()
  @IsOptional()
  stopover?: number;

  @IsString({ each: true })
  @IsOptional()
  luggage?: string[];
}
