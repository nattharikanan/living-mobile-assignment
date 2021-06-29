import { Body, Controller, Get, Post ,Put,Delete,Param,Res, HttpStatus} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CategoryDto } from './dto/category.dto';


@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @ApiOperation({ summary: 'Create category' })
    @ApiCreatedResponse({ // HTTP 201
        description: 'The categories has been successfully created.',
        type: CategoryDto,
    })
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        const category = await this.categoriesService.create(createCategoryDto);
        return plainToClass(CategoryDto, category, { excludeExtraneousValues: true });
    }


    
    @Get()
    @ApiOperation({ summary: 'Get all category' })
    @ApiOkResponse({ // HTTP 200
        description: 'All of categories',
        isArray: true,
        type: CategoryDto,
    })
    async findAll() {
        const categories = await this.categoriesService.findAll();
        return categories.map((category) =>
            plainToClass(CategoryDto, category, { excludeExtraneousValues: true }),
        );
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Delete category' })
    @ApiOkResponse({ // HTTP 200
        description: 'Delete of category',
        isArray: true,
        type: CategoryDto,
    })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }

     @Put(':id')
     @ApiOperation({ summary: 'Update category information' })
     @ApiOkResponse({ // HTTP 200
        description: 'Update category successfully',
        isArray: true,
        type: CategoryDto,
    })
     update(@Param('id') id: string, @Body() category: CreateCategoryDto ) {
        return this.categoriesService.update(id, category)
    
    }

    @Get(':id')
    @ApiOperation({ summary: 'Search category by id'})
    @ApiOkResponse({ // HTTP 200
        isArray: true,
        type: CategoryDto,
    })
     async find(@Param('id') id: string,@Res() res:Response){
        const cat = await this.categoriesService.find(id);
        if(cat[0] === null || cat[0] === undefined ){
                res.status(HttpStatus.NOT_FOUND).json();
        }else{
            res.status(HttpStatus.OK).json(cat);
        }
    }

    @Get('findbystoreid/:id')
    @ApiOperation({ summary: 'Search category by id'})
    @ApiOkResponse({ // HTTP 200
        isArray: true,
        type: CategoryDto,
    })
     async findbystoreid(@Param('id') id: string,@Res() res:Response){
        const cat = await this.categoriesService.findbystoreid(id);
        if(cat[0] === null || cat[0] === undefined ){
                res.status(HttpStatus.NOT_FOUND).json();
        }else{
            res.status(HttpStatus.OK).json(cat);
        }
    }
}
