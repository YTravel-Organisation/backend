import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../tools/database.config";
import { CreateHotelDto } from "./dto/hotel.dto";


@Injectable()
export class HotelsService {

    constructor(
        private prisma: PrismaService,
    ) {}

    async createHotel(createHotelDto: CreateHotelDto) {
        const hotel = await this.prisma.hotel.create({
            data: {
                ...createHotelDto,
                rating: 0,
                bannerImage: '',
            },
        });
        return hotel;
    }
    
    async getHotels() {
        const hotels = this.prisma.hotel.findMany();
        return hotels;
    }

    async getHotelById(id: number) {
        const hotel = this.prisma.hotel.findUnique({
            where: {
                id: id,
            },
        });
        return hotel;
    }
    async deleteHotel(id: number) {
        const hotel = this.prisma.hotel.delete({
            where: {
                id: id,
            },
        });
        return hotel;
    }

    async updateHotel(id: number, updateHotelDto) {
        const hotel = this.prisma.hotel.update({
            where: {
                id: id,
            },
            data: {
                ...updateHotelDto,
                updatedAt: new Date(),
            },
        });
        return hotel;
    }

}