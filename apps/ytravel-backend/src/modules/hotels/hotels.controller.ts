import { Body, Controller, InternalServerErrorException, Post } from "@nestjs/common";
import { CreateHotelDto } from "./dto/hotel.dto";
import { HotelsService } from "./hotels.service";

Controller("hotels")
export class HotelsController {

    constructor(private readonly hotelsService: HotelsService ) {}

    @Post()
    async createHotel(@Body() createHotelDto: CreateHotelDto) {
        try {
            return await this.hotelsService.createHotel(createHotelDto);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }

    }
    
}
