import { NotificationType } from '@prisma/client';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class CreateNotificationDto {

    @ApiProperty()
    @AutoMap()
    @IsDate()
    @IsOptional()
    Datetime?: Date;

    @ApiProperty()
    @AutoMap()
    @IsInt()
    userId: number;

    @ApiProperty()
    @AutoMap()
    @IsString()
    type: NotificationType;

    @ApiProperty()
    @AutoMap()
    @IsString()
    title: string;

    @ApiProperty()
    @AutoMap()
    @IsString()
    message: string;
  }

  export class UpdateNotificationDto {

    @ApiProperty()
    @AutoMap()
    @IsDate()
    @IsOptional()
    Datetime?: Date;

    @ApiProperty()
    @AutoMap()
    @IsInt()
    userId: number;

    @ApiProperty()
    @AutoMap()
    @IsString()
    type: NotificationType;

    @ApiProperty()
    @AutoMap()
    @IsString()
    title: string;

    @ApiProperty()
    @AutoMap()
    @IsString()
    message: string;
  }