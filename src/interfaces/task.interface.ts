import { Types } from "mongoose";

enum TaskType {
    Default = 'white',
    Bug = 'red',
    Feature = 'green',
}

export interface ITask {
    _id: Types.ObjectId;
    name: string;
    type: TaskType;
    priority: string;
    status: string;
    startDate: Date;
    endDate: Date;
    project: Types.ObjectId;
    assignee: Types.ObjectId;
}