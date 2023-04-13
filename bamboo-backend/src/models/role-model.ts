import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table({
    tableName: 'role',
    timestamps: false
})
export class Role extends Model<Role> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
        field: 'role_name'
    })
    roleName!: string;

}