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
const posts_1 = __importDefault(require("../Services/posts"));
class PostsController {
    constructor() {
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body.user;
                const msg = req.body.msg;
                const msgs = yield this.service.create({
                    msg,
                    userId: id
                });
                res.status(msgs.status).json(msgs);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.homeGetPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body.user;
                const msg = yield this.service.homePosts(id);
                res.status(msg.status).json(msg);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body.user;
                const msg = yield this.service.list(id);
                res.status(msg.status).json(msg);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.deletePosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const msg = yield this.service.delete(id);
                res.status(msg.status).json(msg);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.service = new posts_1.default();
    }
}
exports.default = PostsController;
