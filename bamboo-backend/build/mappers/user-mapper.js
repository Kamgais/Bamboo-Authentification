"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const models_1 = require("../models");
class UserMapper {
    toDto(e) {
        return {
            id: e.id,
            username: e.username,
            email: e.email,
            isAccountConfirmed: e.isAccountConfirmed,
            googleId: e.googleId,
            githubId: e.githubId
        };
    }
    toEntity(dto) {
        return models_1.UserModel.build(Object.assign({}, dto));
    }
}
exports.UserMapper = UserMapper;
