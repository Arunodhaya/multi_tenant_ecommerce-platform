import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { sequelize } from './db-config';

@Table({
    tableName: 'roles'
})
export class RoleModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    role_id: number;

    @Column
    role_name: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

sequelize.addModels([RoleModel]);
