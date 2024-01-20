import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { sequelize } from './db-config';
import { UserModel } from './UserModel';

@Table({
    tableName: 'stores'
})
export class StoreModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    store_id: number;

    @Column
    store_name: string;

    @ForeignKey(() => UserModel)
    @Column
    createdBy: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

sequelize.addModels([StoreModel]);
