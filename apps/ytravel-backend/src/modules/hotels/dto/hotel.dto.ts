import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { 
    IsInt,
    IsLatitude,
    IsLongitude, 
    IsNotEmpty, 
    IsOptional, 
    IsPhoneNumber 
} from "class-validator";
import { MethodPayment } from "@prisma/client";

export class CreateHotelDto {
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()  
    @IsInt()
    admin_id: number;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    website: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    @IsLongitude()
    longitude: number;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    @IsLatitude()
    latitude: number;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    faq: [string];

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    paymentMethod: [MethodPayment];

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    other_information: string;
}

export class UpdateHotelDto {
    @ApiProperty()
    @AutoMap()
    @IsOptional()  
    @IsInt()
    admin_id?: number;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    address?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    email?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    website?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsPhoneNumber()
    phone_number?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsLongitude()
    longitude?: number;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsLatitude()
    latitude?: number;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    faq?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    other_information?: string;
}