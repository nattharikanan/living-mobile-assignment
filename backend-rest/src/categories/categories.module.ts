import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from './category.model';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
    imports: [SequelizeModule.forFeature([CategoryModel])],
    exports: [SequelizeModule],
    providers: [CategoriesService],
    controllers: [CategoriesController],
})
export class CategoriesModule {}
