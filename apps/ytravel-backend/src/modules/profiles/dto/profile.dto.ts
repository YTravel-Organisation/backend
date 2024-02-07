import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

enum MyGender {
  MAN = 'MAN',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class CreateProfileDto {
  @ApiProperty()
  @AutoMap()
  @IsNumber()
  userId?: number;

  @ApiProperty()
  @AutoMap()
  gender: MyGender;

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
  @IsNumber()
  userId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  gender?: MyGender;

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
  @IsNumber()
  postalCode: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty()
  @AutoMap()
  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty()
  @AutoMap()
  @IsArray()
  @IsOptional()
  lastSearch?: string[];
}
