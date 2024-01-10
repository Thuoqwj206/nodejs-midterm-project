
export enum Status {
    expired = 'EXPIRED',
    active = 'ACTIVE'
}
export interface IInvitation {
    id: number,
    invite_id: string,
    creator: number,
    status: Status,
    project: number
}