import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePropertyAmenitieDto {
  @ApiProperty()
  @AutoMap()
  @IsNumber()
  roomId: number;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  kitchen: boolean;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  bathroom: number;

  @ApiProperty()
  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  bed: string[];

  @ApiProperty()
  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  communication: string[];

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  accessible: boolean;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  balcony: boolean;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  parking: boolean;

  @ApiProperty()
  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  locality: string[];

  @ApiProperty()
  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  other: string[];
}

export class UpdatePropertyAmenitieDto {
  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsNumber()
  roomId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsBoolean()
  kitchen?: boolean;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsNumber()
  bathroom?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bed?: string[];

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  communication?: string[];

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsBoolean()
  accessible?: boolean;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsBoolean()
  balcony?: boolean;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsBoolean()
  parking?: boolean;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  locality?: string[];

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  other?: string[];
}
