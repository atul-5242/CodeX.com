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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
});

export const Group = model("Group", GroupSchema);
