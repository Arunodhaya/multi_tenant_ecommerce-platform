import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { sequelize } from './db-config';
import { StoreModel } from './StoreModel';
import { ProductCategoryModel } from './ProductCategoryModel';
import { UserModel } from './UserModel';

@Table({
    tableName: 'products'
})
export class ProductModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    product_id: number;

    @ForeignKey(() => StoreModel)
    @Column
    store_id: number;

    @ForeignKey(() => ProductCategoryModel)
    @Column
    product_category_id: number;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    price: number;

    @Column
    inventory_quantity: number;

    @ForeignKey(() => UserModel)
    @Column
    createdBy: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

sequelize.addModels([ProductModel]);
