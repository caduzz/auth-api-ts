"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../../Configs/auth");
class token {
    constructor() {
        this.token_create = (params = {}) => {
            if (auth_1.config.secret) {
                return jsonwebtoken_1.default.sign(params, auth_1.config.secret, {
                    expiresIn: 864000
                });
            }
        };
    }
}
exports.default = token;
