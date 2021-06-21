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
                let MenuId = '';
                await request(app.getHttpServer())
                .post('/menus')
                .send(CreateMenu)
                .then((response) => {
                    MenuId = response.body.id
                    });
                    const UpdateMenu = {
                        name: 'UpdateMenu',
                        price: 100,
                        categoryId : Catid
                        };
                        return request(app.getHttpServer())
                        .put(`/menus/${MenuId}`)
                        .send(UpdateMenu)
                        .expect(200)
                        .then((response) => {
                            expect(response.statusCode).toEqual(200);
                        });


             
             });
             
            describe('Delete menus', () => {
                it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
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
                let MenuId = '';
                await request(app.getHttpServer())
                .post('/menus')
                .send(CreateMenu)
                .then((response) => {
                    MenuId = response.body.id
                    });
                    await request(app.getHttpServer())
                    .delete(`/menus/${MenuId}`)
                    .expect(200)
                    .then((response) => {
                        expect(response.statusCode).toEqual(200);
                        });
                    
                    });
                });

                describe('Search stores', () => {
                    it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
                         //create Store to test
                    const createCatfortest = {
                        name: 'UpdateMenu',

                    };
                    let data = '';
                     await request(app.getHttpServer())
                     .get('/menus')
                     .expect(200)
                     .then((response) => {
                        data = response.body
                        return request(app.getHttpServer())
                            .get(`/menus/${createCatfortest.name}`)
                            .then((response) =>{
                                expect(response.statusCode).toEqual(200);
                            })
                     })
                        
                    });
            });
               
            });
            afterAll(async () => {
                await app.close();
            });
});
