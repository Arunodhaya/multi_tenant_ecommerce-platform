import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey, Default } from 'sequelize-typescript';
import { sequelize } from './db-config';
import { UserModel } from './UserModel';
import { StoreModel } from './StoreModel';
import { CustomerModel } from './CustomerModel';

@Table({
    tableName: 'orders'
})
export class OrderModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    order_id: number;

    @ForeignKey(() => CustomerModel)
    @Column
    customer_id: number;

    @ForeignKey(() => StoreModel)
    @Column
    store_id: number;

    @Column
    order_date: Date;

    @Column
    order_total: number;

    @Column
    status: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

sequelize.addModels([OrderModel]);
