import { MethodPayment, PaymentStatus } from '@prisma/client';
import {
  IsBoolean,
  IsCurrency,
  IsDecimal,
  IsNumber,
  IsString,
} from 'class-validator';
import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @AutoMap()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  reservationId: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  methodPayment: MethodPayment;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  multiple: boolean;

  @ApiProperty()
  @AutoMap()
  @IsDecimal({}, { message: 'Amount must be greater than 0' })
  amount: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsCurrency()
  currency: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  status: PaymentStatus;
}

export class UpdatePaymentDto {
  @ApiProperty()
  @AutoMap()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @AutoMap()
  @IsNumber()
  reservationId: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  methodPayment: MethodPayment;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  multiple: boolean;

  @ApiProperty()
  @AutoMap()
  @IsDecimal({}, { message: 'Amount must be greater than 0' })
  amount: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsCurrency()
  currency: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  status: PaymentStatus;
}
