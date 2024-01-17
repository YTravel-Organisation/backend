import { IsInt, IsString, IsOptional, IsBoolean} from 'class-validator';

export class CreateRoleDto {
  @IsInt()
  roleId?: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  privilegeLevel: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsString()
  @IsOptional()
  modificationHistory?: string;
}

export class UpdateRoleDto {
  @IsInt()
  roleId?: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  privilegeLevel: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsString()
  @IsOptional()
  modificationHistory?: string;

}