import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../models';
import { User } from '../models/user-model';

export const sequelize = new Sequelize({
  database: 'bamboo_db',
  dialect: 'mysql',
  username: 'root',
  password:'',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [User], // or [Player, Team],
});


export const connectToDB = async() => {

    try {
        await sequelize.authenticate();
       // await sequelize.sync({alter: true})
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Error connecting to database:', error);
    }

}