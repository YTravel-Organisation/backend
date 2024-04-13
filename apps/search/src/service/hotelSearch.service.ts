import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SearchHotelDto } from '../dto/hotel.dto';
import { AppRedisService } from 'lib/redis-shared/redis.service';

@Injectable()
export class HotelService {
  private readonly prisma: PrismaClient = new PrismaClient();

  constructor(private readonly redisService: AppRedisService) {}

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  async searchHotels(data: SearchHotelDto) {
    const [lat, lon] = data.destinationCity;
    const radius = 10;
    const hotels = await this.prisma.hotel.findMany();
    const availableHotels = [];

    for (const hotel of hotels) {
      const distance = this.calculateDistance(
        lat,
        lon,
        Number(hotel.latitude),
        Number(hotel.longitude),
      );
      if (distance <= radius) {
        const rooms = await this.prisma.room.findMany({
          where: { hotelId: hotel.id },
        });

        for (const room of rooms) {
          if (
            await this.checkRoomAvailability(
              room.id,
              data.checkIn,
              data.checkOut,
            )
          ) {
            availableHotels.push(hotel);
            break;
          }
        }
      }
    }

    return availableHotels;
  }

  private async checkRoomAvailability(
    roomId: number,
    checkIn: Date,
    checkOut: Date,
  ): Promise<boolean> {
    const cacheKey = `availability:${roomId}:${checkIn.toISOString()}:${checkOut.toISOString()}`;
    const cachedResult = await this.redisService.get(cacheKey);

    if (cachedResult !== null) {
      return cachedResult === 'true';
    }

    const availability = await this.prisma.availability.findFirst({
      where: {
        roomId: roomId,
        AND: [{ endDate: { gte: checkIn } }, { startDate: { lte: checkOut } }],
      },
    });

    const isAvailable = !availability;
    await this.redisService.set(cacheKey, String(isAvailable), 60 * 60 * 24);

    return isAvailable;
  }
}
