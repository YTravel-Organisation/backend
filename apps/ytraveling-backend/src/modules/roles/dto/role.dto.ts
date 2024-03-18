import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsBoolean} from 'class-validator';
import { AutoMap } from 'nestjsx-automapper';


export class CreateRoleDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  description: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  privilegeLevel?: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  modificationHistory?: string;
}

export class UpdateRoleDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsInt()
  privilegeLevel: number;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  modificationHistory?: string;

}