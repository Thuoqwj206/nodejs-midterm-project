import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, { timestamps: true })

export default model('Task', taskSchema)