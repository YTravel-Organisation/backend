// src/controllers/search-transport.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { SearchTransportDto } from '../dto/transport.dto';
import { AirFranceKLMService } from '../service/airFrance.service';

@Controller('transports')
export class SearchTransportController {
  constructor(private airFranceKLMService: AirFranceKLMService) {}

  @Post('search_flights')
  async search_flight(@Body() searchTransportDto: SearchTransportDto) {
    return this.airFranceKLMService.searchFlightAvailability(
      searchTransportDto,
    );
  }
}
