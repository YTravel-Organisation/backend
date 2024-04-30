import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoyaltyProgramsService } from './loyalty_programs.service';
import {
  CreateLoyaltyProgramDto,
  UpdateLoyaltyProgramDto,
} from './dto/loyalty_program.dto';

@ApiTags('loyalty_programs')
@Controller('loyalty_programs')
export class LoyaltyProgramsController {
  constructor(
    private readonly loyaltyProgramsService: LoyaltyProgramsService,
  ) {}

  @Post()
  async createLoyaltyProgram(
    @Body() createLoyaltyProgramDto: CreateLoyaltyProgramDto,
  ) {
    return this.loyaltyProgramsService.createLoyaltyProgram(
      createLoyaltyProgramDto,
    );
  }

  @Put(':id')
  async updateLoyaltyProgram(
    @Param('id') id: number,
    @Body() updateLoyaltyProgramDto: UpdateLoyaltyProgramDto,
  ) {
    return await this.loyaltyProgramsService.updateLoyaltyProgram(
      id,
      updateLoyaltyProgramDto,
    );
  }

  @Get()
  async getLoyaltyPrograms() {
    return await this.loyaltyProgramsService.getLoyaltyPrograms();
  }

  @Get(':id')
  async getLoyaltyProgramById(@Param('id') id: number) {
    return await this.loyaltyProgramsService.getLoyaltyProgramById(id);
  }

  @Get('user/:userId')
  async getLoyaltyProgramByUserId(@Param('userId') userId: number) {
    return await this.loyaltyProgramsService.getLoyaltyProgramByUserId(userId);
  }

  @Get('program/:programName')
  async getLoyaltyProgramByProgramName(
    @Param('programName') programName: string,
  ) {
    return await this.loyaltyProgramsService.getLoyaltyProgramByProgramName(
      programName,
    );
  }

  @Get('promotionCode/:promotionCode')
  async getLoyaltyProgramByPromotionCode(
    @Param('promotionCode') promotionCode: string,
  ) {
    return await this.loyaltyProgramsService.getLoyaltyProgramByPromotionCode(
      promotionCode,
    );
  }

  @Delete(':id')
  async deleteLoyaltyProgram(@Param('id') id: number) {
    return await this.loyaltyProgramsService.deleteLoyaltyProgram(id);
  }
}
