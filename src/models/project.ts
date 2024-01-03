import mongoose, { Schema, model } from "mongoose"
const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    { timestamps: true }
)

export default model('Project', projectSchema)