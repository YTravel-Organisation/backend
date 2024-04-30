import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HotelService } from '../service/hotelSearch.service';
import { SearchHotelDto } from '../dto/hotel.dto';

@Controller()
export class SearchHotelController {
  constructor(private readonly hotelService: HotelService) {}

  @MessagePattern('search_hotel')
  async searchHotel(@Payload() data: SearchHotelDto) {
    return this.hotelService.searchHotels(data);
  }
}
