
export interface ITask extends Document {
    name: string;
    project: number;
    priority: number;
    status: number;
    startDate: Date;
    type: number;
    endDate: Date;
    assignee: number;
}