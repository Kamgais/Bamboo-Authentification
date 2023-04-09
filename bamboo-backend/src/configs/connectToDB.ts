import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../models';
import { User } from '../models/user-model';


export let sequelize: any;

if(process.env.NODE_ENV === 'production') {

    sequelize = new Sequelize({
        database: 'wfu0pyfkcpycfn5g',
        dialect: 'mysql',
        username: 'mipxe9bmc3vk0irh',
        password:'taeobbwbcxioz9it',
        host: 'd3y0lbg7abxmbuoi.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
        port: 3306,
        models: [User], // or [Player, Team],
        logging: true
      });

}  else {
    sequelize = new Sequelize({
        database: 'bamboo_db',
        dialect: 'mysql',
        username: 'root',
        password:'',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        models: [User], // or [Player, Team],
      });
}



export const connectToDB = async() => {

    try {
        await sequelize.authenticate();
        await sequelize.sync()
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Error connecting to database:', error);
    }

}

