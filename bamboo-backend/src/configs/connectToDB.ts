import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: 'root',
  password:'',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [], // or [Player, Team],
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