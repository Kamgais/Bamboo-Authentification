import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Project } from "./project-model";
import { User } from "./user-model";
import { Role } from "./role-model";


@Table({
    tableName: 'participation',
    timestamps: false
})
export class Participation extends Model<Participation> {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        field: 'project_id'
    })
    projectId!:number;

    @BelongsTo(() => Project)
    project!: Project;


    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        field: 'user_id'
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        field: 'role_id'
    })
    roleId!: number;

    @BelongsTo(() => Role)
    role!: Role



}