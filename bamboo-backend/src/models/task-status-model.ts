import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Task} from "./task-model";



@Table({
    tableName: 'task_status',
    timestamps: false
})
export class TaskStatus extends Model<TaskStatus> {

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

    @HasMany(()=> Task)
    tasks!: Task[];

}