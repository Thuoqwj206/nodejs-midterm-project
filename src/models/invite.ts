import { Schema, model } from "mongoose";
import { Status } from "../interfaces";

const Invitation = new Schema({
    invite_id: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: Status,
        default: Status.active,
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }
}, { timestamps: true })


export default model('Invitation', Invitation)