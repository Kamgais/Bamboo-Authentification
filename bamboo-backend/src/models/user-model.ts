import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';
import bcrypt from 'bcrypt'


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
        defaultValue: false
       
    })
    isAccountConfirmed!:boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: -1
    })
        googleId!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: -1
    })
        githubId!: number;

}