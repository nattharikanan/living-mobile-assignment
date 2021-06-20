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
                const updateStoreInput = {
                    id : '17b07675-bda0-4878-815f-1f9e5cf3479a',
                    name: 'TestUpdateCat',
                    storeId: '389c423c3-6af5-4cbc-9380-8b8a3cda2334',
                };
                return request(app.getHttpServer())
                    .put('/categories/{id}')
                    .send(updateStoreInput)
                    .expect(200)
                    .then((response) => {
                        expect(response.statusCode).toEqual(200);
                        });
                });
                it('When update invalid , then response 400 (Bad Request)', async () => {
                    // arrange
                    const createCategoriesInput = { name : '', storeId: ''  };
        
                    return request(app.getHttpServer())
                        .put('/stores/{id}')
                        .send(createCategoriesInput)
                        .expect(400);
                });
            });


            describe('Delete category', () => {
                it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
                    // arrange
                    const createDeleteInput = {
                        id: '17b07675-bda0-4878-815f-1f9e5cf3479a'
                    };
                    return request(app.getHttpServer())
                        .delete('/categories/{id}')
                        .send(createDeleteInput)
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
