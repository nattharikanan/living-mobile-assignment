import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    storeId: string;
}