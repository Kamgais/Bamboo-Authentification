"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResource = void 0;
const validateResource = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.validateResource = validateResource;
