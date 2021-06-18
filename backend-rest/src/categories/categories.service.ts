import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from './category.model';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(CategoryModel) // inject model and use it as repository
        private categoryRepo: typeof CategoryModel, // UserModel act like userRepo here.
      ) {}
    
      create(category: CreateCategoryDto) {
          // userRepo is Sequelize model it have many functions to work with database.
          // more info please see below documents.
          return this.categoryRepo.create(category);
      }
    
      findAll() {
          return this.categoryRepo.findAll();
      }

      async remove(id: string): Promise<void> {
        await this.categoryRepo.destroy({
            where:{id:id}
        })
      }
        

    async update(id: string, cat: CreateCategoryDto) {
        await this.categoryRepo.update(cat,{
            where:{id:id}
        })
    }
    
    async findOne(name: string): Promise<CreateCategoryDto> {
        return this.categoryRepo.findOne({where:{name:name}});
    }
    
}
