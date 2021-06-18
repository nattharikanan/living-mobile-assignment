import { Body, Controller, Get, Post,UsePipes, ValidationPipe,Put,Delete,Param, HttpStatus,Res } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/createMenu.dto';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiBadRequestResponse
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { MenuDto } from './dto/menu.dto';


@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) {}

    @Post()
    @ApiOperation({ summary: 'Create Menu'})
    @ApiCreatedResponse({ // HTTP 201
        description: 'The menu has been successfully created.',
        type: MenuDto,
    })
    @ApiBadRequestResponse({
        description: 'The create-menu input is invalid.',
    })
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
        }),
    )
    async create(@Body() createMenuDto: CreateMenuDto) {
        const menu = await this.menusService.create(createMenuDto);
        // this will map User model value to UserDto model value.
        return plainToClass(MenuDto, menu, { excludeExtraneousValues: true });
    }

    @Get()
    @ApiOperation({ summary: 'Get all of Menus'})
    @ApiOkResponse({ // HTTP 200
        description: 'All of menus',
        isArray: true,
        type: MenuDto,
    })
    
    async findAll() {
        const menus = await this.menusService.findAll();
        return menus.map((menu) =>
            plainToClass(MenuDto, menu, { excludeExtraneousValues: true }),
        );
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Delete menu' })
    @ApiOkResponse({ // HTTP 200
        description: 'Delete of menu',
        isArray: true,
        type: MenuDto,
    })
    @ApiBadRequestResponse({
        description: 'The menuid input is invalid.',
    })
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
        }),
    )
    remove(@Param('id') id: string) {
        return this.menusService.remove(id);
    }

     @Put(':id')
     @ApiOperation({ summary: 'Update menus information' })
     @ApiOkResponse({ // HTTP 200
        description: 'Update menu successfully',
        isArray: true,
        type: MenuDto,
    })
     update(@Param('id') id: string, @Body() menu: CreateMenuDto ) {
        return this.menusService.update(id, menu)
    
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find one menu by name'})
    @ApiBadRequestResponse({
        description: 'The menuid input is invalid.',
    })
    async findOne(@Param('id') id: string,@Res() res: Response){
        const menu = await this.menusService.findOne(id);
         console.log(menu)
        if(menu === null){
            console.log("Not Found")
       
            res.status(HttpStatus.NO_CONTENT).json([]);
            
        }else{
            console.log("Found")
            res.status(HttpStatus.OK).json([menu]);
            // return plainToClass(MenuDto, menu, { excludeExtraneousValues: true });
        }
         
       
    }
}
