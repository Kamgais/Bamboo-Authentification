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
exports.UserService = void 0;
const models_1 = require("../models");
class UserService {
    static save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created = yield models_1.UserModel.create(user);
                return Promise.resolve(created);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    static findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInDB = yield models_1.UserModel.findOne({
                    where: { username }
                });
                return Promise.resolve(userInDB);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInDB = yield models_1.UserModel.findOne({
                    where: { email }
                });
                return Promise.resolve(userInDB);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    static updateById(changes, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.UserModel.update(changes, { where: { id } });
                const user = yield models_1.UserModel.findByPk(id);
                return Promise.resolve(user);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findByPk(id);
                return Promise.resolve(user);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.UserService = UserService;
