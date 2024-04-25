import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SearchTransportDto } from '../dto/transport.dto';

@Injectable()
export class AirFranceKLMService {
  constructor(private httpService: HttpService) {}

  async searchFlightAvailability(dto: SearchTransportDto): Promise<any> {
    const apiUrl = 'https://api.airfranceklm.com/v1/flights-availability';
    const apiKey = 'Votre_Clé_Api';

    const payload = {
      searchType: dto.searchType,
      sortType: dto.sortType,
      bookingFlow: dto.bookingFlow,
      connection: dto.connection,
      filterBy: {
        maximumNumberOfSegments: dto.maximumNumberOfSegments,
        airlines: dto.airlines,
      },
      numberOfPassengers: dto.numberOfPassengers,
      transportClass: dto.transportClass,
      priceRange: dto.priceRange,
      company: dto.company,
      stopover: dto.stopover,
      luggage: dto.luggage,
    };

    try {
      const response = await this.httpService
        .post(apiUrl, payload, {
          headers: {
            'Api-Key': apiKey,
            'Content-Type': 'application/json',
          },
        })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error calling Air France-KLM API:', error);
      throw new Error('Unable to fetch flight availability');
    }
  }
}
