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
const client_1 = require("@prisma/client");
class PostService {
    constructor() {
        this.homePosts = (id) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.prisma.posts.findMany({
                where: {
                    NOT: { userId: id },
                },
                orderBy: {
                    created_at: "desc",
                },
                include: {
                    user: {
                        select: {
                            avatar: true,
                            username: true,
                            name: true,
                            id: true,
                        },
                    },
                },
            });
            return { sucess: true, msg: "Sucess Get Posts", status: 200, posts };
        });
        this.list = (id) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.prisma.posts.findMany({
                where: {
                    userId: id,
                },
                select: {
                    id: true,
                    msg: true,
                    user: {
                        select: {
                            id: true,
                            avatar: true,
                            name: true,
                            username: true,
                            accentColor: true,
                        },
                    },
                },
            });
            return { sucess: true, msg: "Sucess Get Posts", status: 200, posts };
        });
        this.create = ({ msg, userId }) => __awaiter(this, void 0, void 0, function* () {
            const post = yield this.prisma.posts.create({
                data: {
                    msg,
                    userId,
                },
            });
            return { sucess: true, msg: "Sucess Create Post", status: 200 };
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const post_delete = yield this.prisma.posts.deleteMany({ where: { id } });
            return post_delete.count === 1
                ? { sucess: true, msg: "Sucess delete Post", status: 200 }
                : { sucess: false, msg: "Erro delete Post", status: 400 };
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = PostService;
