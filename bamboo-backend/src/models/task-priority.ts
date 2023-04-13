import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "./task-model";



@Table({
tableName: 'task_priority',
timestamps: false
})
export class TaskPriority extends Model<TaskPriority> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: 'priority_name'

    })
    priorityName!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'priority_icon'
    })
    priorityIcon!: string;

    @HasMany(() => Task)
    tasks!: Task[]


}