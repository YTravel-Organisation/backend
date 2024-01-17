import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { 
    IsLatitude,
    IsLongitude, 
    IsNotEmpty, 
    IsNumber, 
    IsPhoneNumber 
} from "class-validator";

export class CreateHotelDto {
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    @IsNumber()
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
    faq: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    other_information: string;
}