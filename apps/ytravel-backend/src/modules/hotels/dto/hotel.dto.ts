import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { 
    IsArray,
    IsEmail,
    IsEnum,
    IsInt,
    IsLatitude,
    IsLongitude, 
    IsNotEmpty, 
    IsNumber, 
    IsOptional, 
    IsPhoneNumber, 
    IsString,
} from "class-validator";
import { MethodPayment } from "@prisma/client";

export class CreateHotelDto {
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()  
    @IsInt()
    userId: number;

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
    @IsEmail()
    email: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    @IsString()
    website: string;

    @ApiProperty({ type: [String], description: 'Array of phone numbers' })
    @AutoMap()
    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true }) // Validates that each item in the array is a string
    @IsPhoneNumber(null, { each: true }) // Optionally, validate each as a phone number (remove if not needed)
    phoneNumber: string[];

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

    @ApiProperty({ type: [String] })
    @AutoMap()
    @IsArray()
    @IsNotEmpty()
    faq: string[];

    @ApiProperty({ enum: MethodPayment, isArray: true })
    @AutoMap()
    @IsArray()
    @IsEnum(MethodPayment, { each: true })
    @IsNotEmpty()
    paymentMethod: MethodPayment[];

    @ApiProperty({ type: [String] })
    @AutoMap()
    @IsArray()
    @IsNotEmpty()
    otherInformation: string[];
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