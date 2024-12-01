import mongoose , { Schema,model } from "mongoose";
const GroupSchema = new Schema({
    groupName: {
        type: String,
        unique: true,
        required: true,
    },
    groupImg: {
        type: String,
    },
    description: {
        type: String,
    },
    members: [
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
            senders: [
                {
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
            ],
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

export const Group = model("Group", GroupSchema);
