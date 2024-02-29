"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
//Configs
const multer_2 = require("./Configs/multer");
//Controllers
const user_1 = __importDefault(require("./Controllers/user"));
//Middlewares
const auth_1 = __importDefault(require("./Middlewares/auth"));
const user_2 = __importDefault(require("./Middlewares/user"));
const posts_1 = __importDefault(require("./Controllers/posts"));
const follow_1 = __importDefault(require("./Controllers/follow"));
const post_1 = __importDefault(require("./Middlewares/post"));
const routes = (0, express_1.Router)();
const avatarUpload = (0, multer_1.default)(multer_2.avatarUserConfig);
const { login } = new user_2.default();
const { publicar } = new post_1.default();
const { createUser, loginUser, getUser, getUserName } = new user_1.default();
const { createPost, getPosts, homeGetPosts, deletePosts } = new posts_1.default();
const { createFollow, followers, followings } = new follow_1.default();
//user
routes.post('/user/create', avatarUpload.single('avatar'), (req, res) => createUser(req, res));
routes.post('/user/login', login, (req, res) => loginUser(req, res));
//auth //user // follow
routes.post('/user/follow', auth_1.default, (req, res) => createFollow(req, res));
routes.get('/user/followers/:username', auth_1.default, (req, res) => followers(req, res));
routes.get('/user/followings/:username', auth_1.default, (req, res) => followings(req, res));
//auth //user
routes.get('/user/infos', auth_1.default, (req, res) => getUser(req, res));
routes.get('/user/name/:username', auth_1.default, (req, res) => getUserName(req, res));
//auth //posts
routes.post('/post/create', publicar, auth_1.default, (req, res) => createPost(req, res));
routes.get('/post/list', auth_1.default, (req, res) => getPosts(req, res));
routes.get('/post/home/list', auth_1.default, (req, res) => homeGetPosts(req, res));
routes.delete('/post/delete/:id', auth_1.default, (req, res) => deletePosts(req, res));
exports.default = routes;
