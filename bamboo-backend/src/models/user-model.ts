import { Table, Column, Model, DataType, AllowNull, HasMany } from 'sequelize-typescript';
import bcrypt from 'bcrypt'
import { Task } from './task-model';
import { Project } from './project-model';


@Table({
    tableName: 'user',
    timestamps: false
})
 export class User extends Model<User> {

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
    username!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        set(value: string) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt)
            this.setDataValue('password', hash)
        }
    })
    password!: string;


    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_account_confirmed'
       
    })
    isAccountConfirmed!:boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: -1,
        field: 'google_id'
    })
        googleId!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: -1,
        field: 'github_id'
    })
        githubId!: number;

        @Column({
            type: DataType.STRING(200),
            allowNull: true,
            defaultValue: `${process.env.DEFAULT_PROFILE_PIC_URL}`,
            field: 'profile_pic'
        })
        profilePic!: string;

        @HasMany(() => Task, 'createdByUserId')
        createdTasks!: Task[];
      
        @HasMany(() => Task, 'assignedToUserId')
        assignedTasks!: Task[];  

        @HasMany(() => Project)
        projects!: Project[]

}