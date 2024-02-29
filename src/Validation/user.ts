import { PrismaClient } from "@prisma/client";

export default class UserValidations {
    private prisma: PrismaClient

    constructor () {
        this.prisma = new PrismaClient()
    }
    
    register = async (email:string) => {
        const emailFind = await this.prisma.user.findUnique({where: { email }})
        if(emailFind) return {msg: 'erro user find'}
    }
}