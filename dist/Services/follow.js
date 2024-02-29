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
class FollowService {
    constructor() {
        this.follow = ({ user_followers_id, user_following_id }) => __awaiter(this, void 0, void 0, function* () {
            if (user_followers_id === user_following_id)
                return { sucess: false, msg: 'Error Follow', status: 400 };
            const follow = yield this.prisma.follows.findFirst({ where: { AND: {
                        user_followers_id,
                        user_following_id
                    } } });
            if (!follow) {
                const follow_create = yield this.prisma.follows.create({ data: { user_followers_id, user_following_id } });
                return { sucess: true, msg: 'Sucess Follow', status: 200 };
            }
            this.unfollow(follow.id);
            return { sucess: false, msg: 'Unfollow', status: 200 };
        });
        this.unfollow = (id) => __awaiter(this, void 0, void 0, function* () {
            const unfollow = yield this.prisma.follows.deleteMany({ where: { id } });
            if (unfollow.count === 1)
                return { sucess: true, msg: 'Sucess delete Post', status: 200 };
            else
                return { sucess: false, msg: 'Erro delete Post', status: 400 };
        });
        this.followers = (username) => __awaiter(this, void 0, void 0, function* () {
            if (username === '')
                return { sucess: false, msg: 'informe um usuario', status: 400 };
            const user_find = yield this.prisma.user.findUnique({
                where: { username },
            });
            if (user_find) {
                const followers_find = yield this.prisma.follows.findMany({
                    where: { user_followers_id: user_find.id },
                    select: {
                        user_following: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                avatar: true,
                            }
                        }
                    }
                });
                return { sucess: true, msg: 'Sucess delete Post', status: 200, followers_find };
            }
            return { sucess: true, msg: 'User not find', status: 400 };
        });
        this.followings = (username) => __awaiter(this, void 0, void 0, function* () {
            if (username === '')
                return { sucess: false, msg: 'informe um usuario', status: 400 };
            const user_find = yield this.prisma.user.findUnique({
                where: { username },
            });
            if (user_find) {
                const followers_find = yield this.prisma.follows.findMany({
                    where: { user_following_id: user_find.id },
                    select: {
                        user_followers: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                avatar: true,
                            }
                        }
                    }
                });
                return { sucess: true, msg: 'Sucess delete Post', status: 200, followers_find };
            }
            return { sucess: true, msg: 'User not find', status: 400 };
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = FollowService;
