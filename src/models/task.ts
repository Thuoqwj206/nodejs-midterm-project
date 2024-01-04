import { Schema, model } from "mongoose";
enum TaskType {
    Default = 'white',
    Bug = 'red',
    Feature = 'green',
}
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
        enum: Object.values(TaskType),
        default: TaskType.Default,
        required: true,
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'new',
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: 'me',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true

    }
}, { timestamps: true })

export default model('Task', taskSchema)