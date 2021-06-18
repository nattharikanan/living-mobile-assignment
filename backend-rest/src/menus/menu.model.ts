import { Column, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'user',
})
export class UserModel extends Model {
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column({ defaultValue: true })
    isActive: boolean;
}