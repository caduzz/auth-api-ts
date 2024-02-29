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
const follow_1 = __importDefault(require("../Services/follow"));
class FollowsController {
    constructor() {
        this.createFollow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: user_following_id } = req.body.user;
                const { user_followers_id } = req.body;
                const msgs = yield this.service.follow({ user_followers_id, user_following_id });
                res.status(msgs.status).json(msgs);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.followers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const msg = yield this.service.followers(username);
                res.status(msg.status).json(msg);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.followings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const msg = yield this.service.followings(username);
                res.status(msg.status).json(msg);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.service = new follow_1.default();
    }
}
exports.default = FollowsController;
