import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoresModule } from '../src/stores/stores.module';
import { MenusService } from '../src/menus/menus.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesModule } from '../src/categories/categories.module'
import { MenusModule } from '../src/menus/menus.module';
import { CategoriesService } from '../src/categories/categories.service';
import { StoresService } from '../src/stores/stores.service';
import { type } from 'os';
import { combineLatest } from 'rxjs';
import { response } from 'express';

let CatId = ''
describe('MenusController (e2e)', () => {
    let app: INestApplication;
    let service: MenusService;
    let categoryService : CategoriesService
    let storeService : StoresService
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    autoLoadModels: true,
                    synchronize: true,
                    logging: false,
                }),
                StoresModule,
                CategoriesModule,
                MenusModule
            ],
            providers: [MenusService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<MenusService>(MenusService);
        categoryService = module.get<CategoriesService>(CategoriesService);
        storeService = module.get<StoresService>(StoresService);

    });
  
    describe('Find all munu', () => {
        it('When there is one user, then return that store', async () => {

            return request(app.getHttpServer())
                .get('/menus')
                .expect(200)
                .then((response) => {
                    expect(response.statusCode).toEqual(200);
                });
        });
    });
    describe('Create menus', () => {
        it('When store with valid input, then response 200 (OK) with created stores', async () => {
                //CreateStore
                const StoreInsert = {
                    name: 'TestInSert',
                    description: 'Test',
                    rating: 5,
                };
                await storeService.create(StoreInsert);
                //decare ID
                let id = ''
                await request(app.getHttpServer())
                    .get('/stores')
                    .expect(200)
                    .then((response) => {
                       id = response.body[0].id
                    })
                 //CreateCategory   
                    const CreateCategory1 = {
                        name : 'TestCat',
                        storeId : id
                    }
                    await categoryService.create(CreateCategory1)
                    const CreateCategory2 = {
                        name: 'new test',
                        storeId: id,
                    };
                    await categoryService.create(CreateCategory2)
    
                    const CreateCategory3 = {
                        name: 'new test',
                        storeId: id,
                    };
                    await categoryService.create(CreateCategory3)
                    let Catid=''
                    await request(app.getHttpServer())
                    .get('/categories')
                    .expect(200)
                    .then((response) => {
                        Catid = response.body[0].id
                    })

                const CreateMenu = {
                    name: 'Test',
                    price : 150,
                    categoryId: Catid
                    
                };
                await service.create(CreateMenu)
                console.log(CreateMenu)
                await request(app.getHttpServer())
                .post('/menus')
                .send(CreateMenu)
                .set ('Content-type','application/json')
                .then((response) => {
                    expect(response.statusCode).toEqual(201);
                    });
                  
    });

});


        describe('Update Menus', () => {
            it('When menu with valid input, then response 200 (OK) with update menus', async () => {
                const updateMenuInput = {
                    id: '40c4949b-9feb-477c-af71-7424c39460ff',
                    name: 'UpdateMenu',
                    price: 200,
                    categoryId : '501bbfff-40fd-4d70-b9ca-d4fc07de5e37'
                };
                return request(app.getHttpServer())
                    .put('/menus/{id}')
                    .send(updateMenuInput)
                    .expect(200)
                    .then((response) => {
                        expect(response.statusCode).toEqual(200);
                        });
                });
                it('When update invalid , then response 400 (Bad Request)', async () => {
                    // arrange
                    const createStoreInput = { name : '', description: '' ,rating :'test' };
        
                    return request(app.getHttpServer())
                        .put('/stores/{id}')
                        .send(createStoreInput)
                        .expect(400);
                });
            });


            describe('Delete menus', () => {
                it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
                    // arrange
                    const DeleteID = {
                        id: '40c4949b-9feb-477c-af71-7424c39460ff'
                    };
                    return request(app.getHttpServer())
                        .delete('/stores/{id}')
                        .send(DeleteID)
                        .expect(200)
                        .then((response) => {
                            expect(response.statusCode).toEqual(200);
                            });
                    });
                });
                afterAll(async () => {
                    await app.close();
                });
});
