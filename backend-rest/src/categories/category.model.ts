import { Column, Model, Table,DataType,ForeignKey,HasMany } from 'sequelize-typescript';
import { MenuModel } from 'src/menus/menu.model';
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

    @HasMany(()=> MenuModel)
    menuId: MenuModel[]

    // @HasMany(()=> MenuModel)    ///ใส่หัวเมนู 
    // Menu: MenuModel[]

}