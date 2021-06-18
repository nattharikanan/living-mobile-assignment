import { Column, Model, Table, DataType,HasMany } from 'sequelize-typescript';
import { CategoryModel } from '../categories/category.model';
import { OneToMany, } from 'typeorm';

@Table({
    tableName: 'store',
})
export class StoreModel extends Model {
    
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID
    })
    id: string;
    @Column
    name: string;

    @Column
    description: string;

    @Column
    rating: number;


    //ใส่ตรงหัว
    @HasMany(()=> CategoryModel)
    category: CategoryModel[]
    
}