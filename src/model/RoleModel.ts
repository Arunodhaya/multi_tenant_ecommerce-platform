import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { sequelize } from './db-config';


type Roles = 'STORE_OWNER'|'ADMIN'
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

    public static async findByRole(role_name:Roles){
        const role = await RoleModel.findOne({ where: { role_name} });
        if(!role) throw new Error("Role not found!")
        return role
    }
}

sequelize.addModels([RoleModel]);
