import { Body, Controller, Get, InternalServerErrorException, Param, Post } from "@nestjs/common";
import { CreateHotelDto } from "./dto/hotel.dto";
import { HotelsService } from "./hotels.service";
import { ApiTags } from "@nestjs/swagger";

ApiTags("hotels")
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

    @Get()
    async getHotels() {
        try {
            return await this.hotelsService.getHotels();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get(":id")
    async getHotelById(@Param("id") id: number) {
        try {
            return await this.hotelsService.getHotelById(id);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
    

}
