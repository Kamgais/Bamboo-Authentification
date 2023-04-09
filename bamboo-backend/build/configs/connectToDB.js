"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../models/user-model");
if (process.env.NODE_ENV === 'production') {
    exports.sequelize = new sequelize_typescript_1.Sequelize({
        database: 'wfu0pyfkcpycfn5g',
        dialect: 'mysql',
        username: 'mipxe9bmc3vk0irh',
        password: 'taeobbwbcxioz9it',
        host: 'd3y0lbg7abxmbuoi.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
        port: 3306,
        models: [user_model_1.User],
        logging: true
    });
}
else {
    exports.sequelize = new sequelize_typescript_1.Sequelize({
        database: 'bamboo_db',
        dialect: 'mysql',
        username: 'root',
        password: '',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        models: [user_model_1.User], // or [Player, Team],
    });
}
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        yield exports.sequelize.sync();
        console.log('Database connected successfully');
    }
    catch (error) {
        console.log('Error connecting to database:', error);
    }
});
exports.connectToDB = connectToDB;
