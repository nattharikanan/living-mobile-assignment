import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StoreModel } from './store.model';
import { CreateStoreDto } from './dto/createStore.dto';

@Injectable()
export class StoresService {
    constructor(
        @InjectModel(StoreModel) // inject model and use it as repository
        private storeRepo: typeof StoreModel, // UserModel act like userRepo here.
      ) {}
    
       create(store: CreateStoreDto) {
          // userRepo is Sequelize model it have many functions to work with database.
          // more info please see below documents.
          return   this.storeRepo.create(store);
      }
      
    
    // update(id:StoreModel,  updatestore : UpdateStoreDto) {
    //     return this.storeRepo.update(id,updatestore)
    // }

    findAll() {
        return this.storeRepo.findAll();
    }
   

   async remove(id: string): Promise<void> {
    await this.storeRepo.destroy({
        where:{id:id}
    })

    
}
async update(id: string, store: CreateStoreDto) {
    await this.storeRepo.update(store,{
        where:{id:id}
    })
}

async findOne(name: string): Promise<CreateStoreDto> {
    return this.storeRepo.findOne({where:{name:name}});
}

   
}
