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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypt_1 = __importDefault(require("./Utils/crypt"));
const token_1 = __importDefault(require("./Utils/token"));
const { encrypt, encrypt_validate } = new crypt_1.default();
const { token_create } = new token_1.default();
class UserService {
    constructor() {
        this.getUserName = (username, user_follow) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findFirst({
                where: { username }, select: {
                    id: true,
                    avatar: true,
                    accentColor: true,
                    username: true,
                    name: true,
                    created_at: true,
                    posts: {
                        orderBy: {
                            created_at: "desc"
                        }
                    },
                    followers: true,
                    following: true
                }
            });
            return { sucess: true, msg: 'sucess create user', status: 200, user };
        });
        this.get = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({ where: { id }, select: {
                    id: true,
                    avatar: true,
                    name: true,
                    accentColor: true,
                    username: true
                } });
            return { sucess: true, msg: 'sucess create user', status: 200, user };
        });
        this.create = ({ accentColor, avatar, email, password, username, name, permissions }) => __awaiter(this, void 0, void 0, function* () {
            password = yield encrypt(password);
            const user = yield this.prisma.user.create({
                data: {
                    accentColor,
                    avatar: avatar.filename,
                    name,
                    email,
                    password,
                    username,
                    permissions
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    avatar: true,
                    accentColor: true,
                    password: true
                }
            });
            const token = token_create({ id: user.id });
            user.password === undefined;
            return { sucess: true, msg: 'sucess create user', user, status: 200, token };
        });
        this.login = ({ email, password }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    avatar: true,
                    accentColor: true,
                    password: true
                }
            });
            if (!user)
                return { sucess: false, msg: 'email ou senha invalidos', status: 400 };
            if (user.password)
                if (yield encrypt_validate(password, user.password))
                    return { sucess: false, msg: 'email ou senha invalidos', status: 400 };
            user.password = undefined;
            const token = token_create({ id: user.id });
            return { sucess: true, msg: 'sucesso ao fazer login', user, status: 200, token };
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = UserService;
