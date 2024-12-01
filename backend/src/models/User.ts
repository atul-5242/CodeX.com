import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    groupIds: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Group",
        },
    ],
    p2pChatIds: [
        {
            type: mongoose.Types.ObjectId,
            ref: "PersonalChat",
        },
    ],
});

export const User = model("User", UserSchema);
