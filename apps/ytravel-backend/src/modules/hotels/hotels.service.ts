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
}