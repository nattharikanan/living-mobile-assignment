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
    async find(id: string) {
        return this.categoryRepo.findAll({where:{id:id}});
    }
    
    async findbystoreid(id: string) {
        return this.categoryRepo.findAll({where:{storeId:id}});
    }
}
