import {
    Table,
    Column,
    Model,
    HasMany,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
  } from "sequelize-typescript";
  import { sequelize } from "./db-config";
  
  @Table({
    tableName: "customers",
  })
  export class CustomerModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    customer_id: number;
  
    @Column
    name: string;
  
    @Column
    phone: string;
  
    @Column
    email: string;
  
    @Column
    store_id: number;

    @Column
    password: string;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  }
  
  sequelize.addModels([CustomerModel]);