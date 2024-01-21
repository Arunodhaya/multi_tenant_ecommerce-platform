import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { sequelize } from './db-config';
import { UserModel } from './UserModel';
import { StoreModel } from './StoreModel';

@Table({
    tableName: 'product_categories'
})
export class ProductCategoryModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    category_id: number;

    @ForeignKey(()=>StoreModel)
    @Column
    store_id: number;

    @Column
    category_name: string;

    @Column
    description: string;

    @ForeignKey(() => UserModel)
    @Column
    createdBy: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

sequelize.addModels([ProductCategoryModel]);
