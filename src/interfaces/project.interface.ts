import { Types } from "mongoose";

export interface IProject {
    id: Types.ObjectId,
    name: string,
    startDate: Date,
    members: string[],
    endDate: Date
}