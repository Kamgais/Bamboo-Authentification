import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "./category-model";
import { Project } from "./project-model";


@Table({
    tableName: 'project_category',
    timestamps: false
})
export class ProjectCategory extends Model<ProjectCategory> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      })
      id!: number;
    
      @ForeignKey(() => Project)
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'project_id'
      })
      projectId!: number;
    
      @ForeignKey(() => Category)
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'category_id'
      })
      categoryId!: number;
}