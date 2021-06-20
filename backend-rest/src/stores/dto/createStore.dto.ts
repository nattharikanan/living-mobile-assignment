import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlpha, Length,IsNumber } from 'class-validator';

export class CreateStoreDto {


    @IsString()
    @IsAlpha()
    @Length(3, 50)
    @ApiProperty()
    name: string;


    @IsString()
    @IsAlpha()
    @ApiProperty()
    description: string;

    @IsNumber()
    @ApiProperty()
    rating: number;
}