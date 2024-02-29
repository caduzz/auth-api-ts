
interface file {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: string,
} 


export interface IUser {
    id?: string
    email?: string 
    username: string
    name: string
    password?: string
    avatar: string
    accentColor: string
    permissions?: UserPermitions
}

export interface IUserPayload {
    id: string
}

export interface IUserRegister {
    id?: string
    email: string 
    username: string
    name: string
    password: string
    avatar: Express.Multer.File
    accentColor: string
    permissions?: UserPermitions
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserPromise {
    msg: string
    sucess: boolean
    status: number
    token?: string
    user?: IUser
}

export enum UserPermitions {
    user = 1, 
    admin
}