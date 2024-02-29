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
const user_1 = __importDefault(require("../Services/user"));
class UserController {
    constructor() {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { accentColor, email, password, username, name } = req.body;
                const file = req.file;
                if (file !== undefined) {
                    const avatar = file;
                    const msg = yield this.service.create({
                        accentColor,
                        avatar,
                        name,
                        email,
                        password,
                        username,
                        permissions: 1
                    });
                    res.status(msg.status).json(msg);
                }
                else {
                    res.status(400).json({ msg: 'avatar invalido' });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const msg = yield this.service.login({
                    email,
                    password
                });
                res.status(msg.status).json(msg);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body.user;
                const msg = yield this.service.get(id);
                res.status(msg.status).json(msg);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getUserName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body.user;
            const { username } = req.params;
            const msg = yield this.service.getUserName(username, id);
            res.status(msg.status).json(msg);
        });
        this.service = new user_1.default();
    }
}
exports.default = UserController;
