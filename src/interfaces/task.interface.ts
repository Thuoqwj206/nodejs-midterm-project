import { Types } from "mongoose";

export enum TaskType {
    Default = 'WHITE',
    Bug = 'RED',
    Feature = 'GREEN',
}

export interface ITask {
    name: string;
    priority: string;
    status: string;
    startDate: Date;
    endDate: Date;
    project: Types.ObjectId;
    assignee: Types.ObjectId;
}