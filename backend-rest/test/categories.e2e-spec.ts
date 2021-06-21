import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoresModule } from '../src/stores/stores.module';
import { CategoriesService } from '../src/categories/categories.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesModule } from '../src/categories/categories.module'
import { MenusModule } from '../src/menus/menus.module';
import { StoresService } from '../src/stores/stores.service'

describe('CategoriesController (e2e)', () => {
    let app: INestApplication;
    let service: CategoriesService;
    let storesService : StoresService
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
            providers: [CategoriesService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<CategoriesService>(CategoriesService);
        storesService = module.get<StoresService>(StoresService);

    });
  
    describe('Create category', () => {
        it('When there is one user, then return that store', async () => {
            //CreateStore
            const StoreInsert = {
                name: 'TestInSert',
                description: 'Test',
                rating: 5,
            };
            await storesService.create(StoreInsert);
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
                await service.create(CreateCategory1)
                const CreateCategory2 = {
                    name: 'new test',
                    storeId: id,
                };
                await service.create(CreateCategory2)

                const CreateCategory3 = {
                    name: 'new test',
                    storeId: id,
                };
                await service.create(CreateCategory3)
                 return request(app.getHttpServer())
                .post('/categories')
                .expect(201)
                .then((res)=>{
                    expect(res.statusCode).toEqual(201);
                })
        });
    });

        describe('Update categories', () => {
            it('When store with valid input, then response 200 (OK) with update stores', async () => {
                //create store
                const StoreInsert = {
                    name: 'TestInSert',
                    description: 'Test',
                    rating: 5,
                };
                await storesService.create(StoreInsert);
                let storeId = '' 
                await request(app.getHttpServer())
                    .get('/stores')
                    .expect(200)
                    .then((response) => {
                        storeId = response.body[0].id
                    })
                 // create category
                 const CreateCategory = {
                    name: 'new test',
                    storeId: storeId,
                };
                await service.create(CreateCategory)
                let catId='';
                await request(app.getHttpServer())
                .post('/categories')
                .expect(201)
                .then((response) => {
                    catId = response.body.id
                   
                    });
                     // update category
             const UpdateCategory = {
                    name: 'UpdateCat',
                    storeId: storeId,
                    };
                    return request(app.getHttpServer())
                    .put(`/categories/${catId}`)
                    .send(UpdateCategory)
                    .expect(200)
                    .then((response) => {
                        expect(response.statusCode).toEqual(200);
                    });
                });

            });
            afterAll(async () => {
                await app.close();
            });

            describe('Delete category', () => {
                it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
                    //create store
                const StoreInsert = {
                    name: 'TestInSert',
                    description: 'Test',
                    rating: 5,
                };
                await storesService.create(StoreInsert);
                let storeId = '' 
                await request(app.getHttpServer())
                    .get('/stores')
                    .expect(200)
                    .then((response) => {
                        storeId = response.body[0].id
                    })
                 // create category
                 const CreateCategory = {
                    name: 'new test',
                    storeId: storeId,
                };
                await service.create(CreateCategory)
                let catId='';
                await request(app.getHttpServer())
                .post('/categories')
                .expect(201)
                .then(async (response) => {
                    catId = response.body.id
    
                    await request(app.getHttpServer())
                        .delete(`/categories/${catId}`)
                        .expect(200)
                        .then((response) => {
                            expect(response.statusCode).toEqual(200);
                            });
                    })
                    });
                });
               
});
