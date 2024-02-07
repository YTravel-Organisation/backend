import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @AutoMap()
  @IsInt()
  userId: number;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  @IsOptional()
  roomId?: number;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  @IsOptional()
  hotelId?: number;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  @IsOptional()
  eventId?: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  message: string;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  rate: number;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class UpdateCommentDto {
  @ApiProperty()
  @AutoMap()
  @IsInt()
  @IsOptional()
  userId?: number;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  @IsOptional()
  roomId?: number;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  @IsOptional()
  hotelId?: number;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  @IsOptional()
  eventId?: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty()
  @AutoMap()
  @IsInt()
  @IsOptional()
  rate?: number;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
