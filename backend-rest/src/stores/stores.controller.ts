import { Body, Controller, Get, Post,Delete, Put,Param,Res, HttpStatus } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { StoreDto } from './dto/store.dto';

@Controller('stores')
export class StoresController {
    constructor(private readonly storesService: StoresService) {}

    @Post()
    @ApiOperation({ summary: 'Create store' })
    @ApiCreatedResponse({ // HTTP 201
        description: 'The store has been successfully created.',
        type: StoreDto,
    })
    async create(@Body() createStoreDto: CreateStoreDto) {
        const store = await this.storesService.create(createStoreDto);
        // this will map Store model value to UserDto model value.
        return plainToClass(StoreDto, store, { excludeExtraneousValues: true });
    }

    @Get()
    @ApiOperation({ summary: 'Get all store' })
    @ApiOkResponse({ // HTTP 200
        description: 'Get all of stores',
        isArray: true,
        type: StoreDto,
    })

    async findAll() {
        const stores = await this.storesService.findAll();
        return stores.map((store) =>
            plainToClass(StoreDto, store, { excludeExtraneousValues: true }),
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete store' })
    @ApiOkResponse({ // HTTP 200
        description: 'Delete of stores',
        isArray: true,
        type: StoreDto,
    })
    remove(@Param('id') id: string) {
        return this.storesService.remove(id);
    }

     @Put(':id')
     @ApiOperation({ summary: 'Update store information' })
     @ApiOkResponse({ // HTTP 200
        description: 'Update store successfully',
        isArray: true,
        type: StoreDto,
    })
     update(@Param('id') id: string, @Body() store: CreateStoreDto ) {
        return this.storesService.update(id, store)
    }

    @Get(':name')
    @ApiOperation({ summary: 'Fine one store by name'})
    @ApiOkResponse({ // HTTP 200
        description: 'Store was found !',
        isArray: true,
        type: StoreDto,
    })
    findOne(@Param('name') name: string){
        const store = this.storesService.findOne(name);
        return plainToClass(StoreDto, store, { excludeExtraneousValues: true });
    }
}

