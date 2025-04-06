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
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message",
    }],
});

export const Group = model("Group", GroupSchema);
