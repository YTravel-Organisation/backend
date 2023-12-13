import {
  IsEmail,
  IsInt,
  IsBoolean,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsInt()
  roleId?: number;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  verified?: boolean;

  @IsString()
  @IsOptional()
  verificationToken?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsInt()
  roleId?: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @IsString()
  verificationToken?: string;
}
