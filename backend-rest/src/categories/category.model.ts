import { Column, Model, Table,DataType,ForeignKey } from 'sequelize-typescript';
import { JoinColumn, ManyToOne } from 'typeorm';
import { StoreModel } from '../stores/store.model';

@Table({
    tableName: 'category',
})
export class CategoryModel extends Model {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID
    })
    id: string;

    @Column
    name: string;

    //ใส่ตรงที่จะมี FK 
    @ForeignKey(()=> StoreModel)
    storeId: string;

    // @HasMany(()=> MenuModel)    ///ใส่หัวเมนู 
    // Menu: MenuModel[]

}