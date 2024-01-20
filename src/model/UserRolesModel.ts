import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { sequelize } from './db-config';
import { UserModel } from './UserModel';
import { RoleModel } from './RoleModel';
import { StoreModel } from './StoreModel';

@Table({
    tableName: 'user_roles'
})
export class UserRolesModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    user_role_id: number;

    @ForeignKey(() => UserModel)
    @Column
    user_id: number;

    @ForeignKey(() => RoleModel)
    @Column
    role_id: number;

    @ForeignKey(() => StoreModel)
    @Column
    store_id: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

sequelize.addModels([UserRolesModel]);
