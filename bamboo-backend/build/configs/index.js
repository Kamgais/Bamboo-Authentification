"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.connectToDB = void 0;
var connectToDB_1 = require("./connectToDB");
Object.defineProperty(exports, "connectToDB", { enumerable: true, get: function () { return connectToDB_1.connectToDB; } });
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return connectToDB_1.sequelize; } });
