import mongoose, { Schema, model } from "mongoose";

const MessageSchema = new Schema(
    {
        from: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        to: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        groupId: {
            type: mongoose.Types.ObjectId,
            ref: "Group",
        },
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["direct", "group"],
            required: true,
        },
    },
    { timestamps: true }
);
export const Message = model("Message", MessageSchema);
