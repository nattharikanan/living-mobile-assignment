import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlpha, Length,IsNumber } from 'class-validator';
export class CreateMenuDto {

    
    @Length(3, 50)
    @ApiProperty()
    categoryId: string;

    @IsString()
    @Length(3, 50)
    @ApiProperty()
    name: string;

    @IsNumber()
    @ApiProperty()
    price: number;

}