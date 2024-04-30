import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class SearchHotelDto {
  @IsNotEmpty()
  @IsDate()
  checkIn: Date;

  @IsNotEmpty()
  @IsDate()
  checkOut: Date;

  @IsNotEmpty()
  destinationCity: number[];

  @IsNumber()
  numberOfGuests: number;

  @IsNumber()
  numberOfRooms: number;

  @IsNotEmpty()
  paymentMethod: string;

  @IsNotEmpty()
  amenities: string[];

  @IsNotEmpty()
  @IsNumber()
  ecologyNote: number;

  @IsNotEmpty()
  cancellationPolicy: string;

  @IsNotEmpty()
  notation: number;

  @IsNotEmpty()
  stars: number;

  @IsNotEmpty()
  priceRange: number[];
}
