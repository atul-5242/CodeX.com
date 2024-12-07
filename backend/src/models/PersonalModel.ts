import mongoose, { Schema, model } from "mongoose";

const PersonalChatSchema = new Schema({
    participants: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ], 
    messages: [
        {
            sender: {
                userId: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                messageIds: [
                    {
                        type: mongoose.Types.ObjectId,
                        ref: "Message",
                    },
                ],
            },
            receiver: {
                userId: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                messageIds: [
                    {
                        type: mongoose.Types.ObjectId,
                        ref: "Message",
                    },
                ],
            },
        },
    ],
});

export const PersonalChat = model("PersonalChat", PersonalChatSchema);
