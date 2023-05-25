import { PrismaClient } from "@prisma/client";
import { IUserRegister, IUserPromise, IUserLogin, IUser } from "../@types/user";

import crypt from "./Utils/crypt";
import token from "./Utils/token";
import { IPost, IPostCreate } from "../@types/posts";


export default class PostService {
    private prisma: PrismaClient

    constructor () {
        this.prisma = new PrismaClient()
    }

    list = async (id: string) => {
        const posts = await this.prisma.posts.findMany({
            where: {
                userId: id
            }, 
            include: { 
                user: true 
            }
        })

        return {sucess: true, msg: 'Sucess Get Posts', posts}
    }

    create = async ({msg, userId}: IPostCreate): Promise<IUserPromise> => {
        const post = await this.prisma.posts.create({
            data: {
                msg,
                userId
            }
        })

        return {sucess: true, msg: 'Sucess Create Post'}
    }
}