import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user-model";
import { TaskPriority } from "./task-priority";
import { Project } from "./project-model";
import { TaskStatus } from "./task-status-model";


@Table({
    tableName: 'task',
    timestamps: false
})
export class Task extends Model<Task> {

    @Column({
        type: DataType.INTEGER,
        primaryKey : true,
        autoIncrement: true
    })
    id!: number;


    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    description!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'due_date'
    })
    dueDate!: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        field: 'created_id'
    })
    createdByUserId!: number;

    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER,
        field: 'assigned_id'
    })
    assignedToUserId!: number;

    @BelongsTo(() => User, 'createdByUserId')
    createdByUser!: User;

    @BelongsTo(()=> User, 'assignedToUserId')
    assignedToUser!: User;

    @ForeignKey(() => TaskPriority)
    @Column({
        type: DataType.INTEGER,
        field: 'priority_id'
    })
    priorityId!: number;

    @BelongsTo(() => TaskPriority)
    priority!: TaskPriority;

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        field: 'project_id'
    })
    projectId!: number;

    @BelongsTo(() => Project)
    project!: Project;

    @ForeignKey(() => TaskStatus)
    @Column({
        type: DataType.INTEGER,
        field: 'status_id'
    })
    statusId!: number;

    @BelongsTo(() => TaskStatus)
    status!: TaskStatus;
    
}