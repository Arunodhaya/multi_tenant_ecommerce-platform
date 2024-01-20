import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { sequelize } from "./db-config";

@Table({
  tableName: "users",
})
export class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  user_id: number;

  @Column
  name: string;

  @Column
  phone: string;

  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

sequelize.addModels([UserModel]);