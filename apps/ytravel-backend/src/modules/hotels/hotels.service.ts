import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../tools/database.config";


@Injectable()
export class HotelsService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async createHotel(createHotelDto) {
        const hotel = await this.prisma.hotel.create({
            data: {
                ...createHotelDto,
                createdAt: new Date(),
            },
        });
        return hotel;
    }
    
    async getHotels() {
        const hotels = await this.prisma.hotel.findMany();
        return hotels;
    }
    
    getHotelById(id: number) {
        const hotel = this.prisma.hotel.findUnique({
            where: {
                id: id,
            },
        });
        return hotel;
    }
}