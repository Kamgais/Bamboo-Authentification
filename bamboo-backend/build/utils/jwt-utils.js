"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_keys_1 = require("./jwt-keys");
const signJWT = (object, options) => {
    return jsonwebtoken_1.default.sign(object, jwt_keys_1.JWT_PRIVATE_KEY, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
};
exports.signJWT = signJWT;
const verifyJWT = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_keys_1.JWT_PUBLIC_KEY);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        };
    }
};
exports.verifyJWT = verifyJWT;
