import { Router } from "express";
import multer from "multer";

//Configs
import { avatarUserConfig } from "./Configs/multer";

//Controllers
import UserController from "./Controllers/user";

//Middlewares
import register from "./Middlewares/registerUser";
import login from "./Middlewares/loginUser";

const routes = Router()

const avatarUpload = multer(avatarUserConfig)

const {
    createUser,
    loginUser
} = new UserController();

//user
routes.post('/user/create', register, (req, res) => createUser(req, res))
routes.post('/user/login', login, (req, res) => loginUser(req, res))

export default routes