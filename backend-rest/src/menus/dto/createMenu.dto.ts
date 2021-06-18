import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlpha, Length } from 'class-validator';
export class CreateMenuDto {

    @IsString()
    @IsAlpha()
    @Length(3, 50)
    @ApiProperty()
    categoryId: string;


    @IsString()
    @IsAlpha()
    @Length(3, 50)
    @ApiProperty()
    name: string;


    @IsString()
    @IsAlpha()
    @Length(3, 50)
    @ApiProperty()
    price: number;

}