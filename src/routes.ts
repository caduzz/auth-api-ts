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

const routes = Router()

const avatarUpload = multer(avatarUserConfig)

const {
    login,
    register
} = new UserMiddlewares()

const {
    createUser,
    loginUser,
    getUser
} = new UserController();

const {
    createPost,
    getPosts
} = new PostsController ();
//user
routes.post('/user/create', register, (req, res) => createUser(req, res))
routes.post('/user/login', login, (req, res) => loginUser(req, res))

//auth //user
routes.get('/user/infos', auth, (req, res) => getUser(req, res))

//auth //posts
routes.post('/post/create', auth, (req, res) => createPost(req, res))
routes.get('/post/list', auth, (req, res) => getPosts(req, res))

export default routes