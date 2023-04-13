import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ProjectStatus } from "./project-status-model";
import { Participation } from "./participation-model";
import { Task } from "./task-model";
import { User } from "./user-model";
import { Category } from "./category-model";
import { ProjectCategory } from "./project-category-model";




@Table({
    tableName: 'project',
    timestamps: false,
    createdAt: true
})
export class Project extends Model<Project> {
   
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!:number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    description!:string;


    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'start_date'
    })
    startDate!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'end_date'
    })
    endDate!: Date;


    @ForeignKey(()=> ProjectStatus)
    @Column({
        type: DataType.INTEGER,
        field: 'status_id'
    })
    statusId!: number;

    @BelongsTo(() => ProjectStatus)
    status!: ProjectStatus;

    @HasMany(() => Participation)
    participations!: Participation[];

    @HasMany(() => Task)
    tasks!: Task[]

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        field: 'author_id'
    })
    authorId!: number;

    @BelongsTo(() => User)
    user!: User;

   @BelongsToMany(() => Category, () => ProjectCategory)
   categories!: Category[]

}