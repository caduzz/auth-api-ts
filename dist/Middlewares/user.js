"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class UserMiddlewares {
    login(req, res, next) {
        const body = req.body;
        const schema = joi_1.default.object({
            email: joi_1.default
                .string()
                .email()
                .required(),
            password: joi_1.default
                .string()
                .required(),
        });
        const { error: errSechemJoi } = schema.validate(body);
        if (errSechemJoi)
            return res.status(400).json({ sucess: false, msg: errSechemJoi.message });
        next();
    }
}
exports.default = UserMiddlewares;
