import { 
    IsLatitude,
    IsLongitude, 
    IsNotEmpty, 
    IsNumber, 
    IsPhoneNumber 
} from "class-validator";

export class CreateHotelDto {

    @IsNotEmpty()
    @IsNumber()
    admin_id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    website: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string;

    @IsNotEmpty()
    @IsLongitude()
    longitude: number;

    @IsNotEmpty()
    @IsLatitude()
    latitude: number;

    @IsNotEmpty()
    faq: string;

    @IsNotEmpty()
    other_information: string;
}