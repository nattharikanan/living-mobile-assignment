import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoresModule } from '../src/stores/stores.module'
import { StoresService } from '../src/stores/stores.service'
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

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

    describe('Find all stores', () => {
        it('When there is one user, then return that store', async () => {
            const createStoreInput = {
                name: 'Nan res',
                description : "test",
                rating : 3
            };
            await service.create(createStoreInput);

            return request(app.getHttpServer())
                .get('/stores')
                .expect(200)
                .then((response) => {
                    expect(response.body[0]).toEqual(
                        expect.objectContaining(createStoreInput),
                    );
                });
        });
    });

    describe('Create stores', () => {
        it('When create with valid input, then response 200 (OK) with created store', async () => {
            // arrange
            const createStoreInput = {
                name: 'ร้านอาหารอิสลาม',
                storeId: 'c4acde9b-6879-4e60-94b7-39f38d82dfad'
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