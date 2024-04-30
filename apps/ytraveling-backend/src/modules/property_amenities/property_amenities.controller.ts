import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PropertyAmenitiesService } from './property_amenities.service';
import {
  CreatePropertyAmenitieDto,
  UpdatePropertyAmenitieDto,
} from './dto/property_amenitie.dto';

@ApiTags('PropertyAmenities')
@Controller('property-amenities')
export class PropertyAmenitiesController {
  constructor(
    private readonly propertyAmenitiesService: PropertyAmenitiesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPropertyAmenitieDto: CreatePropertyAmenitieDto) {
    return await this.propertyAmenitiesService.create(
      createPropertyAmenitieDto,
    );
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return await this.propertyAmenitiesService.findAll(limit, page);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.propertyAmenitiesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePropertyAmenitieDto: UpdatePropertyAmenitieDto,
  ) {
    return await this.propertyAmenitiesService.update(
      id,
      updatePropertyAmenitieDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.propertyAmenitiesService.remove(id);
  }
}
