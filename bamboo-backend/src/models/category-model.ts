import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Project } from "./project-model";
import { ProjectCategory } from "./project-category-model";


@Table({
    tableName: 'category',
    timestamps: false
})
export class Category extends Model<Category> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;


    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: 'categry_name'
    })
    categoryName!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: 'category_icon'
    })
    categoryIcon!:string;

    @BelongsToMany(() => Project, () => ProjectCategory)
    projects!: [];

}