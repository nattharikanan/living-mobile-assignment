import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoresModule } from '../src/stores/stores.module';
import { StoresService } from '../src/stores/stores.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesModule } from '../src/categories/categories.module'

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
                CategoriesModule
            ],
            providers: [StoresService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<StoresService>(StoresService);
    });

    afterAll(async () => {
        await app.close();
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
    
});
