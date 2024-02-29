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
const auth_1 = require("../Configs/auth");
const jwt = require('jsonwebtoken');
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ res: { error: true, msg: 'Token não informado' } });
        const parts = authHeader.split(' ');
        if (!(parts.length === 2))
            return res.status(200).json({ res: { error: true, msg: 'Token mal formado' } });
        const [scheme, token] = parts;
        if (!/^Bearer$/i.test(scheme))
            return res.status(200).json({ res: { error: true, msg: 'Token mal formado' } });
        jwt.verify(token, auth_1.config.secret, (err, decoded) => {
            if (err)
                return res.status(401).json({ res: { error: true, msg: 'Token invalido' } });
            req.body.user = decoded;
            next();
        });
    });
}
exports.default = login;
;
