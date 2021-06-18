import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoresModule } from './stores/stores.module';
import { CategoriesModule } from './categories/categories.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'secret',
    database: 'rest_api_sample',
    autoLoadModels: true,
    synchronize: true,
    }),
    StoresModule,
    CategoriesModule,
    MenusModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
