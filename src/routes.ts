import { Router } from "express";
import multer from "multer";

//Configs
import { avatarUserConfig } from "./Configs/multer";

//Controllers
import UserController from "./Controllers/user";

//Middlewares
import auth from "./Middlewares/auth";
import UserMiddlewares from "./Middlewares/user";
import PostsController from "./Controllers/posts";
import FollowsController from "./Controllers/follow";
import PostMiddlewares from "./Middlewares/post";

const routes = Router()

const avatarUpload = multer(avatarUserConfig)

const {
    login
} = new UserMiddlewares()

const {
    publicar
} = new PostMiddlewares()

const {
    createUser,
    loginUser,
    getUser,
    getUserName
} = new UserController();

const {
    createPost,
    getPosts,
    homeGetPosts,
    deletePosts
} = new PostsController();

const {
    createFollow,
    followers,
    followings
} = new FollowsController();

//user
routes.post('/user/create', avatarUpload.single('avatar'), (req, res) => createUser(req, res))
routes.post('/user/login', login, (req, res) => loginUser(req, res))

//auth //user // follow
routes.post('/user/follow', auth, (req, res) => createFollow(req, res))
routes.get('/user/followers/:username', auth, (req, res) => followers(req, res))
routes.get('/user/followings/:username', auth, (req, res) => followings(req, res))

//auth //user
routes.get('/user/infos', auth, (req, res) => getUser(req, res))
routes.get('/user/name/:username', auth, (req, res) => getUserName(req, res))

//auth //posts
routes.post('/post/create', publicar, auth, (req, res) => createPost(req, res))
routes.get('/post/list', auth, (req, res) => getPosts(req, res))
routes.get('/post/home/list', auth, (req, res) => homeGetPosts(req, res))
routes.delete('/post/delete/:id', auth, (req, res) => deletePosts(req, res))

export default routes