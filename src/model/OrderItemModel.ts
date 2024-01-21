import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { sequelize } from './db-config';
import { OrderModel } from './OrderModel';
import { ProductModel } from './ProductModel';

@Table({
    tableName: 'order_items'
})
export class OrderItemModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    order_item_id: number;

    @ForeignKey(() => OrderModel)
    @Column
    order_id: number;

    @ForeignKey(() => ProductModel)
    @Column
    product_id: number;

    @Column
    quantity: number;

    @Column
    price: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}


sequelize.addModels([OrderItemModel]);

OrderItemModel.hasOne(ProductModel,{
    foreignKey: 'product_id',
    sourceKey: 'product_id'
})