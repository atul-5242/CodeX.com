import mongoose, { Schema, model } from "mongoose";

const MessageSchema = new Schema(
    {
        from: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        groupId: {
            type: Schema.Types.ObjectId,
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
        messageType: {
            type: String,
            enum: ["text", "image", "file", "audio", "video"],
            default: "text"
        },
        isEdited: {
            type: Boolean,
            default: false
        },
        readBy: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            readAt: {
                type: Date,
                default: Date.now
            }
        }],
        replyTo: {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    },
    { timestamps: true }
);

export const Message = model("Message", MessageSchema);
