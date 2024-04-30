import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsEnum } from 'class-validator';

export enum Program {
  BASIC = 'BASIC',
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

export class CreateLoyaltyProgramDto {
  @ApiProperty()
  @AutoMap()
  @IsInt()
  userId: number;

  @ApiProperty()
  @AutoMap()
  @IsEnum(Program)
  programName: Program;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  promotion?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  promotionCode?: string;
}

export class UpdateLoyaltyProgramDto {
  @ApiProperty()
  @AutoMap()
  @IsInt()
  userId: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsEnum(Program)
  programName?: Program;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  promotion?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  promotionCode?: string;
}
