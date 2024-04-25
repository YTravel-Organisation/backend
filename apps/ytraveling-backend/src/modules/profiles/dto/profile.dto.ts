import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Gender {
  MAN = 'MAN',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class CreateProfileDto {
  @ApiProperty()
  @AutoMap()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @AutoMap()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @AutoMap()
  @IsString()
  firstName: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  lastName: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  profileImage?: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  addressLine: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  city: string;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  postalCode: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  country: string;

  @ApiProperty()
  @AutoMap()
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty()
  @AutoMap()
  @IsArray()
  @IsOptional()
  lastSearch?: string[];
}

export class UpdateProfileDto {
  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  profileImage?: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  addressLine?: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsNumber()
  postalCode?: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty()
  @AutoMap()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty()
  @AutoMap()
  @IsArray()
  @IsOptional()
  lastSearch?: string[];
}
