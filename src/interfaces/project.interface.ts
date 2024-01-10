
export interface IProject {
    id: number,
    name: string,
    startDate: Date,
    members: string[],
    tasks: string[],
    endDate: Date
}