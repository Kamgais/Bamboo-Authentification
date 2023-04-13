import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Project } from "./project-model";



@Table({
    tableName: 'project_status',
    timestamps: false
})
export class ProjectStatus extends Model<ProjectStatus> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: 'status_name'
    })
    statusName!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: 'status_icon'
    })
    statusIcon!:  string;

    @HasMany(()=> Project)
    projects!: Project[];

}