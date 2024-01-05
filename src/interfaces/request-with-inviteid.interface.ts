import { Types } from "mongoose";

export interface IInvite {
    userId: Types.ObjectId,
    inviteId: String
}