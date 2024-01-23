import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    try {
      this.profileService.create(createProfileDto);

      return 'ProfileCreated';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  findAll(
    @Query('page') queryPage: number,
    @Query('limit') queryLimit: number,
  ) {
    const limit = parseInt(queryLimit.toString(), 10) || 10;
    const page = parseInt(queryPage.toString(), 10) || 1;

    try {
      return this.profileService.findAll(limit, page);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.profileService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    try {
      return this.profileService.update(+id, updateProfileDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.profileService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id/profile-image')
  addProfileImage(@Param('id') id: string, @Body() profileImage: string) {
    try {
      return this.profileService.addProfileImage(+id, profileImage);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id/last-search')
  addLastSearch(@Param('id') id: string, @Body() lastSearch: string) {
    try {
      return this.profileService.addLastSearch(+id, lastSearch);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id/last-search')
  removeLastSearch(@Param('id') id: string, @Body() lastSearch: string) {
    try {
      return this.profileService.removeLastSearch(+id, lastSearch);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id/all-last-search')
  removeAllLastSearch(@Param('id') id: string) {
    try {
      return this.profileService.removeAllLastSearch(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
