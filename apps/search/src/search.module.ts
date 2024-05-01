import { Module } from '@nestjs/common';
import { SearchHotelController } from './controller/hotelSearch.controller';
import { AirFranceKLMService } from './service/airFrance.service';
import { HotelService } from './service/hotelSearch.service';
import { SearchTransportService } from './service/transportSearch.service';
import { RedisSharedModule } from '../../../lib/redis-shared/redis.module';
import { PrismaModule } from '../../../lib/prisma-shared/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [RedisSharedModule, PrismaModule, HttpModule],
  controllers: [SearchHotelController],
  providers: [HotelService, AirFranceKLMService, SearchTransportService],
})
export class SearchModule {}
