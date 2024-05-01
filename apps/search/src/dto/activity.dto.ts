import { IsNotEmpty, IsDate } from 'class-validator';

export class SearchActivityDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  city: number[];

  hotelId: number;

  eventTypes: string;

  priceRange: number[];

  @IsNotEmpty()
  maxCapacity: number;
}
