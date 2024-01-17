import { IsEmail, IsString } from 'class-validator';
import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @AutoMap()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  @AutoMap()
  password: string;
}
