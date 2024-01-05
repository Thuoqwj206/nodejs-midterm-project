import { Types } from "mongoose";

export enum Status {
    expired = 'EXPIRED',
    active = 'ACTIVE'
}
export interface IInvitation {
    id: Types.ObjectId,
    invite_id: string,
    creator: Types.ObjectId,
    status: Status,
    project: Types.ObjectId
}