import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoresModule } from '../src/stores/stores.module';
import { StoresService } from '../src/stores/stores.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesModule } from '../src/categories/categories.module'
import { MenusModule } from '../src/menus/menus.module';


describe('StoresController (e2e)', () => {
    let app: INestApplication;
    let service: StoresService;
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
            providers: [StoresService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<StoresService>(StoresService);
    });
  
    describe('Find all store', () => {
        it('When there is one user, then return that store', async () => {
            const createStoresInput = {
                name: 'A',
                description: 'A',
                rating: 3,
            };
            await service.create(createStoresInput);

            return request(app.getHttpServer())
                .get('/stores')
                .expect(200)
                .then((response) => {
                    expect(response.body[0]).toEqual(
                        expect.objectContaining(createStoresInput),
                    );
                });
        });
    });

    describe('Create stores', () => {
        it('When store with valid input, then response 200 (OK) with created stores', async () => {
            // arrange
            const createStoreInput = {
                name: 'John',
                description: 'Doe',
                rating: 3,
            };

            return request(app.getHttpServer())
                .post('/stores')
                .send(createStoreInput)
                .expect(201)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining(createStoreInput),
                        );
                    });
            });
        });

        describe('Update stores', () => {
            it('When store with valid input, then response 200 (OK) with update stores', async () => {
                const updateStoreInput = {
                    name: 'John',
                    description: 'Doe',
                    rating: 3,
                };
                return request(app.getHttpServer())
                    .put('/stores/{id}')
                    .send(updateStoreInput)
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


            describe('Delete stores', () => {
                it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
                    // arrange
                    const DeleteID = {
                        id: '297e3e67-baf0-4763-ac0e-d150fdb0cd43'
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
