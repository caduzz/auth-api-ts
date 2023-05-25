import { IUserPayload } from "./user";

export interface IResponse {
    msg?: string
    error: boolean
    status: number
}

declare global {
  namespace Express {
    interface Request {
      user: IUserPayload;
    }
  }
}