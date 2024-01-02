import { Request } from "express";
import { IUser } from "./userInterface";

export interface IRequestWithUser extends Request {
    user: IUser
}