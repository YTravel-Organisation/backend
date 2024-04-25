import {
  IsEmail,
  IsInt,
  IsBoolean,
  IsString,
  IsOptional,
} from 'class-validator';
import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  roleId?: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  username: string;

  @ApiProperty()
  @AutoMap()
  @IsEmail()
  email: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  password: string;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  @IsOptional()
  verified?: boolean;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  verificationToken?: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  roleId?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  verificationToken?: string;
}
