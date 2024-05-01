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
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profiles.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProfileDto: CreateProfileDto) {
    return await this.profileService.create(createProfileDto);
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return await this.profileService.findAll(limit, page);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.profileService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.profileService.remove(id);
  }

  @Patch(':id/profile-image')
  @HttpCode(HttpStatus.OK)
  async addProfileImage(
    @Param('id', ParseIntPipe) id: number,
    @Body('profileImage') profileImage: string,
  ) {
    return await this.profileService.addProfileImage(id, profileImage);
  }

  @Patch(':id/last-search')
  @HttpCode(HttpStatus.OK)
  async addLastSearch(
    @Param('id', ParseIntPipe) id: number,
    @Body('lastSearch') lastSearch: string,
  ) {
    return await this.profileService.addLastSearch(id, lastSearch);
  }

  @Delete(':id/last-search')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeLastSearch(
    @Param('id', ParseIntPipe) id: number,
    @Body('lastSearch') lastSearch: string,
  ) {
    await this.profileService.removeLastSearch(id, lastSearch);
  }

  @Delete(':id/all-last-search')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAllLastSearch(@Param('id', ParseIntPipe) id: number) {
    await this.profileService.removeAllLastSearch(id);
  }
}
