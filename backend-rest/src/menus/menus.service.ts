import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MenuModel } from './menu.model';
import { CreateMenuDto } from './dto/createMenu.dto';


@Injectable()
export class MenusService {
    constructor(
        @InjectModel(MenuModel) // inject model and use it as repository
        private menuRepo: typeof MenuModel, // UserModel act like userRepo here.
      ) {}
    
      create(user: CreateMenuDto) {
          // userRepo is Sequelize model it have many functions to work with database.
          // more info please see below documents.
          return this.menuRepo.create(user);
      }
    
      findAll() {
          return this.menuRepo.findAll();
      }

      async remove(id: string): Promise<void> {
        await this.menuRepo.destroy({
            where:{id:id}
        })
      }
        

    async update(id: string, cat: CreateMenuDto) {
        await this.menuRepo.update(cat,{
            where:{id:id}
        })
    }
    
    async findOne(id: string): Promise<CreateMenuDto> {
        return await this.menuRepo.findOne({where:{id:id}});
    }
}
